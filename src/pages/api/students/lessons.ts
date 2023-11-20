import { handleOptions, isAdmin } from "@/functions/back-end";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../mongoDB/clientPromise";
import { addToTally } from "@/functions/back-end/lessons";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (await isAdmin(req, res)) {
        if (req.method === 'OPTIONS') {
            handleOptions(res)
        } else if (req.method === "POST") {
            const { action, quantity, studentEmail } = req.body

            try {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
                res.setHeader("Access-Control-Allow-Headers", "Content-Type");
                res.setHeader("Content-Type", "application/json");
                const client = await clientPromise;
                const db = client.db();
                const student = await db.collection("users").findOne({ email: studentEmail });

                if (student && action === 'decrease' && student.paidLessons > 0) {
                    const paidLessons = student.paidLessons;
                    const totalLessons = paidLessons - quantity
                    await db.collection("users").updateOne({ _id: student._id }, { $set: { paidLessons: totalLessons } });

                    res.status(200).json({ message: "Lesson deducted" });
                } else if (student && action === 'decrease' && student.paidLessons <= 0) {
                    res.status(404).json({ message: "The student has no lessons left" });
                } else if (student && action === 'addLesson') {
                    const addToTallyResponse = await addToTally(db, student, quantity);

                    if (addToTallyResponse.success) {
                        res.status(200).json({ message: addToTallyResponse.message });
                    } else {
                        res.status(500).json({ error: addToTallyResponse.message });
                    }
                } else { res.status(404).json({ message: 'User not found' }); }

                //   res.status(200).json({  })
            } catch (e: any) {
                console.log(e)
                res.status(500).json({ error: e.message })
            }
        }

    } else {
        res.status(401).json({
            "error": "Unauthorized",
            "message": "Access denied. Please provide valid credentials."
        }
        );
    }
}


