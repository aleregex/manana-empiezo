"use client";

import { LEVEL_OPTIONS, type FitnessLevel } from "@/types/onboarding";
import { OptionCard } from "./option-card";

interface Step2LevelProps {
  value: FitnessLevel | null;
  onChange: (value: FitnessLevel) => void;
}

/**
 * Paso 2: ¿Tu nivel actual?
 */
export function Step2Level({ value, onChange }: Step2LevelProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🎯</div>
        <h2 className="text-2xl font-bold mb-2">¿Cuál es tu nivel actual?</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Sé honesto, esto nos ayuda a personalizar tu experiencia
        </p>
      </div>

      <div className="space-y-4">
        {LEVEL_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            value={option.value}
            label={option.label}
            description={option.description}
            isSelected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
