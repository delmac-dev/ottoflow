"use server";

import { IAIArea } from "./types";
import connect from "@/lib/mongoose";
import Profile from "@/lib/models/profile";

/**
 * RETRIEVES A PROFILE FROM THE DATABASE BY THEIR EMAIL ADDRESS.
 *
 * @param email - The email address of the profile to retrieve.
 * @returns A promise that resolves to the profile object formatted as an IProfile instance.
 */
export async function getProfileByEmail(email: string){
    await connect();

    const profile = await Profile.findOne({ email }).lean();

    console.log("Fetched profile:", profile);

    return {
        id: "1",
        email: "contact@delalitengue.com",
        username: "delmac",
        avatar: "avatar-1",
        password: "c2f10579c54cb0ac1ea0eb4e006956fdc1392e5738942ca507a96f167f1d597b8f95fd581f72859add1876a8228fab2747e200baaa7a8965bfd704ea0f6e209f"
    }
}

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

export async function addTodoAction(title: string) {
  await connect();
  // const todo = await Todo.create({ title });
  // return todo.toObject();
  return {};
}
