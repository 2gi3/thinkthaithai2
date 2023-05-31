
import { NextApiRequest, NextApiResponse } from 'next'
import mongoose, { Schema } from "mongoose";
import { dbConnect } from '../../../../mongoDB';
import { getSession } from 'next-auth/react'
import { handleOptions } from '@/functions/back-end';
import BookingModel from 'mongoDB/models/booking';


// const Booking = mongoose.model('Booking', new mongoose.Schema({}))


// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   console.log(req.body)
//   dbConnect()
//   await Booking.create(req.body)


// }





export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getSession({req})
  // if(!session) return res.send('You are not authenticated')

  switch (req.method) {

    case 'OPTIONS':
      handleOptions(res)
      break;

    case 'POST':
      const { email } = req.body;

      try {
        await dbConnect();
        const newBooking = new BookingModel({ email });
        await newBooking.save();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Feedback created successfully!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating feedback TEST' });
      } finally {
        res.end();
      }
      break;
  }

}