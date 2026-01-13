/**
 * Types para el flujo de onboarding
 */

export interface OnboardingData {
  daysPerWeek: number | null;
  level: FitnessLevel | null;
  hoursPerSession: number | null;
  goal: FitnessGoal | null;
}

export type FitnessLevel = "beginner" | "intermediate" | "advanced";

export type FitnessGoal =
  | "lose_weight"
  | "gain_muscle"
  | "maintain"
  | "improve_health";

export const DAYS_OPTIONS = [1, 2, 3, 4, 5, 6, 7] as const;

export const HOURS_OPTIONS = [0.5, 1, 1.5, 2, 2.5, 3] as const;

export const LEVEL_OPTIONS: {
  value: FitnessLevel;
  label: string;
  description: string;
}[] = [
  {
    value: "beginner",
    label: "Principiante",
    description: "Nuevo en el gym o menos de 6 meses",
  },
  {
    value: "intermediate",
    label: "Intermedio",
    description: "6 meses a 2 años de experiencia",
  },
  {
    value: "advanced",
    label: "Avanzado",
    description: "Más de 2 años entrenando consistentemente",
  },
];

export const GOAL_OPTIONS: {
  value: FitnessGoal;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "lose_weight",
    label: "Perder peso",
    description: "Reducir grasa corporal",
    icon: "🔥",
  },
  {
    value: "gain_muscle",
    label: "Ganar músculo",
    description: "Aumentar masa muscular",
    icon: "💪",
  },
  {
    value: "maintain",
    label: "Mantener forma",
    description: "Mantener mi estado actual",
    icon: "⚖️",
  },
  {
    value: "improve_health",
    label: "Mejorar salud",
    description: "Sentirme mejor y más saludable",
    icon: "❤️",
  },
];
