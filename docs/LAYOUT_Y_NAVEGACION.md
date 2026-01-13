# 📐 Layout Global + Navegación Mobile-First

**Fase 2 del MVP Fierro - COMPLETADO ✅**

---

## 🎯 Objetivo

Definir el layout global de la aplicación y la navegación principal, estableciendo la base visual y estructural para todas las pantallas con un enfoque mobile-first.

---

## 🏗️ Arquitectura del Layout

### Layout Global (`app/layout.tsx`)

El layout global envuelve todas las rutas de la aplicación y proporciona:

```tsx
<html>
  <body>
    <main className="h-full overflow-y-auto pb-16">
      {/* Contenido de las páginas */}
      <div className="max-w-2xl mx-auto">
        {children}
      </div>
    </main>
    
    <BottomNavigation />
  </body>
</html>
```

#### Características clave:

1. **Estructura HTML optimizada**
   - `html` con altura completa
   - `body` con overflow hidden
   - `main` con scroll vertical

2. **Ancho máximo para contenido**
   - `max-w-2xl` (672px) en desktop
   - Ancho completo en móvil
   - Centrado automático con `mx-auto`

3. **Espacio para navegación**
   - `pb-16` (4rem) de padding inferior
   - Previene que el contenido quede oculto

4. **Scroll suave**
   - Contenedor principal con `overflow-y-auto`
   - Smooth scroll habilitado globalmente

---

## 🧭 Componente de Navegación

### Bottom Navigation (`components/bottom-navigation.tsx`)

Navegación inferior fija con 3 secciones principales.

#### Estructura:

```tsx
<nav className="fixed bottom-0 left-0 right-0 z-50">
  <div className="flex justify-around items-stretch h-16">
    <Link href="/home">
      {/* Indicador de estado activo */}
      {/* Icono */}
      {/* Label */}
    </Link>
    {/* ... más enlaces */}
  </div>
  
  {/* Safe area para iOS */}
  <div className="h-[env(safe-area-inset-bottom)]" />
</nav>
```

### Secciones de Navegación:

| Sección | Icono | Ruta | Descripción |
|---------|-------|------|-------------|
| **Home** | 🏠 | `/home` | Dashboard principal |
| **Mi Rutina** | 💪 | `/routine` | Ejercicios y entrenamientos |
| **Perfil** | 👤 | `/profile` | Información personal |

### Estados Visuales:

#### Estado Activo
- **Color**: Azul (`text-blue-600` / `dark:text-blue-400`)
- **Indicador superior**: Barra azul de 1px en la parte superior
- **Escala del icono**: 110% (`scale-110`)
- **Font weight**: Semibold

#### Estado Inactivo
- **Color**: Gris (`text-gray-500`)
- **Hover**: Gris oscuro (`hover:text-gray-900`)
- **Escala del icono**: 100%
- **Font weight**: Medium

### Comportamiento:

1. **Ocultamiento condicional**
   - No se muestra en `/onboarding`
   - No se muestra en `/` (redirect)

2. **Transiciones**
   - Duración: 200ms
   - Easing: ease-in-out
   - Propiedades: color, transform

3. **Accesibilidad**
   - `aria-label` en navegación y enlaces
   - `aria-current="page"` en el activo
   - Focus visible con outline azul

---

## 🎨 Estilos Globales

### Variables CSS

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --nav-height: 4rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### Utilities Mobile-First

#### `.page-container`
```css
.page-container {
  min-height: 100vh;
  width: 100%;
  padding: 1rem;
}
```

Contenedor estándar para todas las páginas con navegación.

#### Safe Areas
```css
.safe-area-inset-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

.safe-area-inset-top {
  padding-top: env(safe-area-inset-top);
}
```

Para dispositivos iOS con notch o home indicator.

### Optimizaciones Mobile

