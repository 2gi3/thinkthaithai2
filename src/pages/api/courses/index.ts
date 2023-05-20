import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react'
import { handleOptions } from '@/functions/back-end';
import { dbConnect } from '../../../../mongoDB';
import FeedbackModel from 'mongoDB/models/feedback';





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

            // case 'POST':
            //     const { title, description, status, level, } = req.body;

            //     try {
            //         await dbConnect();
            //         const newFeedback = new FeedbackModel({ name, job, location, title, body, imageURL });
            //         await newFeedback.save();
            //         res.setHeader('Content-Type', 'application/json');
            //         res.status(200).json({ message: 'Feedback created successfully!' });
            //     } catch (error) {
            //         console.error(error);
            //         res.status(500).json({ message: 'Error creating feedback TEST' });
            //     } finally {
            //         res.end();
            //     }
            //     break;
            // case 'GET':
            //     res.setHeader('Access-Control-Allow-Origin', '*');
            //     res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
            //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            //     res.setHeader('Content-Type', 'application/json');

            //     try {
            //         await dbConnect();
            //         const feedbacks = await FeedbackModel.find({});
            //         res.status(200).json(feedbacks);
            //     } catch (error) {
            //         console.error(error);
            //         res.status(500).json({ message: 'Error retrieving feedbacks' });
            //     }
            //     break;

            // case 'DELETE':
            try {
                await dbConnect();
                const { _id } = req.body;
                await FeedbackModel.findByIdAndDelete(_id);
                res.status(200).json({ message: 'Feedback deleted successfully!' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error deleting feedback' });
            }
            break;
    }

}