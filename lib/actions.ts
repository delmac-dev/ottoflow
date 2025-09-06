"use server";

import { IAIArea, INode, IProfile, IProject } from "./types";
import { auth } from "@/auth";
import { Types } from "mongoose";
import connect from "@/lib/mongoose";
import Profile from "@/lib/models/profile";
import Board from "./models/board";
import Project from "./models/project";
import { Type } from "lucide-react";

/**
 * RETRIEVES A PROFILE FROM THE DATABASE BY THEIR EMAIL ADDRESS.
 *
 * @param email - The email address of the profile to retrieve.
 * @returns A promise that resolves to the profile object formatted as an IProfile instance.
 */
export async function getProfileByEmail(email: string){
    await connect();

    const profile = await Profile.findOne({ email }).lean();

    return {
        id: "1",
        email: "contact@delalitengue.com",
        username: "delmac",
        avatar: "avatar-1",
        password: "c2f10579c54cb0ac1ea0eb4e006956fdc1392e5738942ca507a96f167f1d597b8f95fd581f72859add1876a8228fab2747e200baaa7a8965bfd704ea0f6e209f"
    }
};

export const editProfile = async ({ profileID, data}: { profileID: string; data: Partial<IProfile>; }) => {
  await connect();

  const updatedProfile = await Profile.findByIdAndUpdate(
    profileID,
    { $set: data },
    { new: true }
  );

  if (!updatedProfile) {
    throw new Error("Profile not found");
  }

  return updatedProfile.toObject();
};

/**
 * SENDS A PROMPT AND OPTIONAL FILE TO THE AI API FOR PROCESSING.
 *
 * @param data - An object containing the prompt and optional file information.
 * @returns A promise that resolves to the AI response data.
 * @throws Error if the AI request fails or returns an error.
 */
export const aiChat = async (data: IAIArea) => {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: data.prompt,
      fileUrl: data.file?.url || ""
    })
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to process AI request")
  }

  const result = await res.json();

  return result;
};

export const getWorkspaceContext = async (projectId: string) => {
  await connect();
  
  const project = await Project.findById(projectId).lean();
  const boards = await Board.find({ project_id: projectId }).lean();

  return {
    project,
    boards
  };
};

export const newProject = async ({ name }: { name: string }) => {
  const session = await auth();
  if (!session || !session.user) return {};
  await connect();

  const project = new Project({
    name,
    owner_id: session.user.id,
    created_at: new Date(),
    updated_at: new Date()
  });

  const saved = await project.save();

  const board  = new Board({
    name: "Main Board",
    project_id: saved._id.toString(),
    root: { type: "root", children: [] },
    created_at: new Date(),
    updated_at: new Date()
  });

  await board.save();

  return saved.toObject();
};

export const getAllProjects = async () => {
  const session = await auth();

  console.log("session", session);
  if (!session || !session.user) return [];

  return [];
  // await connect();

  // const projects = await Project.find(
  //   { owner_id: new Types.ObjectId(session.user.id) },
  //   { _id: 1, name: 1, createdAt: 1, updatedAt: 1 }
  // ).lean<IProject[]>();

  // return projects;
};

export const saveBoardRoot = async ({boardID, root}: {boardID: string; root: INode;}) => {
  await connect();

  const updatedBoard = await Board.findByIdAndUpdate(
    boardID, { root }, { new: true } // return updated doc
  );

  if (!updatedBoard) {
    throw new Error("Board not found");
  }

  return updatedBoard.toObject();
};

export const changeProjectName = async ({projectID, name}: {projectID: string; name: string;}) => {
  await connect();

  const updatedProject = await Project.findByIdAndUpdate(
    projectID,
    { $set: { name } },
    { new: true }
  );

  if (!updatedProject) {
    throw new Error("Project not found");
  }

  return updatedProject.toObject();
};

//save schedule data
export const saveProjectData = async ({projectID, data}: {projectID: string; data: IProject["data"];}) => {
  await connect();

  const updatedProject = await Project.findByIdAndUpdate(
    projectID,
    { $set: data },
    { new: true }
  );

  if (!updatedProject) {
    throw new Error("Project not found");
  }

  return updatedProject.toObject();
};

export const saveProjectProperties = async ({projectID, properties}: {projectID: string; properties: IProject["properties"];}) => {
  await connect();

  const updatedProject = await Project.findByIdAndUpdate(
    projectID,
    { $set: { properties } },
    { new: true }
  );

  if (!updatedProject) {
    throw new Error("Project not found");
  }

  return updatedProject.toObject();
};