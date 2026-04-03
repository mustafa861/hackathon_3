"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ChatInterface from "@/components/chat/ChatInterface";
import CodeRunner from "@/components/editor/CodeRunner";
import ProgressCard from "@/components/progress/ProgressCard";
import { User } from "@/types";

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"chat" | "code" | "quiz">("chat");
  const [error, setError] = useState<string | null>(null);

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
              <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 text-center text-gray-500 py-12">
                Select a module to start a quiz
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
