import { Schema, model, models, Types } from "mongoose";
import { ICourse, ICourseDocument, ICourseModel } from "@/types";

const CourseSchema = new Schema<ICourseDocument, ICourseModel>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true,
        },
        prerequisites: {
            type: [String],
            default: [],
        },
        introduction: {
            type: [
                {
                    videoURL: String,
                    header: String,
                    body: String,
                    footer: String,
                },
            ],
            default: [], // Empty array as the default value
        },
    },
    { timestamps: true }
);

const CourseModel = models.course as ICourseModel || model<ICourseDocument, ICourseModel>("course", CourseSchema);

export default CourseModel;