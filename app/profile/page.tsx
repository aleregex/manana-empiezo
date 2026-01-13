export default function ProfilePage() {
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
          <p className="text-gray-600 dark:text-gray-400">
            Contenido del perfil
          </p>
        </div>
      </section>
    </div>
  );
}
