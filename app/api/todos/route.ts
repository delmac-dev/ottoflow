import { NextResponse } from "next/server";
import connect from "@/lib/mongoose";
// import Todo from "@/lib/models/todos";

export async function GET() {
  await connect();
  // const todos = await Todo.find().lean();
  return NextResponse.json({});
}

export async function POST(request: Request) {
  await connect();
  const body = await request.json();
  // const todo = await Todo.create(body);
  return NextResponse.json({});
}