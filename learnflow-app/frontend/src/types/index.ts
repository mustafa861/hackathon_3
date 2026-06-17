// // // export type Role = "STUDENT" | "TEACHER" | "ADMIN";

// // // export type MasteryLevel = "BEGINNER" | "LEARNING" | "PROFICIENT" | "MASTERED";

// // // export interface User {
// // //   id: string;
// // //   email: string;
// // //   name?: string;
// // //   role: Role;
// // //   createdAt: Date;
// // //   updatedAt: Date;
// // //   lastLoginAt?: Date;
// // // }

// // // export interface UserProfile {
// // //   id: string;
// // //   userId: string;
// // //   avatar?: string;
// // //   bio?: string;
// // //   timezone: string;
// // //   streak: number;
// // //   lastActive: Date;
// // // }

// // // export interface Session {
// // //   id: string;
// // //   userId: string;
// // //   token: string;
// // //   expiresAt: Date;
// // //   createdAt: Date;
// // //   ipAddress?: string;
// // //   userAgent?: string;
// // // }

// // // export interface Progress {
// // //   id: string;
// // //   userId: string;
// // //   moduleId: number;
// // //   topic: string;
// // //   masteryScore: number;
// // //   masteryLevel: MasteryLevel;
// // //   exercisesCompleted: number;
// // //   quizScores: number[];
// // //   lastUpdated: Date;
// // // }

// // // export interface CodeSubmission {
// // //   id: string;
// // //   userId: string;
// // //   code: string;
// // //   language: string;
// // //   output?: string;
// // //   error?: string;
// // //   status: string;
// // //   executedAt: Date;
// // // }

// // // export interface Exercise {
// // //   id: string;
// // //   title: string;
// // //   description: string;
// // //   moduleId: number;
// // //   difficulty: string;
// // //   starterCode?: string;
// // //   solution?: string;
// // //   testCases?: Record<string, unknown>;
// // //   createdBy: string;
// // // }

// // // export const MASTERY_COLORS: Record<MasteryLevel, string> = {
// // //   BEGINNER: "text-red-500",
// // //   LEARNING: "text-yellow-500",
// // //   PROFICIENT: "text-green-500",
// // //   MASTERED: "text-blue-500",
// // // };

// // // export const MASTERY_LABELS: Record<MasteryLevel, string> = {
// // //   BEGINNER: "Beginner",
// // //   LEARNING: "Learning",
// // //   PROFICIENT: "Proficient",
// // //   MASTERED: "Mastered",
// // // };

// // // export const PYTHON_CURRICULUM = [
// // //   { id: 1, name: "Basics", topics: ["Variables", "Data Types", "Input/Output", "Operators", "Type Conversion"] },
// // //   { id: 2, name: "Control Flow", topics: ["Conditionals", "For Loops", "While Loops", "Break/Continue"] },
// // //   { id: 3, name: "Data Structures", topics: ["Lists", "Tuples", "Dictionaries", "Sets"] },
// // //   { id: 4, name: "Functions", topics: ["Defining Functions", "Parameters", "Return Values", "Scope"] },
// // //   { id: 5, name: "OOP", topics: ["Classes & Objects", "Attributes & Methods", "Inheritance", "Encapsulation"] },
// // //   { id: 6, name: "Files", topics: ["Reading/Writing Files", "CSV Processing", "JSON Handling"] },
// // //   { id: 7, name: "Errors", topics: ["Try/Except", "Exception Types", "Custom Exceptions", "Debugging"] },
// // //   { id: 8, name: "Libraries", topics: ["Installing Packages", "Working with APIs", "Virtual Environments"] },
// // // ];


// // "use client";

// // import { useEffect, useState } from "react";
// // import Link from "next/link";
// // import { User, Role } from "@/types";

// // export default function DashboardPage() {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const demoUser: User = {
// //       id: "demo",
// //       email: "demo@learnflow.ai",
// //       name: "Demo User",
// //       role: "STUDENT" as Role,
// //       createdAt: new Date(),
// //       updatedAt: new Date(),
// //     };
// //     setUser(demoUser);
// //     setLoading(false);
// //   }, []);

// //   const handleLogout = () => {
// //     window.location.href = "/";
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-gray-600">Loading...</div>
// //       </div>
// //     );
// //   }

