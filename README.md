# 💪 Fierro

Una experiencia de fitness impulsada por IA para alcanzar tus metas.

> *"Something is cooking... An experimental idea around fitness, motivation, and AI."*

## 🚀 Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Package Manager**: pnpm

## 📁 Estructura del Proyecto

```
fierro/
├── app/                  # Next.js App Router
│   ├── onboarding/       # Flujo de onboarding
│   ├── home/             # Página principal
│   ├── routine/          # Rutinas de entrenamiento
│   ├── profile/          # Perfil de usuario
│   ├── layout.tsx        # Layout raíz
│   └── page.tsx          # Página de entrada
├── components/           # Componentes React reutilizables
│   └── bottom-navigation.tsx
├── lib/                  # Utilidades y lógica compartida
├── types/                # Tipos de TypeScript
└── public/               # Archivos estáticos
```

## 🏃 Comenzar

### Instalación

```bash
pnpm install
```

### Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

> **Nota**: Si ves un warning sobre `uv_interface_addresses`, puedes ignorarlo. Es un problema menor de permisos que no afecta el funcionamiento local del servidor.

### Build

```bash
pnpm build
```

### Producción

```bash
pnpm start
```

## 🎯 MVP - Fase de Setup

### ✅ Fase 1: Setup del Proyecto

- [x] Proyecto Next.js inicializado con TypeScript y Tailwind
- [x] Estructura de carpetas definida (app, components, lib, types)
- [x] Rutas básicas creadas (/onboarding, /home, /routine, /profile)
- [x] Configuración base completada
- [x] Documentación inicial

### ✅ Fase 2: Layout y Navegación Mobile-First

- [x] Layout global único definido
- [x] Estructura mobile-first (ancho completo + scroll vertical)
- [x] Componente BottomNavigation creado y funcional
- [x] 3 secciones de navegación (Home, Mi Rutina, Perfil)
- [x] Estados visuales activo/inactivo implementados
- [x] Safe areas para iOS configuradas
- [x] Estilos globales optimizados
- [x] Todas las páginas actualizadas con estructura consistente

### ✅ Fase 3: Onboarding (4 preguntas + persistencia local)

- [x] Flujo de onboarding con 4 pasos implementado
- [x] Paso 1: ¿Cuántos días a la semana entrenas? (1-7 días)
- [x] Paso 2: ¿Tu nivel actual? (Principiante/Intermedio/Avanzado)
- [x] Paso 3: ¿Cuántas horas por sesión? (0.5-3 horas)
- [x] Paso 4: ¿Cuál es tu objetivo? (4 opciones con iconos)
- [x] Navegación Siguiente/Atrás funcional
- [x] Indicador de progreso (stepper) animado
- [x] Validaciones por paso (no continuar sin selección)
- [x] Persistencia en localStorage (auto-guardado)
- [x] Recuperación de estado al recargar
- [x] Redirección a /home al completar
- [x] Dashboard personalizado con datos del usuario

### 🔄 Próximos Pasos - Fase 4

- [ ] Sistema de rutinas basado en el perfil
- [ ] Biblioteca de ejercicios
- [ ] Temporizador de entrenamientos
- [ ] Tracking de progreso y estadísticas
- [ ] Integración con IA para recomendaciones
- [ ] Autenticación de usuarios con Supabase

## 🎨 Diseño

El proyecto está diseñado con un enfoque **mobile-first**, optimizado para experiencias en dispositivos móviles con:

- Viewport configurado para dispositivos móviles
- Navegación inferior fija
- Safe area para iOS
- Diseño responsivo
- Soporte para modo oscuro

## 📝 Convenciones

- Componentes organizados por funcionalidad
- Separación entre UI y lógica de negocio
- Uso de TypeScript para type safety
- Tailwind CSS para estilos consistentes
- Nombres de archivos en kebab-case

---

**Status**: 🟢 En desarrollo activo

**Versión**: MVP v0.1
