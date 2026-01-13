"use client";

import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/useOnboarding";
import { Stepper } from "@/components/onboarding/stepper";
import { NavigationButtons } from "@/components/onboarding/navigation-buttons";
import { Step1Days } from "@/components/onboarding/step1-days";
import { Step2Level } from "@/components/onboarding/step2-level";
import { Step3Hours } from "@/components/onboarding/step3-hours";
import { Step4Goal } from "@/components/onboarding/step4-goal";
import { ProtectedRoute } from "@/components/auth/protected-route";

const TOTAL_STEPS = 4;

function OnboardingPageContent() {
  const router = useRouter();
  const {
    data,
    currentStep,
    isLoaded,
    updateData,
    nextStep,
    prevStep,
    isStepValid,
    complete,
  } = useOnboarding();

  // Mostrar loading mientras carga del localStorage
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">💪</div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  const handleFinish = () => {
    complete();
    router.push("/home");
  };

  const canContinue = isStepValid(currentStep);

  return (
    <div className="flex flex-col min-h-screen p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="pt-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Fierro</h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Paso {currentStep} de {TOTAL_STEPS}
          </span>
        </div>
        <Stepper currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      </div>

      {/* Contenido del paso actual */}
      <div className="flex-1 flex flex-col justify-center py-8">
        {currentStep === 1 && (
          <Step1Days
            value={data.daysPerWeek}
            onChange={(value) => updateData({ daysPerWeek: value })}
          />
        )}

        {currentStep === 2 && (
          <Step2Level
            value={data.level}
            onChange={(value) => updateData({ level: value })}
          />
        )}

        {currentStep === 3 && (
          <Step3Hours
            value={data.hoursPerSession}
            onChange={(value) => updateData({ hoursPerSession: value })}
          />
        )}

        {currentStep === 4 && (
          <Step4Goal
            value={data.goal}
            onChange={(value) => updateData({ goal: value })}
          />
        )}
      </div>

      {/* Navegación */}
      <div className="pb-8">
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          onBack={prevStep}
          onNext={nextStep}
          onFinish={handleFinish}
          canContinue={canContinue}
        />
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <ProtectedRoute>
      <OnboardingPageContent />
    </ProtectedRoute>
  );
}
