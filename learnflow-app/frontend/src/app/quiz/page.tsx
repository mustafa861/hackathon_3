"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Quiz from "@/components/quiz/Quiz";

const SAMPLE_QUESTIONS = [
  {
    id: "1",
    question: "What is the output of the following code?",
    code: "x = [1, 2, 3]\nprint(x[1])",
    options: ["1", "2", "3", "Error"],
    correctIndex: 1,
    explanation: "Python lists are 0-indexed, so x[1] returns the second element, which is 2.",
  },
  {
    id: "2",
    question: "Which keyword is used to define a function in Python?",
    options: ["function", "def", "func", "define"],
    correctIndex: 1,
    explanation: "The 'def' keyword is used to define functions in Python.",
  },
  {
    id: "3",
    question: "What does the len() function return?",
    options: ["The type of an object", "The length of an object", "The memory address", "The value"],
    correctIndex: 1,
    explanation: "len() returns the number of items in a container (string, list, tuple, etc.).",
  },
  {
    id: "4",
    question: "What is the output?",
    code: "for i in range(3):\n    print(i, end=' ')",
    options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"],
    correctIndex: 1,
    explanation: "range(3) generates 0, 1, 2. The end=' ' keeps them on one line.",
  },
  {
    id: "5",
    question: "Which of these is mutable?",
    options: ["tuple", "string", "list", "int"],
    correctIndex: 2,
    explanation: "Lists are mutable - you can change their contents after creation. Tuples, strings, and ints are immutable.",
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [finalScore, setFinalScore] = useState<{ score: number; total: number } | null>(null);

  useEffect(() => {
    const demoUser = {
      id: "demo",
      email: "demo@learnflow.ai",
      name: "Demo User",
      role: "STUDENT",
    };
    setUser(demoUser);
    setLoading(false);
  }, []);

  const handleComplete = (score: number, total: number) => {
    setFinalScore({ score, total });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xl font-bold text-primary-600">LearnFlow</Link>
              <div className="flex gap-4">
                <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</Link>
                <Link href="/chat" className="text-sm text-gray-600 hover:text-gray-900">Chat</Link>
                <Link href="/quiz" className="text-sm font-medium text-primary-600">Quiz</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Python Basics Quiz</h1>
        <Quiz questions={SAMPLE_QUESTIONS} onComplete={handleComplete} />
        {finalScore && (
          <div className="mt-6 card text-center">
            <p className="text-lg">
              You scored {finalScore.score}/{finalScore.total} ({Math.round((finalScore.score / finalScore.total) * 100)}%)
            </p>
            <Link href="/chat" className="btn-primary max-w-xs mx-auto mt-4">
              Continue Learning
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
