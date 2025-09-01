import { z } from "zod";
import * as Schema from './schema';

export type ISignUp = z.infer<typeof Schema.ZSignUp>;
export type ISignIn = z.infer<typeof Schema.ZSignIn>;
export type IAIArea = z.infer<typeof Schema.ZAIArea>;

export type IQuery = {
  params: {[key: string]: string}
  searchParams: { [key: string]: string }
}

export interface IAccount {
  id?: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProject {
  id?: string;
  name: string;
  ownerId: string;
  avatar: string;
  color: string;
  properties: {
    key: string,
    type: string,
    options?: string[]
  }[];
  schedules: {
    [key: string]: string
  }[];
  createdAt?: string;
  updatedAt?: string;
};

export interface IBoard {
  id?: string;
  projectId: string;
  ownerId: string;

  createdAt?: string;
  updatedAt?: string;
}