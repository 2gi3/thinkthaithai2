import { Schema, model, models, Types } from "mongoose";
// import {IFeedback, IFeedbackDocument, IFeedbackModel  } from "@/types";


// name, cancel_url, reschedule_url
const BookingSchema = new Schema<any>(
    {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        cancel_url: {
            type: String,
            required: true
        },
        reschedule_url: {
            type: String,
            required: true
        }



    },
    { timestamps: true }
);

const BookingModel = models.booking as any || model<any>("booking", BookingSchema);

export default BookingModel;