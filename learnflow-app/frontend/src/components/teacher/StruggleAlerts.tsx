"use client";

import { AlertTriangle, Users, TrendingUp, BookOpen } from "lucide-react";

interface StudentAlert {
  id: string;
  studentName: string;
  studentId: string;
  type: "repeated_error" | "stuck_exercise" | "low_quiz" | "confused" | "failed_execution";
  module: string;
  topic: string;
  timestamp: Date;
  details: string;
}

interface StruggleAlertsProps {
  alerts: StudentAlert[];
  onAssignExercise?: (studentId: string, topic: string) => void;
}

export default function StruggleAlerts({ alerts, onAssignExercise }: StruggleAlertsProps) {
  const alertIcons: Record<string, typeof AlertTriangle> = {
    repeated_error: AlertTriangle,
    stuck_exercise: AlertTriangle,
    low_quiz: TrendingUp,
    confused: Users,
    failed_execution: BookOpen,
  };

  const alertColors: Record<string, string> = {
    repeated_error: "bg-red-50 border-red-200",
    stuck_exercise: "bg-orange-50 border-orange-200",
    low_quiz: "bg-yellow-50 border-yellow-200",
    confused: "bg-blue-50 border-blue-200",
    failed_execution: "bg-red-50 border-red-200",
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <AlertTriangle size={20} className="text-red-500" />
        Struggle Alerts ({alerts.length})
      </h3>

      {alerts.length === 0 ? (
        <div className="card text-center text-gray-500">
          No struggle alerts - all students are doing well!
        </div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => {
            const Icon = alertIcons[alert.type] || AlertTriangle;
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${alertColors[alert.type] || "bg-gray-50"}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Icon size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{alert.studentName}</p>
                      <p className="text-sm text-gray-600">
                        {alert.module} - {alert.topic}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{alert.details}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {alert.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  {onAssignExercise && (
                    <button
                      onClick={() => onAssignExercise(alert.studentId, alert.topic)}
                      className="px-3 py-1.5 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
                    >
                      Assign Exercise
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
