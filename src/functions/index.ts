import { NextApiResponse } from "next";
import { FetcherArgs, databaseStudent } from '@/types'

export const handleMockGetRequest = (data: any, delay: number, res: NextApiResponse<any>) => {
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
  const response: databaseStudent = await fetch(...args).then((res) => res.json());
  localStorage.setItem('databaseStudent', JSON.stringify(response));
  // console.log(response)
  return response
};