
import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../../../../mongoDB';
import { getSession } from 'next-auth/react'
import { handleOptions } from '@/functions/back-end';
import BookingModel from 'mongoDB/models/booking';
// @ts-ignore
import clientPromise from 'mongoDB/clientPromise';






export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  switch (req.method) {

    case 'OPTIONS':
      handleOptions(res)
      break;

    case 'POST':
      const { email, name, event, cancel_url, reschedule_url, questions_and_answers } = req.body.payload;
      // console.log(req.body.payload)
      let studentId = null;

      for (const item of questions_and_answers) {
        if (item.question === 'user id') {
          studentId = item.answer;
          break;
        }
      }
      // console.log(studentId)

      try {



        await dbConnect();
        const newBooking = new BookingModel({ email, name, event, cancel_url, reschedule_url, studentId });
        await newBooking.save();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Booking created successfully!' });

        // @ts-ignore
        const client = await clientPromise;
        const db = client.db();
        const student = await db.collection("users").findOne({ _id: studentId });
        console.log(student)
        if (student) {
          const paidLessons = student.paidLessons
          const totalLessons = paidLessons - 1
          await db.collection("users").updateOne({ _id: studentId }, { $set: { paidLessons: totalLessons } });

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