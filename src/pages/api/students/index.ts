import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../../mongoDB';
import StudentModel from 'mongoDB/models/student';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')





export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).end();
      } else if (req.method === 'POST') {
    const password = await bcrypt.hash(req.body.password, 10)
    const { name, email, fundedLessons } = req.body;
    try {
      await dbConnect();
      const newStudent = new StudentModel({ name, email, fundedLessons, password });
      await newStudent.save();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ message: 'Account created successfully!' });
    }  catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating account' });
    }
  } else {
    res.status(404).json({ message: 'Invalid request method' });
  }
}
