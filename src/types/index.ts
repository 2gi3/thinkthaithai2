import { ReactNode } from 'react'
import { Document, Model } from "mongoose";


export type LayoutProps = {
  children: ReactNode
}

export interface CurrencyState {
  value: string
  selectorIsOpen: boolean
}

export interface LocaleToLanguage {
  [key: string]: string;
}

export interface Currency {
  currency: string;
  country: string;
}


export interface IStudent {
  name?: string;
  email: string;
  password?: string;
  type?: string;
  providerAccountId?: string;
  fundedLessons?: number;
  imageFile?: string;
  access_token?: string;
  imageURL?: string;
  startedCourses?: string[];
  completedCourses?: string[];
  provider?: string;
  expires_at?: {
    $numberInt: number
  },
  scope?: string,
  token_type?: string,
  id_token?: string,
  userId?: {
    $oid: string
  },
}

export interface IStudentDocument extends IStudent, Document { }

export interface IStudentModel extends Model<IStudentDocument> { }

export interface databaseStudent {
  email: string;
  emailVerified: null | boolean;
  image?: string;
  name?: string;
  paidLessons?: number;
  _id: string;
}

export type FetcherArgs = [RequestInfo, RequestInit?];

export interface SpinnerProps {
  diameter: number;
}

export interface IFeedback {
  name: string;
  job: string;
  location: string;
  title: string;
  body: string;
  imageFile?: string;
  imageURL?: string;
}
export interface IFeedbackDocument extends IFeedback, Document { }

export interface IFeedbackModel extends Model<IFeedbackDocument> { }

export interface DatabaseFeedback extends IFeedback {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICourse {
  title: string;
  description: string;
  status: string;
  level: string;
  prerequisites: string[];

  introduction: {
    videoURL: string;
    header: string;
    body: string;
    footer: string;
  };

  lessons: Array<{
    title: string;
    videoURL: string;
    header: string;
    body: string;
    footer: string;
  }>;

}

export interface DatabaseCourse extends ICourse {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface ICourseDocument extends ICourse, Document { }

export interface ICourseModel extends Model<ICourseDocument> { }