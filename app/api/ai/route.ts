import { NextRequest, NextResponse } from "next/server";
import { generateObject, generateText } from 'ai';
import { google } from '@ai-sdk/google';
import z from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileUrl, prompt } = body;

    // const { text } = await generateText({
    //   model: google('gemini-2.5-flash'),
    //   prompt: 'Write a vegetarian lasagna recipe for 4 people.',
    // });

    const result = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: z.object({
        events: z.array(
          z.object({
            event: z.string(),
            date: z.string()
          }),
        ),
      }),
      prompt: 'List 5 important events from the year 2000.',
    });

    console.log("Generated Result:", result);

    return NextResponse.json({ message: "Success", data: result.object.events });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Something went wrong", details: error.message },{ status: 500 });
  }
};