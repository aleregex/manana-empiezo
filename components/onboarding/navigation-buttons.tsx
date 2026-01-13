"use client";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
  canContinue: boolean;
}

/**
 * Botones de navegación del onboarding
 */
export function NavigationButtons({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onFinish,
  canContinue,
}: NavigationButtonsProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex gap-4 mt-8">
      {!isFirstStep && (
        <button
          onClick={onBack}
          className="flex-1 px-6 py-4 rounded-full border-2 border-gray-300 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Atrás
        </button>
      )}

      <button
        onClick={isLastStep ? onFinish : onNext}
        disabled={!canContinue}
        className={`
          flex-1 px-6 py-4 rounded-full font-semibold transition-all
          ${
            canContinue
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
          }
        `}
      >
        {isLastStep ? "Completar" : "Siguiente"}
      </button>
    </div>
  );
}
