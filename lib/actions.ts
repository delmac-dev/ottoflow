import { IAIArea } from "./types";

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
  
  // Log the structured response for debugging
  console.log("AI Chat Response:", result);
  
  if (result.tool === 'postData' && result.result?.success) {
    console.log("Schedule data extracted successfully:", result.result.data);
  } else if (result.tool === 'responder' && result.result?.success === false) {
    console.log("AI processing error:", result.result.message);
  }

  return result;
}