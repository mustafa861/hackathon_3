import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

const SYSTEM_PROMPT = `You are LearnFlow, a friendly and patient Python tutor for beginners. 

Rules:
- Always respond in a clear, encouraging tone
- Use code examples with proper formatting
- Keep explanations simple and easy to understand
- If the user asks something not related to Python, gently redirect them to Python topics
- When showing code, always use markdown code blocks with python language tag
- Ask follow-up questions to keep the conversation going
- If the user shares an error, explain what it means and how to fix it
- If the user asks for practice, give them a small coding challenge`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "your_api_key_here") {
      return NextResponse.json({
        response: "⚠️ Groq API key is not configured.\n\nPlease add your API key to the .env file:\n\n```\nGROQ_API_KEY=\"your_key_here\"\n```\n\nGet a free key at: https://console.groq.com/keys",
        agent: "System",
      });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response. Please try again.";

    return NextResponse.json({
      response: reply,
      agent: "AI Tutor",
    });
  } catch (error: any) {
    console.error("Groq API error:", error);
    return NextResponse.json(
      {
        response: `Sorry, I encountered an error: ${error?.message || "Unknown error"}\n\nPlease check your Groq API key in the .env file.`,
        agent: "System",
      },
      { status: 500 }
    );
  }
}
