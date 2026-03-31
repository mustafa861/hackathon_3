import { NextResponse } from "next/server";

const AGENT_RESPONSES: Record<string, { response: string; agent: string }> = {
  explain: {
    agent: "Concepts Agent",
    response: "Great question! Let me explain that concept with examples.\n\nIn Python, this works by...",
  },
  error: {
    agent: "Debug Agent",
    response: "I see the error. The issue is likely in how you're using the syntax.\n\nHere's what's happening:\n1. The error indicates...\n2. The fix is to...\n\nTry this instead:",
  },
  review: {
    agent: "Code Review Agent",
    response: "Your code looks good! Here are some suggestions:\n\n- Consider using a list comprehension for cleaner code\n- Add type hints for better readability\n- The variable naming could be more descriptive",
  },
  exercise: {
    agent: "Exercise Agent",
    response: "Here's a practice exercise for you:\n\nWrite a function that takes a list of numbers and returns only the even ones.\n\n```python\ndef get_evens(numbers):\n    # Your code here\n    pass\n```",
  },
  progress: {
    agent: "Progress Agent",
    response: "Here's your progress summary:\n\n- Module 1 (Basics): 85% - Proficient\n- Module 2 (Control Flow): 60% - Learning\n- Module 3 (Data Structures): 35% - Beginner\n\nKeep practicing loops to improve your Control Flow score!",
  },
};

function detectIntent(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("error") || lower.includes("bug") || lower.includes("wrong") || lower.includes("doesn't work")) return "error";
  if (lower.includes("review") || lower.includes("check my code") || lower.includes("improve")) return "review";
  if (lower.includes("exercise") || lower.includes("practice") || lower.includes("challenge")) return "exercise";
  if (lower.includes("progress") || lower.includes("how am i doing") || lower.includes("score")) return "progress";
  return "explain";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const intent = detectIntent(message);
    const agentResponse = AGENT_RESPONSES[intent] || AGENT_RESPONSES.explain;

    return NextResponse.json({
      response: agentResponse.response,
      agent: agentResponse.agent,
      intent,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
