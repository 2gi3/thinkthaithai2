import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]';
import { handleOptions, isAdmin } from '@/functions/back-end';
import { handleGet, handlePost } from '@/functions/back-end/students';
import clientPromise from 'mongoDB/clientPromise';
import { databaseStudent } from '@/types';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  const { pwd } = req.query;
  console.log({ pwd })
  const localPwd = process.env.STATICPATHSPASSWORD
  if (pwd === localPwd && req.method === 'GET') {
    // Get one student by id: /api/students?pwd=<PASSWORD>
    const client = await clientPromise;
    const db = client.db();
    const studentsData = await db.collection('users').find().toArray();

    const studentsIds = studentsData.map((student) => student._id);
    console.log({ studentsIdsServer: studentsIds })
    res.status(200).json({ ...studentsIds });
  } else if (process.env.NODE_ENV !== 'development' && !session && pwd !== localPwd) {
    // Authorization in development mode is used to test the Stripe webhook

    return res.status(401).json({
      "error": "Unauthorized",
      "message": "Access denied. Please provide valid credentials."
    });

  } else {

    switch (req.method) {
      case 'OPTIONS':
        handleOptions(res)
        break;

      case 'POST':
        handlePost(req, res)
        break;

      case 'GET':
        // Get one student by email: /api/students?searchBy=email&value=<EMAIL>
        // Get one student by id: /api/students?searchBy=id&value=<ID>
        // Get all students: /api/students
        handleGet(req, res)
        break;

      case 'PATCH':

        const { studentEmail, courseId, lessonTitle } = req.body
        const client = await clientPromise;
        const db = client.db();

        if (lessonTitle) {
          await db.collection("users").updateOne(
            { email: studentEmail },
            { $push: { [`startedCourses.${courseId}`]: lessonTitle } }
          );
        } else {
          await db.collection("users").updateOne(
            { email: studentEmail },
            { $set: { [`startedCourses.${courseId}`]: [] } }
          );
        }


        res.status(200).json({ message: "course added to student" });
        break;

      // case 'DELETE':
      //   break;

      default:
        res.status(405).json({ message: 'Method Not Allowed' });
        break;
    }
  }
}