// //   if (!user) return null;

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <nav className="bg-white shadow-sm border-b">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between h-16">
// //             <div className="flex items-center gap-6">
// //               <Link href="/" className="text-xl font-bold text-blue-600">
// //                 LearnFlow
// //               </Link>
// //               <div className="flex gap-4">
// //                 <Link href="/dashboard" className="text-sm font-medium text-blue-600">
// //                   Dashboard
// //                 </Link>
// //                 <Link href="/chat" className="text-sm text-gray-600 hover:text-gray-900">
// //                   Chat
// //                 </Link>
// //                 <Link href="/quiz" className="text-sm text-gray-600 hover:text-gray-900">
// //                   Quiz
// //                 </Link>
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-4">
// //               <span className="text-sm text-gray-600">
// //                 {user.name || user.email}
// //               </span>
// //               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
// //                 {user.role}
// //               </span>
// //               <a href="/" className="text-sm text-gray-600 hover:text-red-600 font-medium">
// //                 Sign out
// //               </a>
// //             </div>
// //           </div>
// //         </div>
// //       </nav>

// //       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
// //         <div className="px-4 py-6 sm:px-0">
// //           <h1 className="text-2xl font-bold text-gray-900 mb-6">
// //             Welcome back, {user.name || "Student"}!
// //           </h1>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             <div className="card">
// //               <h3 className="text-lg font-semibold mb-2">Current Progress</h3>
// //               <p className="text-gray-600">Module 2: Control Flow - 60% complete</p>
// //             </div>

// //             <div className="card">
// //               <h3 className="text-lg font-semibold mb-2">Mastery Level</h3>
// //               <p className="text-yellow-500 font-medium">Learning (68%)</p>
// //             </div>

// //             <div className="card">
// //               <h3 className="text-lg font-semibold mb-2">Streak</h3>
// //               <p className="text-gray-600">3 days</p>
// //             </div>
// //           </div>

// //           <div className="mt-8">
// //             <h2 className="text-xl font-semibold mb-4">Python Curriculum</h2>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               {PYTHON_MODULES.map((mod) => (
// //                 <div key={mod.id} className="card">
// //                   <h3 className="font-semibold">
// //                     Module {mod.id}: {mod.name}
// //                   </h3>
// //                   <ul className="mt-2 text-sm text-gray-600 space-y-1">
// //                     {mod.topics.map((topic) => (
// //                       <li key={topic}>- {topic}</li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // const PYTHON_MODULES = [
// //   { id: 1, name: "Basics", topics: ["Variables", "Data Types", "Input/Output", "Operators", "Type Conversion"] },
// //   { id: 2, name: "Control Flow", topics: ["Conditionals", "For Loops", "While Loops", "Break/Continue"] },
// //   { id: 3, name: "Data Structures", topics: ["Lists", "Tuples", "Dictionaries", "Sets"] },
// //   { id: 4, name: "Functions", topics: ["Defining Functions", "Parameters", "Return Values", "Scope"] },
// //   { id: 5, name: "OOP", topics: ["Classes & Objects", "Attributes & Methods", "Inheritance", "Encapsulation"] },
// //   { id: 6, name: "Files", topics: ["Reading/Writing Files", "CSV Processing", "JSON Handling"] },
// //   { id: 7, name: "Errors", topics: ["Try/Except", "Exception Types", "Custom Exceptions", "Debugging"] },
// //   { id: 8, name: "Libraries", topics: ["Installing Packages", "Working with APIs", "Virtual Environments"] },
// // ];
// export type Role = "STUDENT" | "TEACHER" | "ADMIN";

// export type MasteryLevel = "BEGINNER" | "LEARNING" | "PROFICIENT" | "MASTERED";

// export interface User {
//   id: string;
//   email: string;
//   name?: string;
//   role: Role;
//   createdAt: Date;
//   updatedAt: Date;
//   lastLoginAt?: Date;
// }

// export interface UserProfile {
//   id: string;
//   userId: string;
//   avatar?: string;
//   bio?: string;
//   timezone: string;
//   streak: number;
//   lastActive: Date;
// }

// export interface Session {
//   id: string;
//   userId: string;
//   token: string;
//   expiresAt: Date;
//   createdAt: Date;
//   ipAddress?: string;
//   userAgent?: string;
// }

// export interface Progress {
//   id: string;
//   userId: string;
//   moduleId: number;
//   topic: string;
//   masteryScore: number;
//   masteryLevel: MasteryLevel;
//   exercisesCompleted: number;
//   quizScores: number[];
//   lastUpdated: Date;
// }

