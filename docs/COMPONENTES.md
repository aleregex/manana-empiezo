# 🧩 Componentes - Fierro

Documentación de los componentes principales de la aplicación.

---

## 📱 BottomNavigation

**Ubicación**: `components/bottom-navigation.tsx`  
**Tipo**: Client Component  
**Fase**: 2 - Layout y Navegación

### Descripción

Componente de navegación inferior para móviles que proporciona acceso rápido a las 3 secciones principales de la aplicación.

### Uso

```tsx
import BottomNavigation from "@/components/bottom-navigation";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <main>{children}</main>
        <BottomNavigation />
      </body>
    </html>
  );
}
```

### Props

Este componente **no recibe props**. Es completamente autónomo.

### Características

#### ✅ Auto-ocultamiento

El componente se oculta automáticamente en:
- `/` (landing)
- `/onboarding`

Se muestra en:
- `/home`
- `/routine`
- `/profile`

#### ✅ Estado Activo

Detecta automáticamente la ruta actual usando `usePathname()` y aplica:
- Color azul (`blue-600` / `blue-400`)
- Indicador visual superior (barra de 1px)
- Escala del icono 110%
- Font weight semibold

#### ✅ Accesibilidad

- `aria-label` en el nav
- `aria-label` en cada enlace
- `aria-current="page"` en el activo
- Focus visible habilitado

#### ✅ Safe Areas

Soporte completo para dispositivos iOS con notch:

```tsx
<div className="h-[env(safe-area-inset-bottom)]" />
```

### Estructura Visual

```
┌─────────────────────────────────────────┐
│ ◄─ Indicador activo (solo en activo)   │
├─────────┬─────────────┬─────────────────┤
│         │             │                 │
│   🏠    │     💪      │       👤        │
│         │             │                 │
│  Home   │  Mi Rutina  │     Perfil      │
│         │             │                 │
└─────────┴─────────────┴─────────────────┘
│ Safe Area (iOS)                         │
└─────────────────────────────────────────┘
```

### Estados

#### 1. Home Activo

```
🏠 Home (azul, con indicador)
💪 Mi Rutina (gris)
👤 Perfil (gris)
```

#### 2. Mi Rutina Activo

```
🏠 Home (gris)
💪 Mi Rutina (azul, con indicador)
👤 Perfil (gris)
```

#### 3. Perfil Activo

```
🏠 Home (gris)
💪 Mi Rutina (gris)
👤 Perfil (azul, con indicador)
```

### Personalización

#### Agregar nueva sección

```tsx
const navItems = [
  { href: "/home", label: "Home", icon: "🏠", ariaLabel: "..." },
  { href: "/routine", label: "Mi Rutina", icon: "💪", ariaLabel: "..." },
  { href: "/profile", label: "Perfil", icon: "👤", ariaLabel: "..." },
  // Agregar aquí:
  { href: "/stats", label: "Stats", icon: "📊", ariaLabel: "Ver estadísticas" },
];
```

#### Cambiar colores

```tsx
// Estado activo
className="text-blue-600 dark:text-blue-400"

// Estado inactivo
className="text-gray-500 dark:text-gray-500"

// Hover
className="hover:text-gray-900 dark:hover:text-gray-300"
```

#### Modificar altura

```tsx
// Navegación
<div className="flex justify-around items-stretch h-16">
  
// También actualizar en layout.tsx:
<main className="h-full overflow-y-auto pb-16">
```

### Dependencias

- `next/link` - Navegación del lado del cliente
- `next/navigation` - Hook `usePathname()`
- Tailwind CSS - Estilos

### Performance

- **Re-renders**: Solo cuando cambia la ruta
- **Bundle size**: ~2KB
- **Client-side only**: Marcado con `"use client"`

### Testing

#### Verificar visibilidad

```tsx
// Debe estar visible
visit("/home")
expect(BottomNavigation).toBeVisible()

// Debe estar oculta
visit("/onboarding")
expect(BottomNavigation).not.toBeVisible()
```

#### Verificar estado activo

```tsx
visit("/home")
expect(link("Home")).toHaveClass("text-blue-600")
expect(link("Home")).toHaveAttribute("aria-current", "page")
```

---

## 🎨 Utilities CSS

### `.page-container`

**Ubicación**: `app/globals.css`  
**Uso**: Contenedor estándar para páginas

```css
.page-container {
  min-height: 100vh;
  width: 100%;
  padding: 1rem;
}
```

#### Ejemplo de uso:

```tsx
export default function HomePage() {
  return (
    <div className="page-container">
      <header>...</header>
      <section>...</section>
    </div>
  );
}
```

### `.safe-area-inset-bottom`

**Ubicación**: `app/globals.css`  
**Uso**: Padding para dispositivos iOS con home indicator

```css
.safe-area-inset-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
```

