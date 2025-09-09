import { NextRequest, NextResponse } from "next/server";
import { generateText, tool } from 'ai';
import { google } from '@ai-sdk/google';
import z from "zod";
import connect from "@/lib/mongoose";
import Project from "@/lib/models/project";
import { SUPER_PROMPT } from "./prompt";
import { IProject } from "@/lib/types";

// Tool definitions using the new format
const tools = {
  generateNewSchedule: tool({
    description: 'Generate a new schedule based on user input and parsed PDF',
    inputSchema: z.object({
      schedules: z.array(z.record(z.string(), z.string())),
      properties: z.array(z.object({
        type: z.enum(["text", "boolean"]),
        key: z.string(),
      })),
    }),
    execute: async ({ schedules, properties }) => {
      // Store or process schedules
      return { 
        success: true,
        message: 'Schedule data extracted and generated successfully',
        schedules, 
        properties 
      };
    },
  }),

  invalidRequest: tool({
    description: 'Fallback tool when the request cannot be handled',
    inputSchema: z.object({
      reason: z.string().describe('Why the request could not be fulfilled'),
    }),
    execute: async ({ reason }) => {
      // Log or notify about unsupported request
      return { 
        handled: false, 
        success: false,
        reason 
      };
    },
  }),
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileUrl, prompt, projectID } = body;

    if(!projectID) {
      return NextResponse.json({ error: "projectID is required" }, { status: 400 });
    }

    if (!fileUrl && !prompt) {
      return NextResponse.json({ error: "either fileUrl or prompt are required" }, { status: 400 });
    }

    await connect();
    const project = await Project.findById(projectID).lean<IProject | null>();

    const projectContext = `
      Project Name: ${project?.name || "Unnamed Project"}
      Properties: ${JSON.stringify(project?.properties || [], null, 2)}
      Data: ${JSON.stringify(project?.data || [], null, 2)}
    `;

    const result = await generateText({
      model: google('gemini-2.5-pro'),
      tools,
      messages: [
        {
          role: 'system',
          content: SUPER_PROMPT
        },
        {
          role: 'user',
          content: [
            {
              type: "text",
              text: `Project Context:\n${projectContext}`,
            },
            {
              type: 'text',
              text: `User Request: ${prompt}`,
            },
            {
              type: 'file',
              data: new URL(fileUrl),
              mediaType: 'application/pdf',
            },
          ],
        },
      ],
    });

    let toolResult;

    if (result.toolResults?.length) {
      const tool = result.toolResults[0];
      toolResult = tool.output;
    } else {
      toolResult = {
        success: false,
        message: result.text || 'No tool was called by the AI',
      };
    }

    return NextResponse.json({ 
      message: "AI Processing Complete",
      result: toolResult,
    });

  } catch (error: any) {
    return NextResponse.json({ 
      error: "AI processing failed", 
      details: error.message 
    }, { status: 500 });
  }
};