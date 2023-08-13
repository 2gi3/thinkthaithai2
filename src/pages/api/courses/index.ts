import type { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/react'
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from "next-auth/next"
import { handleOptions, isAdmin } from '@/functions/back-end';
import { dbConnect } from '../../../../mongoDB';
import { ObjectId } from 'mongodb';

import CourseModel from 'mongoDB/models/course';
import { databaseStudent } from '@/types';

const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const session = await getServerSession(req, res, authOptions)

    switch (req.method) {


        case 'OPTIONS':
            handleOptions(res)
            break;

        case 'POST':
            const { title, description, status, level, prerequisites, introduction, lessons } = req.body;

            if (
                await isAdmin(req, res)
            ) {
                try {
                    await dbConnect();
                    const newCourse = new CourseModel({ title, description, status, level, prerequisites, introduction, lessons });
                    await newCourse.save();
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json({ message: 'Course created successfully!' });
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ error, message: 'Error creating feedback TEST' });
                } finally {
                    res.end();
                }
                break;
            } else {
                res.status(401).json({
                    "error": "Unauthorized",
                    "message": "Access denied. Please provide valid credentials."
                }
                );
            }

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
    }

}