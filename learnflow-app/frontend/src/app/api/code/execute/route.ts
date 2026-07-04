import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, language = "python" } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Code is required", output: null, status: "error" },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.BACKEND_URL || "https://muahmmadmustafa-hackathon3.hf.space"}/api/v1/code/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language, timeout: 30 }),
    });

    const data = await response.json();
    return NextResponse.json(data);
} catch {
  return NextResponse.json(
    {
      output: null,
      error: "Failed to connet to backend. Please try again.",
      status: "error",
    },
    { status: 200 }
  );
}
}