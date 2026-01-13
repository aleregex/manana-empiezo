# 💪 Fierro

Aplicación de fitness personalizada con IA.

## 🚀 Comenzar

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales de Supabase

# Iniciar servidor de desarrollo
pnpm dev
```

El proyecto estará disponible en [http://localhost:3000](http://localhost:3000)

## 🛠️ Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Supabase (Autenticación)

## 📁 Estructura

```
fierro/
├── app/              # Rutas de Next.js
├── components/       # Componentes reutilizables
├── lib/              # Utilidades y configuración
├── types/            # Tipos de TypeScript
└── docs/             # Documentación técnica
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env.local` con:

```env
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

### Supabase + Google OAuth

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ve a Settings > API y copia las credenciales
3. Configura Google OAuth:
   - **En Google Cloud Console**:
     - Crea un proyecto OAuth 2.0
     - Obtén Client ID y Client Secret
   - **En Supabase Dashboard**:
     - Ve a Authentication > Providers > Google
     - Activa Google provider
     - Pega Client ID y Client Secret
     - Copia la Callback URL de Supabase
4. Configura Authentication > URL Configuration en Supabase:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`

## 📝 Scripts

```bash
pnpm dev      # Desarrollo
pnpm build    # Build de producción
pnpm start    # Servidor de producción
pnpm lint     # Linter
```

## 🔐 Autenticación

La app usa **Supabase Auth con Google OAuth**. Los usuarios inician sesión con su cuenta de Google y deben completar el onboarding la primera vez.

## 📖 Documentación

La documentación técnica detallada está en la carpeta `docs/`:

- `docs/SETUP.md` - Configuración del proyecto
- `docs/AUTENTICACION.md` - Sistema de autenticación
- `docs/ONBOARDING.md` - Flujo de onboarding
- `docs/LAYOUT_Y_NAVEGACION.md` - Estructura y navegación
- `docs/COMPONENTES.md` - Componentes principales

---

**Versión**: MVP v0.4  
**Status**: En desarrollo
