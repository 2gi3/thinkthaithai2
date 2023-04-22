import type { NextApiRequest, NextApiResponse } from 'next';
// import { dbConnect } from '../../../../mongoDB';
// import StudentModel from 'mongoDB/models/student';
import { handleOptions } from '@/functions/back-end';
import { handlePost } from '@/functions/back-end/students';
// const cloudinary = require('cloudinary').v2;
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  switch (req.method) {
    case 'OPTIONS':
   handleOptions(res)
    break;

    case 'POST':
      handlePost(req, res)
      break;

    // case 'GET':
    //   // Handle GET request
    //   break;

    // case 'PUT':
    //   // Handle PUT request
    //   break;

    // case 'DELETE':
    //   // Handle DELETE request
    //   break;

    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}






    // if (req.method === 'OPTIONS') {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    //     res.setHeader('Content-Type', 'application/json');
    //     res.status(200).end();
    //   } else 
      // if (req.method === 'POST') {
    // const password = await bcrypt.hash(req.body.password, 10)
    // const { name, email, fundedLessons } = req.body;
    // let imageURL
    // // await cloudinary.uploader.upload(`./images/${req.body.imageFile}`).then((result : any) =>console.log(result))

    // await cloudinary.uploader.upload(req.body.imageFile, {public_id: "Test file"})
    // .then((data: any) => {
    //   // console.log(data);
    //   imageURL =data.secure_url;
    // }).catch((err: any) => {
    //   console.log(err);
    // });
    
    // try {
    //   await dbConnect();
    //   const newStudent = new StudentModel({ name, email, fundedLessons, password, imageURL });
    //   await newStudent.save();
    //   res.setHeader('Content-Type', 'application/json');
    //   res.status(200).json({ message: 'Account created successfully!' });
    // }  catch (error) {
    //   console.error(error);
    //   res.status(500).json({ message: 'Error creating account' });
    // }
  // } else {
  //   res.status(404).json({ message: 'Invalid request method' });
  // }
// }
