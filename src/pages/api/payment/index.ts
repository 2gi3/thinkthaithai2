import { handleOptions } from '@/functions/back-end';
import type { NextApiRequest, NextApiResponse } from 'next';
import {getSession} from 'next-auth/react'

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
    
        // case 'POST':
        //   
        //   break;
    
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