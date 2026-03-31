"use client";

import { useRef, useEffect, useCallback } from "react";
import Editor, { OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  height?: string;
  theme?: "vs-dark" | "light";
}

export default function CodeEditor({
  value,
  onChange,
  language = "python",
  readOnly = false,
  height = "400px",
  theme = "vs-dark",
}: CodeEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = useCallback((editor) => {
    editorRef.current = editor;
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ readOnly });
    }
  }, [readOnly]);

  return (
    <div className="rounded-lg overflow-hidden border border-gray-700">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={(val) => onChange(val || "")}
        onMount={handleEditorDidMount}
        theme={theme}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          wordWrap: "on",
          padding: { top: 12, bottom: 12 },
        }}
      />
    </div>
  );
}
