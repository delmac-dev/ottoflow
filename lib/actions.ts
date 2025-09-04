"use server";

import { IAIArea } from "./types";
import connect from "@/lib/mongoose";
import Profile from "@/lib/models/profile";

/**
 * Retrieves a profile from the database by their email address.
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
}

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
  
  if (result.tool === 'postData' && result.result?.success) {
    console.log("Schedule data extracted successfully:", result.result.data);
  } else if (result.tool === 'responder' && result.result?.success === false) {
    console.log("AI processing error:", result.result.message);
  }

  return result;
}

export async function addTodoAction(title: string) {
  await connect();
  // const todo = await Todo.create({ title });
  // return todo.toObject();
  return {};
}
