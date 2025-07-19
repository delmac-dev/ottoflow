"use server";

import { IProject } from "../types";
import { addTimeStamp } from "../utils";
import { format, getDb } from "../utils.mongo";
import { newBoard } from "./board.actions";

type IEditProductInfo = Required<Pick<IProject, 'id' | 'name' | 'avatar' | 'color'>>;
type IEditScheduleData = Required<Pick<IProject, 'id' | 'schedules'>>;
type IEditScheduleInfo = Required<Pick<IProject, 'id' | 'properties'>>;
type INewProject = Required<Pick<IProject, 'name' | 'avatar' | 'color' | 'properties'>>;

/**
 * Retrieves an account from the database by their email address.
 *
 * @param email - The email address of the acount to retrieve.
 * @returns A promise that resolves to the account object formatted as an IAccount instance.
 */
export async function getProjects(){

  const projects: IProject[] = [];

  await using db = await getDb();

  const cursor = db.P.find({});

  for await (const object of cursor) {
    const data = format.from<IProject>(object);
    projects.push(data);
  }

  return projects || [];
};

export async function getProject({id}:{id: string}) {

  // TODO get the project with _id = id;

  return {};
};

export async function newProject(data:INewProject) {

  const parsedData = format.to(addTimeStamp<IProject>(data));
    
  await using db = await getDb();

  const result = await db.P.insertOne(parsedData);

  await newBoard({ownerID: "", projectID:""})

  return result.insertedId.toString();
};


export async function cloneProject({id}:{id: string}) {

  // TODO: get board data without id, project_id or owner_id, updated_at or created_at;
  // TODO: get project data without owner_id, created_at or updated_at;
  // TODO: create a new project with project_data, getting back the id of new project;
  // TODO: create a new board with board_data + owner_id + project_id;

  return "success";
};

export async function editProjectInfo(data: IEditProductInfo) {

  // TODO: update project with _id = data.id with data.[name, avatar, color]

  return "success";
};

export async function editScheduleData(data: IEditScheduleData) {

  // TODO: update project with _id = data.id with data.schedules object_list

  return "success";
};

export async function editScheduleInfo(data: IEditScheduleInfo) {
  
  // TODO: update project with _id = data.id with data.properties object_list

  return "success";
};

export async function handlePrompt({prompt, fileUrl}:{prompt: string, fileUrl: string}) {

  console.log({prompt, fileUrl});
  
  return "success";
}

export async function deleteProject({id}:{id: string}) {

  // TODO: delete the board with project_id = id;
  // TODO: delete the project with _id = id;

  return "success";
};