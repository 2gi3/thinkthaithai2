import type { NextApiRequest, NextApiResponse } from 'next';
import { handleOptions, isAdmin } from '@/functions/back-end';
import { dbConnect } from '../../../../mongoDB';
import FeedbackModel from 'mongoDB/models/feedback';

const cloudinary = require('cloudinary').v2;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {

    case 'OPTIONS':
      handleOptions(res)
      break;

    case 'POST':

      if (await isAdmin(req, res)) {


        const { name, job, location, title, body } = req.body;
        let imageURL

        await cloudinary.uploader.upload(req.body.imageFile,
          {
            folder: "thinkthaithaiDEV/feedbacks",
            public_id: `${name}-${job}-${location}.replace(/\s+/g, '_')`,

            tag: 'student_profile',
            transformation: [{ width: "150", crop: "scale" }, { fetch_format: "webp" }, { quality: "auto" }]
          }
        ).then((data: any) => {
          imageURL = data.secure_url;
        }).catch((err: any) => {
          console.log(err);
        });

        try {
          await dbConnect();
          const newFeedback = new FeedbackModel({ name, job, location, title, body, imageURL });
          await newFeedback.save();
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json({ message: 'Feedback created successfully!' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error creating feedback TEST' });
        } finally {
          res.end();
        }
      } else {
        res.status(401).json({
          "error": "Unauthorized",
          "message": "Access denied. Please provide valid credentials."
        }
        );
      }
      break;

    case 'GET':
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Content-Type', 'application/json');

      try {
        await dbConnect();
        const feedbacks = await FeedbackModel.find({});
        res.status(200).json(feedbacks);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving feedbacks' });
      }
      break;

    case 'DELETE':
      if (await isAdmin(req, res)) {

        try {
          await dbConnect();
          const { _id } = req.body;
          await FeedbackModel.findByIdAndDelete(_id);
          res.status(200).json({ message: 'Feedback deleted successfully!' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error deleting feedback' });
        }

      } else {

        res.status(401).json({
          "error": "Unauthorized",
          "message": "Access denied. Please provide valid credentials."
        }
        );

      }

      break;
  }

}