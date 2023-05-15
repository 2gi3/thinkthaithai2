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
  type?:string;
  providerAccountId?:string;
  fundedLessons?: number;
  imageFile?: string;
  access_token?:string;
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

export interface IStudentDocument extends IStudent, Document {}

export interface IStudentModel extends Model<IStudentDocument> {}

export type FetcherArgs = [RequestInfo, RequestInit?];
  
export interface SpinnerProps {
  diameter: number;
}
  