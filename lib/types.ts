import { z } from "zod";
import * as Schema from './schema';

export type IProjectFilter = z.infer<typeof Schema.ZProjectFilter>;

export type IQuery = {
  params: {[key: string]: string}
  searchParams: { [key: string]: string }
}

export interface IProject {
  id?: string;
  name: string;
  description: string;
  category: string;
  gallary: string[];
  codeUrl: string;
  demoUrl: string;
  technologies: string[];
  publish: boolean;
  createdAt?: string
  updatedAt?: string
}