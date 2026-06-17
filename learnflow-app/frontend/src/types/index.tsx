export type Role = "STUDENT" | "TEACHER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export const MASTERY_COLORS = {
  NOVICE: "#ef4444",
  LEARNING: "#eab308",
  COMPETENT: "#3b82f6",
  PROFICIENT: "#22c55e",
  EXPERT: "#a855f7",
};

export const MASTERY_LABELS = {
  NOVICE: "Novice",
  LEARNING: "Learning",
  COMPETENT: "Competent",
  PROFICIENT: "Proficient",
  EXPERT: "Expert",
};