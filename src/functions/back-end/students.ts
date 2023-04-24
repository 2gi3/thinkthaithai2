import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from '../../../mongoDB';
import StudentModel from 'mongoDB/models/student';
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');


export async function handlePost(req: NextApiRequest, res: NextApiResponse){
    const password = await bcrypt.hash(req.body.password, 10)
    const { name, email, fundedLessons } = req.body;
    let imageURL
    // await cloudinary.uploader.upload(`./images/${req.body.imageFile}`).then((result : any) =>console.log(result))

    await cloudinary.uploader.upload(req.body.imageFile,
       {folder: "thinkthaithaiDEV/stydents",
       public_id: "Test file",
       tag: 'student_profile',
      transformation:[{width:"150", crop: "scale"},{fetch_format: "webp"},{ quality: "auto"}]}   
       )
    .then((data: any) => {
      console.log(data);
      imageURL =data.secure_url;
    }).catch((err: any) => {
      console.log(err);
    });
    
    try {
      await dbConnect();
      const newStudent = new StudentModel({ name, email, fundedLessons, password, imageURL });
      await newStudent.save();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ message: 'Account created successfully!' });
    }  catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating account' });
    }
}