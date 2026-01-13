"use client";

import { DAYS_OPTIONS } from "@/types/onboarding";

interface Step1DaysProps {
  value: number | null;
  onChange: (value: number) => void;
}

/**
 * Paso 1: ¿Cuántos días a la semana entrenas?
 */
export function Step1Days({ value, onChange }: Step1DaysProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">📅</div>
        <h2 className="text-2xl font-bold mb-2">
          ¿Cuántos días a la semana entrenas?
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Esto nos ayudará a crear una rutina adecuada para ti
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {DAYS_OPTIONS.map((days) => (
          <button
            key={days}
            onClick={() => onChange(days)}
            className={`
              aspect-square rounded-xl border-2 font-bold text-lg transition-all
              ${
                value === days
                  ? "border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 scale-110"
                  : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700"
              }
            `}
            aria-pressed={value === days}
          >
            {days}
          </button>
        ))}
      </div>

      {value !== null && (
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 animate-fade-in">
          Perfecto, {value} {value === 1 ? "día" : "días"} a la semana
        </p>
      )}
    </div>
  );
}
