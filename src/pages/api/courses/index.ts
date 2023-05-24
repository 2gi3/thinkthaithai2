import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react'
import { handleOptions } from '@/functions/back-end';
import { dbConnect } from '../../../../mongoDB';
import { ObjectId } from 'mongodb';

import CourseModel from 'mongoDB/models/course';
import { databaseStudent } from '@/types';


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
            const { title, description, status, level, prerequisites, introduction, lessons } = req.body;


            try {
                await dbConnect();
                const newCourse = new CourseModel({ title, description, status, level, prerequisites, introduction, lessons });
                await newCourse.save();
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({ message: 'Feedback created successfully!' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error creating feedback TEST' });
            } finally {
                res.end();
            }
            break;

        // Get one course by title: /api/courses?searchBy=title&value=<TITLE>
        // Get one course by id: /api/courses?searchBy=id&value=<ID>
        // Get all courses: /api/students

        case 'GET':
            const { searchBy, value } = req.query;
            const searchValue = Array.isArray(value) ? value[0] : value;
            let courses;

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.setHeader('Content-Type', 'application/json');

            try {

                await dbConnect();


                if (searchBy && value) {
                    if (searchBy === 'title') {
                        courses = await CourseModel.findOne({ title: searchValue });
                    } else if (searchBy === 'id') {
                        courses = await CourseModel.findOne({ _id: new ObjectId(searchValue) });

                    } else {
                        res.status(400).json({ message: 'Invalid searchBy parameter' });
                    }
                } else {
                    courses = await CourseModel.find({})
                    // .toArray();
                }
                res.status(200).json(courses);

            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error retrieving courses' });
            }
            break;

        // case 'DELETE':
        // try {
        //     await dbConnect();
        //     const { _id } = req.body;
        //     await FeedbackModel.findByIdAndDelete(_id);
        //     res.status(200).json({ message: 'Feedback deleted successfully!' });
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).json({ message: 'Error deleting feedback' });
        // }
        // break;
    }

}