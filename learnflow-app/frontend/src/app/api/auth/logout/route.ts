import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete("better-auth.session_token");
  return NextResponse.json({ success: true });
}
