import { NextResponse } from "next/server";

const SAMPLE_QUIZZES: Record<number, any[]> = {
  1: [
    { id: "1", question: "What is the output of print(type(5))?", options: ["<class 'int'>", "<class 'float'>", "int", "5"], correctIndex: 0, explanation: "type(5) returns <class 'int'>, and print displays it." },
    { id: "2", question: "Which is a valid variable name?", options: ["2name", "my-var", "my_var", "class"], correctIndex: 2, explanation: "Variable names can contain letters, numbers, and underscores but can't start with a number or be a keyword." },
  ],
  2: [
    { id: "3", question: "What does range(3) produce?", options: ["[1, 2, 3]", "[0, 1, 2]", "[0, 1, 2, 3]", "[1, 2]"], correctIndex: 1, explanation: "range(3) generates 0, 1, 2 (starts at 0, stops before 3)." },
  ],
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const moduleId = parseInt(searchParams.get("moduleId") || "1");

  const questions = SAMPLE_QUIZZES[moduleId] || SAMPLE_QUIZZES[1];
  return NextResponse.json({ questions, moduleId });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers, moduleId } = body;

    const questions = SAMPLE_QUIZZES[moduleId] || SAMPLE_QUIZZES[1];
    let score = 0;

    answers.forEach((answerIdx: number, i: number) => {
      if (answerIdx === questions[i]?.correctIndex) score++;
    });

    const percentage = Math.round((score / questions.length) * 100);

    return NextResponse.json({
      score,
      total: questions.length,
      percentage,
      masteryLevel: percentage >= 91 ? "MASTERED" : percentage >= 71 ? "PROFICIENT" : percentage >= 41 ? "LEARNING" : "BEGINNER",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit quiz" }, { status: 500 });
  }
}