// export interface CodeSubmission {
//   id: string;
//   userId: string;
//   code: string;
//   language: string;
//   output?: string;
//   error?: string;
//   status: string;
//   executedAt: Date;
// }

// export interface Exercise {
//   id: string;
//   title: string;
//   description: string;
//   moduleId: number;
//   difficulty: string;
//   starterCode?: string;
//   solution?: string;
//   testCases?: Record<string, unknown>;
//   createdBy: string;
// }

// export const MASTERY_COLORS: Record<MasteryLevel, string> = {
//   BEGINNER: "text-red-500",
//   LEARNING: "text-yellow-500",
//   PROFICIENT: "text-green-500",
//   MASTERED: "text-blue-500",
// };

// export const MASTERY_LABELS: Record<MasteryLevel, string> = {
//   BEGINNER: "Beginner",
//   LEARNING: "Learning",
//   PROFICIENT: "Proficient",
//   MASTERED: "Mastered",
// };

// export const PYTHON_CURRICULUM = [
//   { id: 1, name: "Basics", topics: ["Variables", "Data Types", "Input/Output", "Operators", "Type Conversion"] },
//   { id: 2, name: "Control Flow", topics: ["Conditionals", "For Loops", "While Loops", "Break/Continue"] },
//   { id: 3, name: "Data Structures", topics: ["Lists", "Tuples", "Dictionaries", "Sets"] },
//   { id: 4, name: "Functions", topics: ["Defining Functions", "Parameters", "Return Values", "Scope"] },
//   { id: 5, name: "OOP", topics: ["Classes & Objects", "Attributes & Methods", "Inheritance", "Encapsulation"] },
//   { id: 6, name: "Files", topics: ["Reading/Writing Files", "CSV Processing", "JSON Handling"] },
//   { id: 7, name: "Errors", topics: ["Try/Except", "Exception Types", "Custom Exceptions", "Debugging"] },
//   { id: 8, name: "Libraries", topics: ["Installing Packages", "Working with APIs", "Virtual Environments"] },
// ];

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, Role } from "@/types";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const demoUser: User = {
      id: "demo",
      email: "demo@learnflow.ai",
      name: "Demo User",
      role: "STUDENT" as Role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setUser(demoUser);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xl font-bold text-blue-600">
                LearnFlow
              </Link>
              <div className="flex gap-4">
                <Link href="/dashboard" className="text-sm font-medium text-blue-600">
                  Dashboard
                </Link>
                <Link href="/chat" className="text-sm text-gray-600 hover:text-gray-900">
                  Chat
                </Link>
                <Link href="/quiz" className="text-sm text-gray-600 hover:text-gray-900">
                  Quiz
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user.name || user.email}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {user.role}
              </span>
              <a href="/" className="text-sm text-gray-600 hover:text-red-600 font-medium">
                Sign out
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Welcome back, {user.name || "Student"}!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Current Progress</h3>
              <p className="text-gray-600">Module 2: Control Flow - 60% complete</p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Mastery Level</h3>
              <p className="text-yellow-500 font-medium">Learning (68%)</p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Streak</h3>
              <p className="text-gray-600">3 days</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Python Curriculum</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PYTHON_MODULES.map((mod) => (
                <div key={mod.id} className="card">
                  <h3 className="font-semibold">
                    Module {mod.id}: {mod.name}
                  </h3>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1">
                    {mod.topics.map((topic) => (
                      <li key={topic}>- {topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const PYTHON_MODULES = [
  { id: 1, name: "Basics", topics: ["Variables", "Data Types", "Input/Output", "Operators", "Type Conversion"] },
  { id: 2, name: "Control Flow", topics: ["Conditionals", "For Loops", "While Loops", "Break/Continue"] },
  { id: 3, name: "Data Structures", topics: ["Lists", "Tuples", "Dictionaries", "Sets"] },
  { id: 4, name: "Functions", topics: ["Defining Functions", "Parameters", "Return Values", "Scope"] },
  { id: 5, name: "OOP", topics: ["Classes & Objects", "Attributes & Methods", "Inheritance", "Encapsulation"] },
  { id: 6, name: "Files", topics: ["Reading/Writing Files", "CSV Processing", "JSON Handling"] },
  { id: 7, name: "Errors", topics: ["Try/Except", "Exception Types", "Custom Exceptions", "Debugging"] },
  { id: 8, name: "Libraries", topics: ["Installing Packages", "Working with APIs", "Virtual Environments"] },
];