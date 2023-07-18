import { handleOptions, isAdmin } from "@/functions/back-end";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from "next-auth/next"// @ts-ignore
import clientPromise from "../../../../mongoDB/clientPromise";


interface Products {
    [key: string]: number;
}




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
                // @ts-ignore
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


