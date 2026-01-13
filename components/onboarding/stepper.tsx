"use client";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

/**
 * Indicador de progreso para el onboarding
 */
export function Stepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div
            key={step}
            className={`h-2 rounded-full transition-all duration-300 ${
              isActive
                ? "w-8 bg-blue-600 dark:bg-blue-400"
                : isCompleted
                ? "w-2 bg-blue-600 dark:bg-blue-400"
                : "w-2 bg-gray-300 dark:bg-gray-700"
            }`}
            aria-label={`Paso ${step} de ${totalSteps}`}
            aria-current={isActive ? "step" : undefined}
          />
        );
      })}
    </div>
  );
}
