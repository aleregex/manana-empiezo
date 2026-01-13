"use client";

import { useState, useEffect } from "react";
import type { OnboardingData } from "@/types/onboarding";

const STORAGE_KEY = "fierro_onboarding";

/**
 * Hook para manejar el estado y persistencia del onboarding
 */
export function useOnboarding() {
  const [data, setData] = useState<OnboardingData>({
    daysPerWeek: null,
    level: null,
    hoursPerSession: null,
    goal: null,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar datos del localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed.data || data);
        setCurrentStep(parsed.currentStep || 1);
      } catch (error) {
        console.error("Error loading onboarding data:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Guardar en localStorage cuando cambian los datos
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data, currentStep })
      );
    }
  }, [data, currentStep, isLoaded]);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return data.daysPerWeek !== null;
      case 2:
        return data.level !== null;
      case 3:
        return data.hoursPerSession !== null;
      case 4:
        return data.goal !== null;
      default:
        return false;
    }
  };

  const isComplete = (): boolean => {
    return [1, 2, 3, 4].every((step) => isStepValid(step));
  };

  const reset = () => {
    setData({
      daysPerWeek: null,
      level: null,
      hoursPerSession: null,
      goal: null,
    });
    setCurrentStep(1);
    localStorage.removeItem(STORAGE_KEY);
  };

  const complete = () => {
    // Guardar como completado
    localStorage.setItem(
      "fierro_profile",
      JSON.stringify({
        ...data,
        completedAt: new Date().toISOString(),
      })
    );
    // Limpiar onboarding temporal
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    data,
    currentStep,
    isLoaded,
    updateData,
    nextStep,
    prevStep,
    isStepValid,
    isComplete,
    reset,
    complete,
  };
}
