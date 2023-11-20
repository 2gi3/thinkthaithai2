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
export const fetcherCustomer = async (...args: FetcherArgs) => {
  const response: databaseStudent = await fetch(...args).then((res) => res.json());
  // console.log(response)
  return response
};
export const fetcherStudents = async (...args: FetcherArgs) => {
  const response: databaseStudent[] = await fetch(...args).then((res) => res.json());
  // console.log(response)
  return response
};


export const formatParagraph = (text: string) => {
  // Format the text so that every time there is a dot, a new paragraph will be rendered for the following text
  const paragraphs = text.split('.');
  const formattedParagraphs = paragraphs.map((paragraph, index) => (
    index < paragraphs.length - 1 ? paragraph + '.' : paragraph
  ));
  const nonEmptyParagraphs = formattedParagraphs.filter(para => para.trim() !== '');

  return nonEmptyParagraphs;
};
