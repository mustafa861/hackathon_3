export type Role = "STUDENT" | "TEACHER" | "ADMIN";

export type MasteryLevel = "BEGINNER" | "LEARNING" | "PROFICIENT" | "MASTERED";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  avatar?: string;
  bio?: string;
  timezone: string;
  streak: number;
  lastActive: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface Progress {
  id: string;
  userId: string;
  moduleId: number;
  topic: string;
  masteryScore: number;
  masteryLevel: MasteryLevel;
  exercisesCompleted: number;
  quizScores: number[];
  lastUpdated: Date;
}

export interface CodeSubmission {
  id: string;
  userId: string;
  code: string;
  language: string;
  output?: string;
  error?: string;
  status: string;
  executedAt: Date;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  moduleId: number;
  difficulty: string;
  starterCode?: string;
  solution?: string;
  testCases?: Record<string, unknown>;
  createdBy: string;
}

export const MASTERY_COLORS: Record<MasteryLevel, string> = {
  BEGINNER: "text-red-500",
  LEARNING: "text-yellow-500",
  PROFICIENT: "text-green-500",
  MASTERED: "text-blue-500",
};

export const MASTERY_LABELS: Record<MasteryLevel, string> = {
  BEGINNER: "Beginner",
  LEARNING: "Learning",
  PROFICIENT: "Proficient",
  MASTERED: "Mastered",
};

export const PYTHON_CURRICULUM = [
  { id: 1, name: "Basics", topics: ["Variables", "Data Types", "Input/Output", "Operators", "Type Conversion"] },
  { id: 2, name: "Control Flow", topics: ["Conditionals", "For Loops", "While Loops", "Break/Continue"] },
  { id: 3, name: "Data Structures", topics: ["Lists", "Tuples", "Dictionaries", "Sets"] },
  { id: 4, name: "Functions", topics: ["Defining Functions", "Parameters", "Return Values", "Scope"] },
  { id: 5, name: "OOP", topics: ["Classes & Objects", "Attributes & Methods", "Inheritance", "Encapsulation"] },
  { id: 6, name: "Files", topics: ["Reading/Writing Files", "CSV Processing", "JSON Handling"] },
  { id: 7, name: "Errors", topics: ["Try/Except", "Exception Types", "Custom Exceptions", "Debugging"] },
  { id: 8, name: "Libraries", topics: ["Installing Packages", "Working with APIs", "Virtual Environments"] },
];
