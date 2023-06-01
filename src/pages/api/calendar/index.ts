
import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../../../../mongoDB';
import { getSession } from 'next-auth/react'
import { handleOptions } from '@/functions/back-end';
import BookingModel from 'mongoDB/models/booking';
// @ts-ignore
import clientPromise from 'mongoDB/clientPromise';


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
      const { email } = req.body.payload;
      // @ts-ignore
      const client = await clientPromise;


      try {
        const db = client.db();
        const student = await db.collection('users').findOne({ email: email });

        if (!student) {
          return res.status(404).json({ message: 'User not found' });
        }

        const paidLessons = student.paidLessons
        const totalLessons = paidLessons - 1

        //  student.paidlessons -= 1;
        await db.collection('users').updateOne({ email: email }, { $set: { paidlessons: totalLessons } });

        // await dbConnect();
        // const newBooking = new BookingModel({ email: payload.email });
        // await newBooking.save();
        // res.setHeader('Content-Type', 'application/json');
        // res.status(200).json({ message: 'Feedback created successfully!' });
        // @ts-ignore

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating feedback TEST' });
      } finally {
        res.end();
      }
      break;
  }

}