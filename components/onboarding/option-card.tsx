"use client";

interface OptionCardProps {
  value: string | number;
  label: string;
  description?: string;
  icon?: string;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * Card seleccionable para opciones del onboarding
 */
export function OptionCard({
  value,
  label,
  description,
  icon,
  isSelected,
  onClick,
}: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-6 rounded-xl border-2 text-left transition-all duration-200
        ${
          isSelected
            ? "border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30"
            : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700"
        }
      `}
      aria-pressed={isSelected}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="text-3xl flex-shrink-0" aria-hidden="true">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3
            className={`font-semibold text-lg mb-1 ${
              isSelected
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {label}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        {isSelected && (
          <div
            className="flex-shrink-0 text-blue-600 dark:text-blue-400"
            aria-hidden="true"
          >
            ✓
          </div>
        )}
      </div>
    </button>
  );
}