```css
html {
  /* Prevenir bounce en scroll */
  overscroll-behavior: none;
  
  /* Smooth scrolling */
  scroll-behavior: smooth;
  
  /* Remover highlight en tap */
  -webkit-tap-highlight-color: transparent;
  
  /* Fuentes más suaves */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## 📱 Estructura de Páginas

### Template Estándar

```tsx
export default function Page() {
  return (
    <div className="page-container">
      {/* Header de la página */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Título</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Descripción
        </p>
      </header>

      {/* Contenido principal */}
      <section className="space-y-4">
        {/* Cards, listas, etc. */}
      </section>
    </div>
  );
}
```

### Páginas Implementadas:

#### 1. **Onboarding** (`/onboarding`)
- Sin navegación inferior
- Centrado vertical y horizontal
- Botón CTA para comenzar
- Diseño limpio y minimalista

#### 2. **Home** (`/home`)
- Con navegación inferior
- Header con título y descripción
- Cards de contenido placeholder
- Listo para dashboard

#### 3. **Mi Rutina** (`/routine`)
- Con navegación inferior
- Header con título y descripción
- Estructura para lista de ejercicios
- Preparado para temporizador

#### 4. **Perfil** (`/profile`)
- Con navegación inferior
- Header con título y descripción
- Espacio para información de usuario
- Preparado para estadísticas

---

## 🎯 Convenciones Aplicadas

### 1. Sin Lógica de Datos
- El layout no contiene fetch de datos
- Solo estructura visual y navegación
- State management fuera del layout

### 2. Navegación Puramente Visual
- Estados manejados por `usePathname()`
- Sin lógica de autenticación
- Sin validaciones de permisos

### 3. Mobile-First en Todo
- Diseño base para móvil
- Desktop es adaptación natural
- Ancho máximo de 672px en desktop

### 4. Separación de Responsabilidades
- Layout: estructura y navegación
- Páginas: contenido específico
- Componentes: elementos reutilizables

---

## 🔍 Detalles Técnicos

### Viewport Configuration

```tsx
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};
```

### Z-Index Hierarchy

| Elemento | Z-Index | Uso |
|----------|---------|-----|
| Navegación | `z-50` | Siempre visible |
| Modals | `z-[100]` | (Futuro) |
| Tooltips | `z-[200]` | (Futuro) |

### Breakpoints (Tailwind)

| Breakpoint | Min Width | Uso |
|------------|-----------|-----|
| `sm` | 640px | Pequeños ajustes |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Pantallas grandes |

**Nota**: El diseño está optimizado para móvil por defecto, los breakpoints solo ajustan detalles menores.

---

## ✅ Entregables Completados

### 1. Estructura del Layout Global
- ✅ Layout único que envuelve todas las rutas
- ✅ Estructura mobile-first con ancho completo
- ✅ Scroll vertical optimizado
- ✅ Espacio reservado para navegación

### 2. Componente de Navegación Inferior
- ✅ Componente `BottomNavigation` reutilizable
- ✅ 3 secciones: Home, Mi Rutina, Perfil
- ✅ Estados visuales activo/inactivo
- ✅ Sin lógica de negocio

### 3. Rutas Funcionales
- ✅ Todas las rutas renderizan correctamente
- ✅ Navegación no rompe el layout
- ✅ Contenido no queda oculto
- ✅ Transiciones suaves entre rutas

---

## 🎨 Paleta de Colores

### Estados de Navegación

| Estado | Light Mode | Dark Mode |
|--------|-----------|-----------|
| **Activo** | `#2563eb` (blue-600) | `#60a5fa` (blue-400) |
| **Inactivo** | `#6b7280` (gray-500) | `#6b7280` (gray-500) |
| **Hover** | `#111827` (gray-900) | `#d1d5db` (gray-300) |

### Fondos

| Elemento | Light Mode | Dark Mode |
|----------|-----------|-----------|
| **Body** | `#ffffff` | `#0a0a0a` |
| **Cards** | `#ffffff` | `#030712` (gray-950) |
| **Bordes** | `#e5e7eb` (gray-200) | `#1f2937` (gray-800) |

---

## 🔄 Flujo de Navegación

```
┌──────────────┐
│      /       │ (Landing)
│  (redirect)  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ /onboarding  │ (Sin navegación)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    /home     │ ◄─┐
└──────┬───────┘   │
       │           │  (Con navegación
       ▼           │   inferior fija)
┌──────────────┐   │
│   /routine   │ ◄─┤
└──────┬───────┘   │
       │           │
       ▼           │
┌──────────────┐   │
│   /profile   │ ◄─┘
└──────────────┘
```

---

## 🧪 Testing Manual

### Checklist de Verificación:

- [x] La navegación se muestra en páginas correctas
- [x] La navegación se oculta en onboarding
- [x] Los estados activos se muestran correctamente
- [x] Las transiciones son suaves
- [x] El contenido no queda oculto detrás de la navegación
- [x] El scroll funciona correctamente
- [x] Dark mode funciona en navegación
- [x] Safe areas respetadas en iOS
- [x] Build de producción exitoso
- [x] No hay errores de TypeScript
- [x] No hay errores de ESLint

---

## 📊 Métricas

| Métrica | Valor |
|---------|-------|
| **Altura de navegación** | 64px (4rem) |
| **Ancho máximo contenido** | 672px (max-w-2xl) |
| **Padding horizontal** | 16px (1rem) |
| **Duración transiciones** | 200ms |
| **Z-index navegación** | 50 |

---

## 🔜 Próximos Pasos

Con el layout y navegación completados, estás listo para:

1. **Implementar contenido real** en cada página
2. **Crear componentes específicos** (cards, listas, etc.)
3. **Agregar interactividad** a las pantallas
4. **Integrar datos** desde backend/APIs
5. **Añadir animaciones** más complejas

---

## 📝 Notas Importantes

### Performance
- Navegación usa `"use client"` solo donde es necesario
- Páginas son Server Components por defecto
- Transiciones optimizadas con `will-change` implícito

### Accesibilidad
- Todos los enlaces tienen `aria-label`
- Estado activo indicado con `aria-current`
- Focus visible habilitado
- Soporte para `prefers-reduced-motion`

### Compatibilidad
- iOS: Safe areas respetadas
- Android: Navegación estándar funciona
- Desktop: Ancho máximo aplicado
- Tablets: Responsive natural

---

**Fase 2 completada el**: 13 de Enero, 2026  
**Status**: ✅ Listo para Fase 3  
**Build**: ✅ Exitoso  
**Linting**: ✅ Sin errores
