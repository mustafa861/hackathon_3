"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ChatInterface from "@/components/chat/ChatInterface";
import CodeRunner from "@/components/editor/CodeRunner";
import ProgressCard from "@/components/progress/ProgressCard";
import { User } from "@/types";

const QUIZ_MODULES: Record<string, { questions: QuizQuestion[] }> = {
  Basics: {
    questions: [
      {
        id: "b1",
        question: "What is the output of the following code?",
        code: "x = [1, 2, 3]\nprint(x[1])",
        options: ["1", "2", "3", "Error"],
        correctIndex: 1,
        explanation: "Python lists are 0-indexed, so x[1] returns the second element, which is 2.",
      },
      {
        id: "b2",
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "func", "define"],
        correctIndex: 1,
        explanation: "The 'def' keyword is used to define functions in Python.",
      },
      {
        id: "b3",
        question: "What does the len() function return?",
        options: ["The type of an object", "The length of an object", "The memory address", "The value"],
        correctIndex: 1,
        explanation: "len() returns the number of items in a container (string, list, tuple, etc.).",
      },
      {
        id: "b4",
        question: "What is the output?",
        code: "print(type(3.14))",
        options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'number'>"],
        correctIndex: 1,
        explanation: "3.14 is a floating-point number, so its type is 'float'.",
      },
      {
        id: "b5",
        question: "How do you write a comment in Python?",
        options: ["// comment", "/* comment */", "# comment", "-- comment"],
        correctIndex: 2,
        explanation: "Python uses the '#' symbol for single-line comments.",
      },
    ],
  },
  "Control Flow": {
    questions: [
      {
        id: "cf1",
        question: "What is the output?",
        code: "for i in range(3):\n    print(i, end=' ')",
        options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"],
        correctIndex: 1,
        explanation: "range(3) generates 0, 1, 2. The end=' ' keeps them on one line.",
      },
      {
        id: "cf2",
        question: "What does the 'break' statement do?",
        options: ["Skips the current iteration", "Exits the loop entirely", "Restarts the loop", "Pauses the loop"],
        correctIndex: 1,
        explanation: "'break' immediately exits the innermost loop it is in.",
      },
      {
        id: "cf3",
        question: "What is the output?",
        code: "x = 10\nif x > 5:\n    print('A')\nelif x > 8:\n    print('B')\nelse:\n    print('C')",
        options: ["A", "B", "A B", "C"],
        correctIndex: 0,
        explanation: "x > 5 is True, so 'A' is printed. The elif and else blocks are skipped.",
      },
      {
        id: "cf4",
        question: "What does 'continue' do in a loop?",
        options: ["Exits the loop", "Skips to the next iteration", "Stops the program", "Repeats the current iteration"],
        correctIndex: 1,
        explanation: "'continue' skips the rest of the current iteration and moves to the next one.",
      },
      {
        id: "cf5",
        question: "How many times does this loop run?",
        code: "i = 0\nwhile i < 5:\n    i += 1",
        options: ["4", "5", "6", "Infinite"],
        correctIndex: 1,
        explanation: "The loop runs for i = 0, 1, 2, 3, 4 — that's 5 iterations.",
      },
    ],
  },
  "Data Structures": {
    questions: [
      {
        id: "ds1",
        question: "Which of these is mutable?",
        options: ["tuple", "string", "list", "int"],
        correctIndex: 2,
        explanation: "Lists are mutable - you can change their contents after creation. Tuples, strings, and ints are immutable.",
      },
      {
        id: "ds2",
        question: "What is the output?",
        code: "d = {'a': 1, 'b': 2}\nprint(d.get('c', 0))",
        options: ["None", "0", "Error", "KeyError"],
        correctIndex: 1,
        explanation: "dict.get() returns the default value (0) when the key is not found, instead of raising an error.",
      },
      {
        id: "ds3",
        question: "Which data structure does NOT allow duplicates?",
        options: ["list", "tuple", "set", "dictionary"],
        correctIndex: 2,
        explanation: "Sets only store unique values. Adding a duplicate has no effect.",
      },
      {
        id: "ds4",
        question: "What is the output?",
        code: "t = (1, 2, 3)\nt[0] = 10",
        options: ["(10, 2, 3)", "Error", "(1, 2, 3, 10)", "None"],
        correctIndex: 1,
        explanation: "Tuples are immutable. You cannot change their elements after creation, so this raises a TypeError.",
      },
      {
        id: "ds5",
        question: "How do you add an element to a list?",
        options: ["list.add()", "list.append()", "list.push()", "list.insert()"],
        correctIndex: 1,
        explanation: "list.append() adds an element to the end of the list.",
      },
    ],
  },
};

