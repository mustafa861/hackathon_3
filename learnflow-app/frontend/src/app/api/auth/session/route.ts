import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("better-auth.session_token");

    if (!sessionToken) {
      return NextResponse.json(null);
    }

    return NextResponse.json({
      user: {
        id: "unknown",
        email: "unknown",
        name: null,
        role: "STUDENT",
      },
    });
  } catch {
    return NextResponse.json(null);
  }
}
