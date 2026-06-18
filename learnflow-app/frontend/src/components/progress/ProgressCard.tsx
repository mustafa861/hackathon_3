"use client";

import { MASTERY_COLORS, MASTERY_LABELS, PYTHON_CURRICULUM } from "@/types";

interface ProgressCardProps {
  moduleId: number;
  moduleName: string;
  masteryScore: number;
  masteryLevel: "BEGINNER" | "LEARNING" | "PROFICIENT" | "MASTERED";
  exercisesCompleted: number;
  totalExercises: number;
}

export default function ProgressCard({
  moduleId,
  moduleName,
  masteryScore,
  masteryLevel,
  exercisesCompleted,
  totalExercises,
}: ProgressCardProps) {
  const progressPercent = Math.round(
    (exercisesCompleted / totalExercises) * 100
  );

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">
          Module {moduleId}: {moduleName}
        </h3>
        <span className={`text-sm font-medium ${MASTERY_COLORS[masteryLevel]}`}>
          {MASTERY_LABELS[masteryLevel]}
        </span>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Mastery</span>
          <span>{masteryScore}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              masteryLevel === "BEGINNER"
                ? "bg-red-500"
                : masteryLevel === "LEARNING"
                ? "bg-yellow-500"
                : masteryLevel === "PROFICIENT"
                ? "bg-green-500"
                : "bg-blue-500"
            }`}
            style={{ width: `${masteryScore}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Exercises</span>
        <span>
          {exercisesCompleted}/{totalExercises} ({progressPercent}%)
        </span>
      </div>
    </div>
  );
}