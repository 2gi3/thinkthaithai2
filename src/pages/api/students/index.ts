import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react'
import { handleOptions } from '@/functions/back-end';
import { handleGet, handlePost } from '@/functions/back-end/students';
// @ts-ignore
import clientPromise from 'mongoDB/clientPromise';

const jwt = require('jsonwebtoken')



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getSession({ req })

  // if (!session) return res.send('You are not authenticated')

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
      // @ts-ignore
      const client = await clientPromise;
      const db = client.db();

      //     const student = await db.collection("users").findOne({ email: studentEmail });
      // if (!student) {
      //   res.status(404).json({ message: "Student not found" });
      //   break;
      // }
      if (lessonTitle) {
        await db.collection("users").updateOne(
          { email: studentEmail },
          { $push: { [`startedCourses.${courseId}`]: lessonTitle } }
        );
      } else {
        await db.collection("users").updateOne(
          { email: studentEmail },
          { $push: { [`startedCourses.${courseId}`]: [] } }
          // { $push: { startedCourses: courseId } }
        );
      }


      // await db.collection("users").updateOne(
      //   { email: studentEmail },
      //   {
      //     $set: {
      //       startedCourses: {
      //         $cond: {
      //           if: { $exists: "$startedCourses" },
      //           then: { $push: "$startedCourses" },
      //           else: [courseId]
      //         }
      //       }
      //     }
      //   }
      // );


      res.status(200).json({ message: "course added to student" });
      break;

    // case 'DELETE':
    //   // Handle DELETE request
    //   break;

    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}





