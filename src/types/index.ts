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
    name: string;
    email: string;
    password: string;
    fundedLessons?: number;
  }
  
  export interface IStudentDocument extends IStudent, Document {}
  
  export interface IStudentModel extends Model<IStudentDocument> {}
  
  
  