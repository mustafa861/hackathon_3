"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ChatInterface from "@/components/chat/ChatInterface";
import CodeRunner from "@/components/editor/CodeRunner";
import ProgressCard from "@/components/progress/ProgressCard";
import { User, Role } from "@/types";

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"chat" | "code" | "quiz">("chat");

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (data?.user) {
          setUser(data.user);
        } else {
          router.push("/auth/login");
        }
      } catch {
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    }
    fetchSession();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xl font-bold text-primary-600">
                LearnFlow
              </Link>
              <div className="flex gap-4">
                <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/chat" className="text-sm font-medium text-primary-600">
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
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 mb-6">
          {(["chat", "code", "quiz"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-primary-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeTab === "chat" && <ChatInterface />}
            {activeTab === "code" && <CodeRunner />}
            {activeTab === "quiz" && (
              <div className="card text-center text-gray-500 py-12">
                Select a module to start a quiz
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Your Progress</h3>
            {[
              { moduleId: 1, moduleName: "Basics", masteryScore: 85, masteryLevel: "PROFICIENT" as const, exercisesCompleted: 8, totalExercises: 10 },
              { moduleId: 2, moduleName: "Control Flow", masteryScore: 60, masteryLevel: "LEARNING" as const, exercisesCompleted: 6, totalExercises: 10 },
              { moduleId: 3, moduleName: "Data Structures", masteryScore: 35, masteryLevel: "BEGINNER" as const, exercisesCompleted: 3, totalExercises: 10 },
            ].map((mod) => (
              <ProgressCard key={mod.moduleId} {...mod} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
