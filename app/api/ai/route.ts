import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileUrl, prompt } = body;

    // const ai = new GoogleGenAI({});

    // const response = await ai.models.generateContent({
    //   model: "gemini-2.5-flash",
    //   contents: "what is the capital of ghana",
    //   config: {
    //     thinkingConfig: {
    //       thinkingBudget: 0,
    //     },
    //   },
    // });

    // const output = response.text;

    return NextResponse.json({ message: "Success", data: { fileUrl, prompt }});
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Something went wrong", details: error.message },{ status: 500 });
  }
};