### `.safe-area-inset-top`

**Ubicación**: `app/globals.css`  
**Uso**: Padding para dispositivos iOS con notch

```css
.safe-area-inset-top {
  padding-top: env(safe-area-inset-top);
}
```

### `.sr-only`

**Ubicación**: `app/globals.css`  
**Uso**: Ocultar visualmente pero mantener accesible para screen readers

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 📐 Layout Components

### RootLayout

**Ubicación**: `app/layout.tsx`  
**Tipo**: Server Component

#### Estructura:

```tsx
<html lang="es" className="h-full">
  <body className="h-full overflow-hidden">
    {/* Contenedor principal con scroll */}
    <main className="h-full overflow-y-auto pb-16">
      <div className="min-h-full w-full max-w-2xl mx-auto">
        {children}
      </div>
    </main>
    
    {/* Navegación inferior fija */}
    <BottomNavigation />
  </body>
</html>
```

#### Características:

- **HTML**: Altura completa
- **Body**: Overflow hidden
- **Main**: Scroll vertical + padding inferior
- **Container**: Ancho máximo 672px, centrado
- **Navigation**: Fija en la parte inferior

---

## 🎨 Template de Página

### Página Estándar con Navegación

```tsx
export default function Page() {
  return (
    <div className="page-container">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Título de la Página
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Descripción breve de la página
        </p>
      </header>

      {/* Contenido principal */}
      <section className="space-y-4">
        {/* Cards, listas, etc. */}
        <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          Contenido
        </div>
      </section>
    </div>
  );
}
```

### Página sin Navegación (Onboarding)

```tsx
export default function OnboardingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="max-w-md w-full space-y-6">
        {/* Icono */}
        <div className="text-6xl mb-4">💪</div>
        
        {/* Título */}
        <h1 className="text-4xl font-bold mb-4">
          Título
        </h1>
        
        {/* Descripción */}
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Descripción
        </p>
        
        {/* CTA */}
        <div className="pt-8">
          <a
            href="/home"
            className="inline-block w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors"
          >
            Acción
          </a>
        </div>
      </div>
    </div>
  );
}
```

---

## 🎯 Componentes Futuros

### Planeados para Fase 3+

#### ExerciseCard
- Card para mostrar ejercicios
- Imagen, nombre, series, reps
- Botón de acción

#### ProgressRing
- Anillo de progreso circular
- Porcentaje completado
- Animado

#### WorkoutTimer
- Temporizador de ejercicios
- Controles play/pause/reset
- Notificaciones

#### MotivationCard
- Card con mensaje motivacional
- Rotación diaria
- Diferentes estilos

#### StatsChart
- Gráfico de progreso
- Usando Recharts o similar
- Responsive

---

## 📝 Guías de Estilo

### Naming Conventions

```tsx
// Componentes: PascalCase
export default function BottomNavigation() {}

// Archivos: kebab-case
bottom-navigation.tsx

// Props interfaces: PascalCase + Props
interface BottomNavigationProps {}
```

### Estructura de Archivos

```tsx
// 1. Imports
import React from "react";
import Link from "next/link";

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Componente
export default function Component({ props }: Props) {
  // 3.1 Hooks
  const [state, setState] = useState();
  
  // 3.2 Handlers
  const handleClick = () => {};
  
  // 3.3 Render
  return <div>...</div>;
}
```

### Clases de Tailwind

```tsx
// ✅ Correcto: Orden lógico
className="flex items-center justify-center w-full h-16 px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors hover:bg-blue-700"

// ❌ Evitar: Sin orden
className="text-white rounded-lg h-16 flex bg-blue-600 w-full"
```

**Orden recomendado:**
1. Layout (flex, grid, etc.)
2. Sizing (w-, h-, min-, max-)
3. Spacing (p-, m-)
4. Typography (text-, font-)
5. Colors (bg-, text-, border-)
6. Effects (shadow-, opacity-)
7. Transitions
8. States (hover:, focus:, etc.)

---

## 🔧 Debugging

### BottomNavigation no se muestra

```tsx
// Verificar ruta actual
console.log("pathname:", pathname)

// Verificar condicional
if (pathname === "/onboarding" || pathname === "/") {
  console.log("Navegación oculta")
  return null;
}
```

### Estado activo no funciona

```tsx
// Verificar pathname
console.log("Current:", pathname)
console.log("Item href:", item.href)
console.log("Is active:", pathname === item.href)
```

### Safe area no funciona en iOS

```tsx
// Verificar viewport en layout.tsx
export const viewport: Viewport = {
  viewportFit: "cover" // Necesario para safe-area-inset
}
```

---

**Última actualización**: 13 de Enero, 2026  
**Componentes documentados**: 1 (BottomNavigation)  
**Utilities documentadas**: 4  
**Templates**: 2
