import { NextApiResponse } from "next";
import {FetcherArgs} from '@/types'

export const handleMockGetRequest = (data: any, delay: number, res: NextApiResponse<any>)=>{
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        try {  
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify(data));
          resolve(data);
        } catch (error) {
          console.error(error);
          res.statusCode = 500;
          res.end('Error fetching mock data');
          reject(error);
        }
      }, delay);
    });
  }

  export const fetcherStudent = async (...args: FetcherArgs) => {
    const response = await fetch(...args).then((res) => res.json());    
    return  response
  };