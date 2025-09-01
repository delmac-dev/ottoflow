import { IAIArea } from "./types";

export const aiChat = async (data:IAIArea) => {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: data.prompt,
      fileUrl: data.file?.url || ""
    })
  });

  if (!res.ok) {
    throw new Error("Failed to chat")
  }

  return res.json();
}