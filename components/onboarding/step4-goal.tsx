"use client";

import { GOAL_OPTIONS, type FitnessGoal } from "@/types/onboarding";
import { OptionCard } from "./option-card";

interface Step4GoalProps {
  value: FitnessGoal | null;
  onChange: (value: FitnessGoal) => void;
}

/**
 * Paso 4: ¿Cuál es tu objetivo principal?
 */
export function Step4Goal({ value, onChange }: Step4GoalProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🎯</div>
        <h2 className="text-2xl font-bold mb-2">
          ¿Cuál es tu objetivo principal?
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Enfócate en lo más importante para ti ahora
        </p>
      </div>

      <div className="space-y-4">
        {GOAL_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            value={option.value}
            label={option.label}
            description={option.description}
            icon={option.icon}
            isSelected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
