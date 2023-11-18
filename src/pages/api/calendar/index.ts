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

  console.log('Hello :)')
  console.log({ 'req': req.body })
  console.log({ 'Webhook payload': req.body.payload })

  switch (req.method) {

    case 'OPTIONS':
      handleOptions(res)
      break;

    case 'POST':
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

        } else {

          res.status(404).json({ message: "User not found." });

        }


      } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Error creating feedback TEST' });

      } finally {

        res.end();

      }
      break;
  }

}