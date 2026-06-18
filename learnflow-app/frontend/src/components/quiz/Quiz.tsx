"use client";

import { useState } from "react";
import { CheckCircle, XCircle, HelpCircle, Trophy } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  code?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

export default function Quiz({ questions, onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctIndex;
    if (isCorrect) setScore((prev) => prev + 1);

    setShowExplanation(true);
    setAnswers((prev) => [...prev, selectedAnswer]);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setIsComplete(true);
      onComplete?.(score + (selectedAnswer === currentQuestion.correctIndex ? 0 : 0), questions.length);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="card text-center">
        <Trophy size={48} className="mx-auto mb-4 text-yellow-500" />
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Quiz Complete!</h2>
        <p className="text-4xl font-bold text-primary-600 mb-2">
          {score}/{questions.length}
        </p>
        <p className="text-lg text-gray-600 mb-4">{percentage}%</p>
        <div className="flex justify-center gap-2">
          {answers.map((answer, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                answer === questions[i].correctIndex
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <span className="text-sm font-medium text-primary-600">
          Score: {score}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">{currentQuestion.question}</h3>

        {currentQuestion.code && (
          <pre className="bg-gray-900 text-green-300 p-4 rounded-lg text-sm font-mono mb-4 overflow-x-auto">
            {currentQuestion.code}
          </pre>
        )}

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            let optionStyle = "border-gray-200 hover:border-primary-300";

            if (showExplanation) {
              if (index === currentQuestion.correctIndex) {
                optionStyle = "border-green-500 bg-green-50";
              } else if (index === selectedAnswer && index !== currentQuestion.correctIndex) {
                optionStyle = "border-red-500 bg-red-50";
              }
            } else if (index === selectedAnswer) {
              optionStyle = "border-primary-500 bg-primary-50";
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${optionStyle}`}
                disabled={showExplanation}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      showExplanation && index === currentQuestion.correctIndex
                        ? "border-green-500 bg-green-500"
                        : showExplanation &&
                          index === selectedAnswer &&
                          index !== currentQuestion.correctIndex
                        ? "border-red-500 bg-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    {showExplanation && index === currentQuestion.correctIndex && (
                      <CheckCircle size={14} className="text-white" />
                    )}
                    {showExplanation &&
                      index === selectedAnswer &&
                      index !== currentQuestion.correctIndex && (
                        <XCircle size={14} className="text-white" />
                      )}
                  </div>
                  <span className="text-sm text-gray-900">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle size={16} className="text-blue-600" />
              <span className="font-medium text-blue-900">Explanation</span>
            </div>
            <p className="text-sm text-blue-800">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          {!showExplanation ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="btn-primary max-w-xs"
            >
              Submit Answer
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary max-w-xs">
              {currentIndex + 1 >= questions.length ? "Finish Quiz" : "Next Question"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}