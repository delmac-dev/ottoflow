import { NextRequest, NextResponse } from "next/server";
import { generateText, tool } from 'ai';
import { google } from '@ai-sdk/google';
import z from "zod";
import connect from "@/lib/mongoose";
import Project from "@/lib/models/project";
import { SUPER_PROMPT } from "./prompt";
import { IProject } from "@/lib/types";
import { saveProjectData, saveProjectProperties } from "@/lib/actions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileUrl, prompt, projectID } = body;

    if (!projectID) {
      return NextResponse.json({ error: "projectID is required" }, { status: 400 });
    }

    if (!fileUrl && !prompt) {
      return NextResponse.json({ error: "either fileUrl or prompt are required" }, { status: 400 });
    }

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
          await saveProjectData({ projectID, data: schedules });
          await saveProjectProperties({ projectID, properties });

          return {
            success: true,
            message: 'Schedule data extracted and generated successfully',
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
            success: false,
            message: reason
          };
        },
      }),
    };

    await connect();
    const project = await Project.findById(projectID).lean<IProject | null>();

    const projectContext = `
      Project Name: ${project?.name || "Unnamed Project"}
      Properties: ${JSON.stringify(project?.properties || [], null, 2)}
      Data: ${JSON.stringify(project?.data || [], null, 2)}
    `;

    const userContent: any[] = [
      {
      type: "text",
      text: `Project Context:\n${projectContext}`,
      }
    ];

    if (prompt) {
      userContent.push({
      type: 'text',
      text: `User Request: ${prompt}`,
      });
    }

    if (fileUrl) {
      userContent.push({
      type: 'file',
      data: new URL(fileUrl),
      mediaType: 'application/pdf',
      });
    }

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
        content: userContent,
      },
      ],
    });

    let toolResult: { success: boolean; message: string };

    if (result.toolResults?.length) {
      const tool = result.toolResults[0];
      toolResult = tool.output as { success: boolean; message: string };
    } else {
      toolResult = {
        success: false,
        message: result.text || 'No tool was called by the AI',
      };
    }

    return NextResponse.json({ ...toolResult });

  } catch (error: any) {
    return NextResponse.json({
      error: "AI processing failed",
      details: error.message
    }, { status: 500 });
  }
};