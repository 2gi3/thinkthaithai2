
import { NextApiRequest, NextApiResponse } from 'next'
import mongoose, { Schema } from "mongoose";
import { dbConnect } from '../../../../mongoDB';


const Booking = mongoose.model('Booking', new mongoose.Schema({}))


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body)
  dbConnect()
  await Booking.create(req)



  // res.send(JSON.stringify())
  // res.send('hello calendly')
}