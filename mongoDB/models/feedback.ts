import { Schema, model, models, Types } from "mongoose";
import {IFeedback, IFeedbackDocument, IFeedbackModel  } from "@/types";



const FeedbackSchema = new Schema<IFeedbackDocument, IFeedbackModel>(
  {
    name:{
        type: String,
        required: true
      },
    job: "string",
    location: "string",
    title: "string",
    body: {
        type: String,
        required: true
      },
    imageURL: "string"
  },
  { timestamps: true }
);

const FeedbackModel = models.feedback as IFeedbackModel || model<IFeedbackDocument, IFeedbackModel>("feedback", FeedbackSchema);

export default FeedbackModel;