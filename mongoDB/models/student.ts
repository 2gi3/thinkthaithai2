import { Schema, model, models, Types } from "mongoose";
import { emailRegex, imageURLRegex, nameRegex, passwordRegex } from "../../regEx";
import { IStudentDocument, IStudentModel  } from "@/types";



const StudentSchema = new Schema<IStudentDocument, IStudentModel>(
  {
    _id: {
      $oid: "string"
    },
    provider: "string",
    type: "string",
    providerAccountId: "string",
    access_token: "string",
    expires_at: {
      $numberInt: "number"
    },
    scope: "string",
    token_type: "string",
    id_token: "string",
    userId: {
      $oid: "string"
    },
    fundedLessons: {
      type: Number,
      required: false,
      max: [
        50,
        "If you would like to buy more than 50 lessons please contact the teacher",
      ],
    },
    startedCourses: {
      type: [String],
      default: [],
    },
    completedCourses: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const StudentModel = models.student as IStudentModel || model<IStudentDocument, IStudentModel>("student", StudentSchema);

export default StudentModel;