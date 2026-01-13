# 🔧 Guía de Setup - Fierro

Esta guía documenta el proceso de configuración inicial del proyecto Fierro.

## 📋 Prerequisitos

Asegúrate de tener instalado:

- **Node.js**: v20 o superior
- **pnpm**: v10 o superior
- Un editor de código (recomendado: VS Code)

## 🚀 Instalación

### 1. Clonar o crear el proyecto

El proyecto fue inicializado con:

```bash
pnpm create next-app@latest . --typescript --tailwind --app --use-pnpm --yes
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Iniciar servidor de desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📦 Estructura del Proyecto

```
fierro/
├── app/                          # Next.js App Router
│   ├── onboarding/              # Flujo de onboarding
│   │   └── page.tsx
│   ├── home/                    # Página principal
│   │   └── page.tsx
│   ├── routine/                 # Rutinas de entrenamiento
│   │   └── page.tsx
│   ├── profile/                 # Perfil de usuario
│   │   └── page.tsx
│   ├── layout.tsx               # Layout raíz con navegación
│   ├── page.tsx                 # Redirección inicial
│   ├── globals.css              # Estilos globales
│   └── favicon.ico
│
├── components/                   # Componentes reutilizables
│   └── bottom-navigation.tsx    # Barra de navegación inferior
│
├── lib/                         # Utilidades y helpers
│   └── index.ts                 # Funciones compartidas
│
├── types/                       # Definiciones TypeScript
│   └── index.ts                 # Tipos globales
│
├── public/                      # Archivos estáticos
│   └── *.svg
│
├── .vscode/                     # Configuración VS Code
│   ├── settings.json           # Settings del editor
│   └── extensions.json         # Extensiones recomendadas
│
├── docs/                        # Documentación
│   └── SETUP.md                # Esta guía
│
├── package.json                 # Dependencias del proyecto
├── tsconfig.json                # Configuración TypeScript
├── next.config.ts               # Configuración Next.js
├── postcss.config.mjs           # Configuración PostCSS
├── eslint.config.mjs            # Configuración ESLint
├── README.md                    # Documentación principal
└── CHECKLIST.md                 # Checklist de desarrollo
```

## 🎨 Configuración de Tailwind CSS

El proyecto usa **Tailwind CSS v4** con PostCSS. La configuración se encuentra en:

- `postcss.config.mjs` - Configuración de PostCSS
- `app/globals.css` - Variables CSS y estilos base

### Variables CSS disponibles:

```css
--background     /* Color de fondo (light/dark) */
--foreground     /* Color de texto (light/dark) */
--font-sans      /* Fuente Geist Sans */
--font-mono      /* Fuente Geist Mono */
```

## 📱 Configuración Mobile-First

El proyecto está optimizado para dispositivos móviles:

### Viewport Configuration

```typescript
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}
```

### Safe Areas para iOS

```css
.safe-area-inset-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
```

### Navegación Inferior

El componente `BottomNavigation` proporciona:
- Navegación fija en la parte inferior
- 3 rutas principales (Home, Rutina, Perfil)
- Estado activo visual
- Soporte para dark mode
- Safe area para dispositivos con notch

## 🔧 Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Inicia servidor de desarrollo (localhost:3000)

# Producción
pnpm build        # Genera build optimizado
pnpm start        # Inicia servidor de producción

# Calidad de código
pnpm lint         # Ejecuta ESLint
```

## 🗂️ Convenciones de Código

### Nombres de Archivos

- **Componentes**: `kebab-case.tsx` (e.g., `bottom-navigation.tsx`)
- **Páginas**: `page.tsx` (convención Next.js App Router)
- **Layouts**: `layout.tsx` (convención Next.js)
- **Utilidades**: `kebab-case.ts` (e.g., `format-date.ts`)
- **Tipos**: `kebab-case.ts` (e.g., `user-types.ts`)

### Nombres de Componentes

