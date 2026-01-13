"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/lib/auth/auth-context";

function ProfilePageContent() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="page-container">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Perfil</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Tu información personal
        </p>
      </header>

      <section className="space-y-4">
        <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 className="font-semibold mb-4">Información de cuenta</h2>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600 dark:text-gray-400">Email:</p>
            <p className="font-medium">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
        >
          Cerrar sesión
        </button>
      </section>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  );
}
