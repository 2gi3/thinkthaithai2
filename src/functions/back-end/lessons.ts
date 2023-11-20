import { databaseStudent } from "@/types";
import { WithId } from "mongodb";

interface ApiResponse {
    success: boolean;
    message?: string;
}

export async function addToTally(
    db: any,
    student: any,
    quantity: number
): Promise<ApiResponse> {
    try {
        const previousTally = student.lessonsTally || 0;
        const paidLessons = student.paidLessons || 0;

        const updatedTally = previousTally + quantity;
        const updatedPaidLessons = paidLessons + quantity;
        const paidLessonsResult = await db.collection("users").updateOne({ _id: student._id }, { $set: { paidLessons: updatedPaidLessons } });

        const tallyResult = await db.collection("users").updateOne({ _id: student._id }, { $set: { lessonsTally: updatedTally } });

        if (tallyResult.modifiedCount === 1 && paidLessonsResult.modifiedCount === 1) {
            return { success: true, message: "Tally updated successfully" };
        } else {
            return { success: false, message: "Failed to update Lessons" };
        }
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}