import { Schema, model, models, Types } from "mongoose";
// import {IFeedback, IFeedbackDocument, IFeedbackModel  } from "@/types";



const BookingSchema = new Schema<any>(
    {
        email: {
            type: String,
            required: true
        },

    },
    { timestamps: true }
);

const BookingModel = models.booking as any || model<any>("booking", BookingSchema);

export default BookingModel;