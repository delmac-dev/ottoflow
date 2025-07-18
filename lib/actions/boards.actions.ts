import { IBoard } from "../types";
import { addTimeStamp } from "../utils";
import { format, getDb } from "../utils.mongo";

type IEditBoard = Required<Pick<IBoard, 'id'>>;

export async function getBoard({ projectID }: { projectID: string }) {

  // TODO get board data where project_id = projectID

  return {};
};

export async function newBoard(data: { ownerID: string, projectID: string }) {

  const parsedData = format.to(addTimeStamp<IBoard>(data));

  await using db = await getDb();
  
  await db.B.insertOne(parsedData);

  return "success";
}

export async function cloneBoard(data:IBoard) {

  // TODO: create a new board for the cloned project

  return "success";
}

export async function editBoard(data: IEditBoard) {

  // TODO: update project with _id = data.id with data.[...boardProperties, elements object_list]

  return "success";
};

export async function deleteBoard({projectID}:{projectID: string}) {

  // TODO: delete board where project_id = projectID;

  return "success";
}