import { Schema, model, models, Types } from "mongoose";
import { emailRegex, nameRegex, passwordRegex } from "../../regEx";
import { IStudentDocument, IStudentModel  } from "@/types";



const StudentSchema = new Schema<IStudentDocument, IStudentModel>(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      unique: false,
      trim: true,
      match: [nameRegex, " Your name cannot be longer than 35 characters"],
    },

    email: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      match: [emailRegex, "Please provide a valid email address"],
    },

    password: {
      type: String,
      required: true,
      unique: false,
    },

    fundedLessons: {
      type: Number,
      required: false,
      max: [
        50,
        "If you would like to buy more than 50 lessons please contact the teacher",
      ],
    }
  },
  { timestamps: true }
);

const StudentModel = models.student as IStudentModel || model<IStudentDocument, IStudentModel>("student", StudentSchema);

export default StudentModel;