"use client";

import { useState } from "react";
import { Wand2, Loader2 } from "lucide-react";

interface ExerciseGeneratorProps {
  onGenerate?: (exercise: ExerciseData) => void;
}

interface ExerciseData {
  title: string;
  description: string;
  moduleId: number;
  difficulty: "easy" | "medium" | "hard";
  starterCode: string;
  testCases: string;
}

export default function ExerciseGenerator({ onGenerate }: ExerciseGeneratorProps) {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [moduleId, setModuleId] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedExercise, setGeneratedExercise] = useState<ExerciseData | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);

    try {
      const response = await fetch("/api/exercise/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty, moduleId }),
      });

      const data = await response.json();
      setGeneratedExercise(data);
      onGenerate?.(data);
    } catch (error) {
      console.error("Failed to generate exercise:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg black font-semibold flex items-center gap-2">
        <Wand2 size={20} className="text-purple-500" />
        Exercise Generator
      </h3>

      <div className="card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label-text">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., for loops, list comprehensions"
              className="input-field"
            />
          </div>

          <div>
            <label className="label-text">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as "easy" | "medium" | "hard")}
              className="input-field"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="label-text">Module</label>
            <select
              value={moduleId}
              onChange={(e) => setModuleId(Number(e.target.value))}
              className="input-field"
            >
              {[
                "Basics",
                "Control Flow",
                "Data Structures",
                "Functions",
                "OOP",
                "Files",
                "Errors",
                "Libraries",
              ].map((name, i) => (
                <option key={i + 1} value={i + 1}>
                  Module {i + 1}: {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!topic.trim() || isGenerating}
          className="btn-primary max-w-xs"
        >
          {isGenerating ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 size={16} />
              Generate Exercise
            </>
          )}
        </button>
      </div>

      {generatedExercise && (
        <div className="card">
          <h4 className="font-semibold mb-2">{generatedExercise.title}</h4>
          <p className="text-sm text-gray-600 mb-4">{generatedExercise.description}</p>
          <div className="flex gap-2 mb-4">
            <span className="px-2 py-1 text-xs bg-gray-100 rounded">
              {generatedExercise.difficulty}
            </span>
            <span className="px-2 py-1 text-xs bg-gray-100 rounded">
              Module {generatedExercise.moduleId}
            </span>
          </div>
          <pre className="bg-gray-900 text-green-300 p-4 rounded-lg text-sm font-mono overflow-x-auto">
            {generatedExercise.starterCode}
          </pre>
        </div>
      )}
    </div>
  );
}
