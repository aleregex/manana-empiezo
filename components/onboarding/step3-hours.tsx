"use client";

import { HOURS_OPTIONS } from "@/types/onboarding";

interface Step3HoursProps {
  value: number | null;
  onChange: (value: number) => void;
}

/**
 * Paso 3: ¿Cuántas horas irás al gym?
 */
export function Step3Hours({ value, onChange }: Step3HoursProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">⏱️</div>
        <h2 className="text-2xl font-bold mb-2">
          ¿Cuánto tiempo por sesión?
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          ¿Cuántas horas irás al gym cada día?
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {HOURS_OPTIONS.map((hours) => (
          <button
            key={hours}
            onClick={() => onChange(hours)}
            className={`
              py-6 px-4 rounded-xl border-2 font-bold text-lg transition-all
              ${
                value === hours
                  ? "border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 scale-105"
                  : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700"
              }
            `}
            aria-pressed={value === hours}
          >
            <div className="text-2xl mb-1">{hours}</div>
            <div className="text-xs opacity-75">
              {hours === 1 ? "hora" : "horas"}
            </div>
          </button>
        ))}
      </div>

      {value !== null && (
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 animate-fade-in">
          Excelente, {value} {value === 1 ? "hora" : "horas"} por sesión
        </p>
      )}
    </div>
  );
}