interface QuizQuestion {
  id: string;
  question: string;
  code?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

function QuizPanel({ questions, onBack }: { questions: QuizQuestion[]; onBack: () => void }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleCheck = () => {
    if (selected === null) return;
    setShowResult(true);
    if (selected === q.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
        <p className="text-4xl font-bold mb-2 text-blue-600">{score}/{questions.length}</p>
        <p className="text-lg text-gray-600 mb-6">You scored {pct}%</p>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Choose Another Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">Question {current + 1} of {questions.length}</span>
        <span className="text-sm font-medium text-blue-600">Score: {score}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>
      <p className="text-lg font-medium mb-4">{q.question}</p>
      {q.code && (
        <pre className="bg-gray-900 text-green-300 p-4 rounded-lg font-mono text-sm mb-6 whitespace-pre-wrap">
          {q.code}
        </pre>
      )}
      <div className="space-y-3 mb-6">
        {q.options.map((opt, i) => (
          <button
            key={i}
            disabled={showResult}
            onClick={() => setSelected(i)}
            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors ${
              showResult
                ? i === q.correctIndex
                  ? "border-green-500 bg-green-50 text-green-800"
                  : i === selected
                    ? "border-red-500 bg-red-50 text-red-800"
                    : "border-gray-200 text-gray-400"
                : selected === i
                  ? "border-blue-500 bg-blue-50 text-blue-800"
                  : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {showResult && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          {q.explanation}
        </div>
      )}
      <div className="flex gap-3">
        {!showResult ? (
          <button
            onClick={handleCheck}
            disabled={selected === null}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {current + 1 < questions.length ? "Next Question" : "See Results"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"chat" | "code" | "quiz">("chat");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  useEffect(() => {
    const demoUser: User = {
      id: "demo",
      email: "demo@learnflow.ai",
      name: "Demo User",
      role: "STUDENT",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setUser(demoUser);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">Loading LearnFlow...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-red-600">Error: No user session found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xl font-bold text-blue-600">
                LearnFlow
              </Link>
              <div className="flex gap-4">
                <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/chat" className="text-sm font-medium text-blue-600">
                  Chat
                </Link>
                <Link href="/quiz" className="text-sm text-gray-600 hover:text-gray-900">
                  Quiz
                </Link>
                {user.role === "TEACHER" && (
                  <Link href="/teacher" className="text-sm text-gray-600 hover:text-gray-900">
                    Teacher
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.name || user.email}</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {user.role}
              </span>
              <a href="/" className="text-sm text-gray-600 hover:text-red-600 font-medium">
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "chat"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "code"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Code
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "quiz"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Quiz
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeTab === "chat" && <ChatInterface />}
            {activeTab === "code" && <CodeRunner />}
            {activeTab === "quiz" && (
              <div>
                {!selectedModule ? (
                  <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold mb-4">Choose a Quiz Module</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {Object.keys(QUIZ_MODULES).map((mod) => (
                        <button
                          key={mod}
                          onClick={() => setSelectedModule(mod)}
                          className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
                        >
                          <p className="font-medium text-gray-900">{mod}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {QUIZ_MODULES[mod].questions.length} questions
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <QuizPanel
                    questions={QUIZ_MODULES[selectedModule].questions}
                    onBack={() => setSelectedModule(null)}
                  />
                )}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">Your Progress</h3>
            <ProgressCard
              moduleId={1}
              moduleName="Basics"
              masteryScore={85}
              masteryLevel="PROFICIENT"
              exercisesCompleted={8}
              totalExercises={10}
            />
            <ProgressCard
              moduleId={2}
              moduleName="Control Flow"
              masteryScore={60}
              masteryLevel="LEARNING"
              exercisesCompleted={6}
              totalExercises={10}
            />
            <ProgressCard
              moduleId={3}
              moduleName="Data Structures"
              masteryScore={35}
              masteryLevel="BEGINNER"
              exercisesCompleted={3}
              totalExercises={10}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
