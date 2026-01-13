"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle, user, isLoading: authLoading } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manejar sesión del hash y verificar sesión existente
  useEffect(() => {
    const handleSession = async () => {
      // Si hay hash en la URL (token de Google), Supabase lo maneja automáticamente
      if (window.location.hash) {
        // Dar tiempo a Supabase para procesar el token
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Verificar si hay sesión
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Limpiar la URL y redirigir
          window.history.replaceState({}, document.title, '/login');
          router.push("/home");
        }
      }
    };

    handleSession();
  }, [router]);

  // Si ya está autenticado, redirigir a home
  useEffect(() => {
    if (user && !authLoading) {
      router.push("/home");
    }
  }, [user, authLoading, router]);

  const handleGoogleLogin = async () => {
    setError(null);
    setIsLoading(true);

    const { error } = await signInWithGoogle();

    if (error) {
      setError(error.message || "Hubo un error al iniciar sesión");
      setIsLoading(false);
    }
    
    // Supabase redirige automáticamente a Google
  };

  // Mostrar loading mientras se verifica la sesión
  if (authLoading || (user && !error)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">💪</div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="text-6xl mb-4">💪</div>
          <h1 className="text-3xl font-bold mb-2">Bienvenido a Fierro</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Inicia sesión para continuar
          </p>
        </div>

        {/* Botón de Google */}
        <div className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className={`
              w-full px-6 py-4 rounded-full font-semibold transition-all
              flex items-center justify-center gap-3
              ${
                isLoading
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              }
            `}
          >
            {!isLoading && (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            {isLoading ? "Redirigiendo..." : "Continuar con Google"}
          </button>
        </div>

        {/* Info adicional */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Al continuar, aceptas nuestros términos de servicio y política de privacidad
          </p>
        </div>
      </div>
    </div>
  );
}
