import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { dbConnect } from '../../../../mongoDB';
import { handleOptions } from '@/functions/back-end';
import BookingModel from 'mongoDB/models/booking';
import clientPromise from 'mongoDB/clientPromise';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  console.log({ 'Webhook payload': req.body.payload })

  switch (req.method) {

    case 'OPTIONS':
      handleOptions(res)
      break;

    case 'POST':

      //If this function stops working (i.e.: when a student books a lesson, the database doesn't update),
      //it is possible that Calendly has deactivated the webhook, in that case delete the webhook and create it again, 
      //Follow the instruction in the README.md ## Bookings

      const { email, name, event, cancel_url, reschedule_url, tracking } = req.body.payload;
      let studentId = tracking.utm_source;
      const studentIdAsObjectId = new ObjectId(studentId);

      try {

        await dbConnect();
        const newBooking = new BookingModel({ email, name, event, cancel_url, reschedule_url, studentId });
        await newBooking.save();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Booking created successfully!' });

        const client = await clientPromise;
        const db = client.db();
        const student = await db.collection("users").findOne({ _id: studentIdAsObjectId });

        if (student) {

          const paidLessons = student.paidLessons
          const totalLessons = paidLessons - 1
          await db.collection("users").updateOne({ _id: studentIdAsObjectId }, { $set: { paidLessons: totalLessons } });
          res.status(200).json({ message: 'User lessons updated successfully.' });

        } else {

          res.status(404).json({ message: "User not found." });

        }


      } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Error creating feedback TEST' });

      }
      break;
  }

}