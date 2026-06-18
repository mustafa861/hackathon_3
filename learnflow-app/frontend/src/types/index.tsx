export type Role = "STUDENT" | "TEACHER" | "ADMIN";

export type MasteryLevel = "NOVICE" | "BEGINNER" | "LEARNING" | "COMPETENT" | "PROFICIENT" | "MASTERED" | "EXPERT";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export const MASTERY_COLORS: Record<MasteryLevel, string> = {
  NOVICE: "text-red-500",
  BEGINNER: "text-orange-500",
  LEARNING: "text-yellow-500",
  COMPETENT: "text-blue-500",
  PROFICIENT: "text-green-500",
  MASTERED: "text-purple-500",
  EXPERT: "text-purple-700",
};

export const MASTERY_LABELS: Record<MasteryLevel, string> = {
  NOVICE: "Novice",
  BEGINNER: "Beginner",
  LEARNING: "Learning",
  COMPETENT: "Competent",
  PROFICIENT: "Proficient",
  MASTERED: "Mastered",
  EXPERT: "Expert",
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