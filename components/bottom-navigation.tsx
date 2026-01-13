"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Componente de navegación inferior para móviles
 * 
 * Características:
 * - Fijo en la parte inferior de la pantalla
 * - 3 secciones principales: Home, Mi Rutina, Perfil
 * - Estados visuales: activo (azul) / inactivo (gris)
 * - Soporte para safe areas en iOS
 * - Sin lógica de negocio, puramente visual
 */
export default function BottomNavigation() {
  const pathname = usePathname();

  // Ocultar navegación en la ruta de onboarding
  if (pathname === "/onboarding" || pathname === "/") {
    return null;
  }

  const navItems = [
    { 
      href: "/home", 
      label: "Home", 
      icon: "🏠",
      ariaLabel: "Ir a la página principal"
    },
    { 
      href: "/routine", 
      label: "Mi Rutina", 
      icon: "💪",
      ariaLabel: "Ver mi rutina de ejercicios"
    },
    { 
      href: "/profile", 
      label: "Perfil", 
      icon: "👤",
      ariaLabel: "Ver mi perfil"
    },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.3)]"
      aria-label="Navegación principal"
    >
      <div className="flex justify-around items-stretch h-16 max-w-2xl mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.ariaLabel}
              aria-current={isActive ? "page" : undefined}
              className={`
                flex flex-col items-center justify-center flex-1 
                transition-all duration-200 ease-in-out
                relative
                ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                }
              `}
            >
              {/* Indicador visual de estado activo */}
              {isActive && (
                <span 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 dark:bg-blue-400 rounded-b-full"
                  aria-hidden="true"
                />
              )}
              
              {/* Icono */}
              <span 
                className={`text-2xl mb-0.5 transition-transform duration-200 ${
                  isActive ? "scale-110" : "scale-100"
                }`}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              
              {/* Label */}
              <span className={`text-xs font-medium ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      
      {/* Safe area para iOS */}
      <div className="h-[env(safe-area-inset-bottom)] bg-white dark:bg-gray-950" />
    </nav>
  );
}
