"use client";

import { useState } from "react";
import { Play, RotateCcw, Copy, Check } from "lucide-react";
import CodeEditor from "./CodeEditor";

interface OutputResult {
  output?: string;
  error?: string;
  status: "success" | "error" | "running" | "idle";
  executionTime?: number;
}

interface CodeRunnerProps {
  initialCode?: string;
  onRun?: (code: string) => Promise<OutputResult>;
}

export default function CodeRunner({
  initialCode = "# Write your Python code here\nprint('Hello, World!')\n",
  onRun,
}: CodeRunnerProps) {
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState<OutputResult>({ status: "idle" });
  const [copied, setCopied] = useState(false);

  const handleRun = async () => {
    setResult({ status: "running" });
    const startTime = Date.now();

    try {
      const response = await fetch("/api/code/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language: "python" }),
      });

      const data = await response.json();
      setResult({
        output: data.output,
        error: data.error,
        status: data.error ? "error" : "success",
        executionTime: Date.now() - startTime,
      });
    } catch (error) {
      setResult({
        error: "Failed to execute code. Please try again.",
        status: "error",
        executionTime: Date.now() - startTime,
      });
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setResult({ status: "idle" });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Code Editor</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border rounded-md"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border rounded-md"
          >
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            onClick={handleRun}
            disabled={result.status === "running"}
            className="flex items-center gap-1 px-4 py-1.5 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md disabled:opacity-50"
          >
            <Play size={14} />
            {result.status === "running" ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      <CodeEditor value={code} onChange={setCode} />

      {result.status !== "idle" && (
        <div className="rounded-lg overflow-hidden border border-gray-700">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
            <span className="text-sm text-gray-400">Output</span>
            {result.executionTime && (
              <span className="text-xs text-gray-500">
                {result.executionTime}ms
              </span>
            )}
          </div>
          <pre
            className={`p-4 text-sm font-mono overflow-auto max-h-48 ${
              result.status === "error"
                ? "bg-red-950 text-red-300"
                : "bg-gray-900 text-green-300"
            }`}
          >
            {result.status === "running"
              ? "Running..."
              : result.error || result.output || "(no output)"}
          </pre>
        </div>
      )}
    </div>
  );
}