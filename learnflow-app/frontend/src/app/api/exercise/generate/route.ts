import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic, difficulty, moduleId } = body;

    const exercises: Record<string, any> = {
      "for loops": {
        title: "Sum of Numbers",
        description: `Write a function that calculates the sum of all numbers from 1 to n using a for loop.`,
        moduleId: moduleId || 2,
        difficulty: difficulty || "easy",
        starterCode: `def sum_to_n(n):\n    """Calculate sum of numbers from 1 to n using a for loop."""\n    total = 0\n    # Your code here\n    \n    return total\n\n# Test your function\nprint(sum_to_n(10))  # Should print 55`,
        testCases: JSON.stringify([
          { input: 10, expected: 55 },
          { input: 100, expected: 5050 },
          { input: 1, expected: 1 },
        ]),
      },
    };

    const exercise = exercises[topic.toLowerCase()] || {
      title: `Practice: ${topic}`,
      description: `Write code to demonstrate your understanding of ${topic}.`,
      moduleId: moduleId || 1,
      difficulty: difficulty || "easy",
      starterCode: `# Exercise: ${topic}\n# Write your solution below\n\n`,
      testCases: "[]",
    };

    return NextResponse.json(exercise);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate exercise" },
      { status: 500 }
    );
  }
}
