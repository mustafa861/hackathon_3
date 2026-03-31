"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StruggleAlerts from "@/components/teacher/StruggleAlerts";
import ExerciseGenerator from "@/components/teacher/ExerciseGenerator";

interface Student {
  id: string;
  name: string;
  email: string;
  module: string;
  masteryScore: number;
  lastActive: string;
}

const SAMPLE_STUDENTS: Student[] = [
  { id: "1", name: "Maya Johnson", email: "maya@school.edu", module: "Control Flow", masteryScore: 68, lastActive: "2 min ago" },
  { id: "2", name: "James Chen", email: "james@school.edu", module: "Data Structures", masteryScore: 35, lastActive: "5 min ago" },
  { id: "3", name: "Sara Williams", email: "sara@school.edu", module: "Functions", masteryScore: 82, lastActive: "15 min ago" },
  { id: "4", name: "Alex Brown", email: "alex@school.edu", module: "Basics", masteryScore: 91, lastActive: "1 hour ago" },
];

const SAMPLE_ALERTS = [
  {
    id: "1",
    studentName: "James Chen",
    studentId: "2",
    type: "repeated_error" as const,
    module: "Data Structures",
    topic: "List Comprehensions",
    timestamp: new Date(Date.now() - 300000),
    details: "Got the same error 3 times on list comprehension exercise",
  },
  {
    id: "2",
    studentName: "Maya Johnson",
    studentId: "1",
    type: "stuck_exercise" as const,
    module: "Control Flow",
    topic: "Nested Loops",
    timestamp: new Date(Date.now() - 600000),
    details: "Stuck on exercise for over 10 minutes",
  },
  {
    id: "3",
    studentName: "James Chen",
    studentId: "2",
    type: "low_quiz" as const,
    module: "Data Structures",
    topic: "Dictionaries",
    timestamp: new Date(Date.now() - 900000),
    details: "Quiz score below 50% (42%)",
  },
];

export default function TeacherPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>(SAMPLE_STUDENTS);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (data?.user) {
          if (data.user.role !== "TEACHER") {
            router.push("/dashboard");
            return;
          }
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

  const handleAssignExercise = async (studentId: string, topic: string) => {
    console.log(`Assigning exercise on ${topic} to student ${studentId}`);
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
                <Link href="/teacher" className="text-sm font-medium text-primary-600">Teacher</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.name || user.email}</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                TEACHER
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <StruggleAlerts alerts={SAMPLE_ALERTS} onAssignExercise={handleAssignExercise} />
          </div>
          <div>
            <ExerciseGenerator />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Students</h2>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Module</th>
                  <th className="text-left py-3 px-4">Mastery</th>
                  <th className="text-left py-3 px-4">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b last:border-0">
                    <td className="py-3 px-4">
                      <div className="font-medium">{student.name}</div>
                      <div className="text-gray-500 text-xs">{student.email}</div>
                    </td>
                    <td className="py-3 px-4">{student.module}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-medium ${
                          student.masteryScore >= 71
                            ? "text-green-600"
                            : student.masteryScore >= 41
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {student.masteryScore}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{student.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
