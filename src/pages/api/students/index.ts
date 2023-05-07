import type { NextApiRequest, NextApiResponse } from 'next';
import {getSession} from 'next-auth/react'
import { handleOptions } from '@/functions/back-end';
import { handleGet, handlePost } from '@/functions/back-end/students';

const jwt = require('jsonwebtoken')



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({req})

  if(!session) return res.send('You are not authenticated')
  
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
     handleGet(req,res)      
      break;

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





