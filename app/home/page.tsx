"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { OnboardingData } from "@/types/onboarding";
import { LEVEL_OPTIONS, GOAL_OPTIONS } from "@/types/onboarding";

export default function HomePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<OnboardingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("fierro_profile");
    if (!stored) {
      // Si no hay perfil, redirigir a onboarding
      router.push("/onboarding");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setProfile(parsed);
    } catch (error) {
      console.error("Error loading profile:", error);
      router.push("/onboarding");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">💪</div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null; // Redirigiendo...
  }

  const levelLabel = LEVEL_OPTIONS.find(
    (l) => l.value === profile.level
  )?.label;
  const goalOption = GOAL_OPTIONS.find((g) => g.value === profile.goal);

  return (
    <div className="page-container">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">¡Bienvenido! 💪</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Aquí está tu dashboard personalizado
        </p>
      </header>

      <section className="space-y-4">
        {/* Resumen del perfil */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-900">
          <h2 className="text-lg font-semibold mb-4 text-blue-900 dark:text-blue-100">
            Tu Plan Personalizado
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">
                Frecuencia
              </p>
              <p className="font-bold text-blue-900 dark:text-blue-100">
                {profile.daysPerWeek}{" "}
                {profile.daysPerWeek === 1 ? "día" : "días"}/semana
              </p>
            </div>
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">
                Duración
              </p>
              <p className="font-bold text-blue-900 dark:text-blue-100">
                {profile.hoursPerSession}{" "}
                {profile.hoursPerSession === 1 ? "hora" : "horas"}/sesión
              </p>
            </div>
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">
                Nivel
              </p>
              <p className="font-bold text-blue-900 dark:text-blue-100">
                {levelLabel}
              </p>
            </div>
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">
                Objetivo
              </p>
              <p className="font-bold text-blue-900 dark:text-blue-100">
                {goalOption?.icon} {goalOption?.label}
              </p>
            </div>
          </div>
        </div>

        {/* Próxima rutina */}
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold mb-2">Próxima Rutina</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Comienza tu entrenamiento cuando estés listo
          </p>
          <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
            Iniciar Entrenamiento
          </button>
        </div>

        {/* Progreso */}
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold mb-2">Tu Progreso</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Entrenamientos completados esta semana: 0/{profile.daysPerWeek}
          </p>
        </div>
      </section>
    </div>
  );
}
