import { NextRequest, NextResponse } from "next/server";
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import z from "zod";

// Tools Schema Definitions
const ResponderParamsSchema = z.object({
  type: z.enum(['error', 'success']),
  message: z.string()
});

// Dynamic schedule schema - fixed structure for schedule data
const ScheduleItemSchema = z.object({
  course: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  location: z.string(),
  lecturer: z.string()
});

const PostDataParamsSchema = z.object({
  schedules: z.array(ScheduleItemSchema)
});

const ToolCallSchema = z.discriminatedUnion('tool', [
  z.object({
    tool: z.literal('responder'),
    parameters: ResponderParamsSchema
  }),
  z.object({
    tool: z.literal('postData'),
    parameters: PostDataParamsSchema
  })
]);

// Tool Functions
const tools = {
  responder: (params: { type: 'error' | 'success'; message: string }) => {
    console.log('Responder Tool Called:', params);
    return {
      type: params.type,
      message: params.message,
      success: params.type === 'success'
    };
  },
  
  postData: (params: { 
    schedules: Array<{
      course: string;
      start_time: string;
      end_time: string;
      location: string;
      lecturer: string;
    }> 
  }) => {

    return {
      success: true,
      message: 'Schedule data extracted and posted successfully',
      data: params
    };
  }
};

const SUPER_PROMPT = `You are an intelligent scheduling assistant that helps users extract and organize schedule information from timetable PDFs. Your role is to:

1. FIRST: Carefully analyze the uploaded PDF to understand its structure and content
2. SECOND: Extract the relevant information based on the user's specific request
3. THIRD: Consolidate consecutive time periods for the same course
4. FOURTH: Structure the data using the appropriate tool

ANALYSIS PROCESS:
1. Examine the PDF content thoroughly
2. Identify schedule information: courses, times, locations, lecturers
3. Note the specific format and structure used in the document

TIME CONSOLIDATION RULES:
- If the same course appears in consecutive time periods on the same day with the same location and lecturer, combine them
- Example: "8:00-8:55" and "9:00-9:55" for COE 486 should become "8:00" start, "9:55" end
- Example: "10:30-11:25" and "11:30-12:25" for COE 480 should become "10:30" start, "12:25" end
- Only consolidate if: same day, same course, same location, same lecturer, consecutive time periods

TOOL USAGE RULES:
- Use 'responder' tool for summaries, explanations, or errors
- Use 'postData' tool when extracting actual schedule data

RESPONDER TOOL - Use when:
- User asks for summary or explanation
- There are errors or issues
- Parameters: {type: "success" | "error", message: "description of what you did"}

POSTDATA TOOL - Use when:
- User wants to extract specific schedule data
- Parameters: 
  * schedules: Array of schedule objects with exactly these fields:
    - course: Course code/name (e.g., "COE 486")
    - start_time: Start time (e.g., "8:00")
    - end_time: End time (e.g., "9:55")
    - location: Location/room (e.g., "ECR", "LAB", "A110")
    - lecturer: Lecturer name (e.g., "A. S. Agbemenu")

EXTRACTION STRATEGY:
- Extract exactly what the user requests from their prompt
- Consolidate consecutive periods for same course/location/lecturer combination
- Use 24-hour format times (e.g., "8:00", "14:00")
- Include day information in the course field if needed

CONSOLIDATION EXAMPLE:
Instead of:
- {course: "COE 486", start_time: "8:00", end_time: "8:55", location: "ECR", lecturer: "A. S. Agbemenu"}
- {course: "COE 486", start_time: "9:00", end_time: "9:55", location: "ECR", lecturer: "A. S. Agbemenu"}

Consolidate to:
- {course: "COE 486", start_time: "8:00", end_time: "9:55", location: "ECR", lecturer: "A. S. Agbemenu"}

Now analyze the uploaded PDF and respond to the user's specific request with proper time consolidation.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileUrl, prompt } = body;

    console.log({ fileUrl, prompt });

    if (!fileUrl || !prompt) {
      return NextResponse.json({ error: "fileUrl and prompt are required" }, { status: 400 });
    }

    const result = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: ToolCallSchema,
      messages: [
        {
          role: 'system',
          content: SUPER_PROMPT
        },
        {
          role: 'user',
          content: [
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

    // Execute the appropriate tool based on AI response
    const { tool, parameters } = result.object;
    let toolResult;

    if (tool === 'responder') {
      toolResult = tools.responder(parameters);
    } else if (tool === 'postData') {
      toolResult = tools.postData(parameters);
    } else {
      toolResult = tools.responder({ type: 'error', message: 'Unknown tool requested' });
    }

    return NextResponse.json({ 
      message: "AI Processing Complete",
      result: toolResult,
    });

  } catch (error: any) {

    // Use responder tool for error handling
    const errorResult = tools.responder({ 
      type: 'error', 
      message: `Processing failed: ${error.message}` 
    });
    
    return NextResponse.json({ 
      error: "AI processing failed", 
      result: errorResult,
      details: error.message 
    }, { status: 500 });
  }
};