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

### ✅ Completado

- [x] Proyecto Next.js inicializado con TypeScript y Tailwind
- [x] Estructura de carpetas definida (app, components, lib, types)
- [x] Rutas básicas creadas (/onboarding, /home, /routine, /profile)
- [x] Layout base mobile-first configurado
- [x] Componente de navegación inferior implementado
- [x] Configuración de viewport para móviles

### 🔄 Próximos Pasos

- [ ] Implementar flujo de onboarding
- [ ] Diseño de la página principal
- [ ] Sistema de rutinas
- [ ] Integración con IA
- [ ] Autenticación de usuarios

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