```typescript
// PascalCase para componentes
export default function BottomNavigation() { }
export function UserProfile() { }

// camelCase para funciones y variables
const getCurrentUser = () => { }
const userName = "Juan"

// UPPER_CASE para constantes
const MAX_RETRIES = 3
const API_URL = "https://api.example.com"
```

### Imports

```typescript
// 1. Imports de Node/externos
import { useState } from "react"
import Link from "next/link"

// 2. Imports locales con alias
import BottomNavigation from "@/components/bottom-navigation"
import { formatDate } from "@/lib/utils"

// 3. Imports de tipos
import type { User } from "@/types"

// 4. Imports de estilos
import "./styles.css"
```

## 🎯 Rutas Configuradas

| Ruta | Descripción | Estado |
|------|-------------|--------|
| `/` | Redirección a onboarding | ✅ |
| `/onboarding` | Flujo de bienvenida | 🚧 |
| `/home` | Dashboard principal | 🚧 |
| `/routine` | Vista de rutinas | 🚧 |
| `/profile` | Perfil de usuario | 🚧 |

**Leyenda:**
- ✅ Completado
- 🚧 En desarrollo
- ⏳ Pendiente

## 🔍 TypeScript

El proyecto usa TypeScript con `strict` mode:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2017",
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Path Aliases

El alias `@/` apunta a la raíz del proyecto:

```typescript
// ✅ Correcto
import { Button } from "@/components/button"

// ❌ Evitar
import { Button } from "../../components/button"
```

## 🎨 VS Code Setup

Extensiones recomendadas (automáticamente sugeridas):

1. **Tailwind CSS IntelliSense** - Autocompletado de clases
2. **Prettier** - Formateo de código
3. **ESLint** - Linting
4. **TypeScript Next** - Soporte TypeScript mejorado

La configuración en `.vscode/settings.json` incluye:
- Format on save habilitado
- ESLint auto-fix on save
- Tailwind IntelliSense para className

## 🌐 Metadata y SEO

```typescript
export const metadata: Metadata = {
  title: "Fierro - Tu compañero de fitness",
  description: "Una experiencia de fitness impulsada por IA",
}
```

## 📊 Build Output

Después de ejecutar `pnpm build`, verás:

```
Route (app)
┌ ○ /                # Landing/Redirect
├ ○ /_not-found      # 404 automático
├ ○ /home            # Dashboard
├ ○ /onboarding      # Bienvenida
├ ○ /profile         # Perfil
└ ○ /routine         # Rutinas

○  (Static)  prerendered as static content
```

Todas las páginas son **static** por defecto (generadas en build time).

## 🔜 Próximos Pasos

1. **Configurar variables de entorno** para integraciones futuras
2. **Implementar diseño** de las páginas creadas
3. **Integrar Supabase** para backend
4. **Agregar autenticación** de usuarios
5. **Implementar IA** para recomendaciones

## 📝 Notas Importantes

- El servidor de desarrollo usa **Turbopack** (más rápido que Webpack)
- Las páginas son **Server Components** por defecto
- Usa `"use client"` solo cuando necesites interactividad del cliente
- El proyecto está optimizado para **mobile-first**
- Dark mode está **habilitado** por defecto

## 🐛 Troubleshooting

### El servidor no inicia

```bash
# Limpia caché y reinstala
rm -rf .next node_modules
pnpm install
pnpm dev
```

### Errores de TypeScript

```bash
# Regenera los tipos de Next.js
pnpm dev
# Luego reinicia tu editor
```

### Cambios no se reflejan

- Verifica que el archivo esté guardado
- Limpia la caché del navegador
- Reinicia el servidor de desarrollo

---

**Configurado**: 13 de Enero, 2026  
**Next.js**: 16.1.1  
**React**: 19.2.3  
**TypeScript**: 5.9.3  
**Tailwind CSS**: 4.1.18
