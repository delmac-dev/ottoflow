"use server";

import { IAIArea, INode, IProfile, IProfileDetails, IProject } from "./types";
import { auth } from "@/auth";
import mongoose, { Types } from "mongoose";
import connect from "@/lib/mongoose";
import Profile from "@/lib/models/profile";
import Board from "./models/board";
import Project from "./models/project";
import bcrypt from "bcrypt";
import { DEFAULT_PAGE } from "./constant";

/**
 * RETRIEVES A PROFILE FROM THE DATABASE BY THEIR EMAIL ADDRESS.
 *
 * @param email - The email address of the profile to retrieve.
 * @returns A promise that resolves to the profile object formatted as an IProfile instance.
 */
export async function getProfileByEmail(email: string){
  await connect();
  const profile = await Profile.findOne({ email }).lean<IProfile & { _id: Types.ObjectId }>();
  if (!profile) return null;

  return {
    id: profile._id.toString(),
    email: profile.email,
    username: profile.username,
    avatar: profile.avatar,
    password: profile.password,
  };
};

export async function getProfileByID(id: string) {
  await connect();
  const profile = await Profile.findById(id).lean<IProfile & { _id: Types.ObjectId }>();
  if (!profile) return null;

  return {
    email: profile.email,
    username: profile.username,
    avatar: profile.avatar,
  };
}

/**
 * CREATES A NEW PROFILE IN THE DATABASE.
 *
 * @param email - The email address for the new profile.
 * @param password - The password for the new profile.
 * @returns A promise that resolves to the created profile object.
 * @throws Error if profile creation fails or email already exists.
 */
export async function newProfile(email: string, password: string) {
  await connect();
  
  // Check if profile already exists
  const existingProfile = await Profile.findOne({ email }).lean();
  if (existingProfile) {
    throw new Error("Profile with this email already exists");
  }

  const username = email.split("@")[0];

  const hashedPassword = await bcrypt.hash(password, 10);

  const newProfile = new Profile({
    username,
    email,
    password: hashedPassword,
    avatar: 'brown'
  });

  const result = await newProfile.save();

  return {
    id: result._id.toString(),
    email: result.email,
    username: result.username,
    avatar: result.avatar,
    password: result.password,
  };
}

export const editProfile = async ({ data }: { data: IProfileDetails; }) => {
  await connect();
  const session = await auth();
  if (!session || !session.user) return { success: false };

  const { email, ...rest} = data;

  const updatedProfile = await Profile.findByIdAndUpdate(
    session.user.id,
    { $set: rest },
    {new: true, runValidators: true, lean: true}
  ).lean<IProfile & { _id: Types.ObjectId }>();

  if (!updatedProfile) {
    throw new Error("Profile not found");
  }

  return {
    username: updatedProfile.username,
    avatar: updatedProfile.avatar,
  };
};

export const changePassword = async ({old, newPassword}:{old: string; newPassword: string;}) => {
  await connect();

  const session = await auth();
  if (!session || !session.user) return { success: false };

  const profile = await Profile.findById(session.user.id);
  if (!profile) return {success: false};

  const isMatch = await bcrypt.compare(old, profile.password);
  if (!isMatch) throw new Error("Old password is incorrect");

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  profile.password = hashedNewPassword;
  await profile.save();

  return { success: true };
}

export const deleteProfile = async () => {
  await connect();

  const session = await auth();
  if (!session || !session.user) return { success: false };

  const profile = await Profile.findById(session.user.id);
  if (!profile) return { success: false };

  await profile.deleteOne();

  return { success: true };
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
  if (!session || !session.user) return { success: false };

  await connect();

  const project = new Project({
    name,
    owner_id: session.user.id,
  });

  const savedProject = await project.save();

  try {
    const board = new Board({
      name: "Board 1",
      owner_id: session.user.id,
      project_id: savedProject._id.toString(),
      root: DEFAULT_PAGE,
    });

    await board.save();

    return { success: true };
  } catch (error) {
    await Project.findByIdAndDelete(savedProject._id);
    return { success: false };
  }
};

export const getAllProjects = async () => {
  const session = await auth();
  if (!session || !session.user) return [];

  await connect();

  const projects = await Project.find(
    { owner_id: new Types.ObjectId(session.user.id) }
  )
    .select("_id name createdAt updatedAt")
    .lean();

  console.log({projects});

  return projects.map((p) => ({
    id: (p._id as Types.ObjectId).toString(),
    name: p.name as string,
    createdAt: p.createdAt as Date,
    updatedAt: p.updatedAt as Date,
  }));
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