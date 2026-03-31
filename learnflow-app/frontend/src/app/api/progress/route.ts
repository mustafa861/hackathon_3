import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const progress = [
    { moduleId: 1, topic: "Variables", masteryScore: 85, masteryLevel: "PROFICIENT", exercisesCompleted: 8, quizScores: [90, 80, 85] },
    { moduleId: 2, topic: "Loops", masteryScore: 60, masteryLevel: "LEARNING", exercisesCompleted: 6, quizScores: [55, 65] },
    { moduleId: 3, topic: "Lists", masteryScore: 35, masteryLevel: "BEGINNER", exercisesCompleted: 3, quizScores: [30, 40] },
  ];

  return NextResponse.json({ progress });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, moduleId, topic, score } = body;

    const masteryLevel =
      score >= 91 ? "MASTERED" : score >= 71 ? "PROFICIENT" : score >= 41 ? "LEARNING" : "BEGINNER";

    return NextResponse.json({
      success: true,
      masteryLevel,
      message: `Progress updated: ${topic} is now ${masteryLevel}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 }
    );
  }
}
