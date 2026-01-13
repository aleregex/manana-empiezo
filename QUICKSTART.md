# 🚀 Quick Start - Fierro

**¡El proyecto está listo para usarse!** Sigue estos pasos para comenzar:

---

## ⚡ Inicio Rápido

### 1. Instalar dependencias (si no lo has hecho)

```bash
pnpm install
```

### 2. Iniciar servidor de desarrollo

```bash
pnpm dev
```

### 3. Abrir en el navegador

Visita [http://localhost:3000](http://localhost:3000)

**Automáticamente te redirigirá a `/onboarding`**

---

## 🗺️ Navega por las Rutas

Una vez que el servidor esté corriendo, puedes visitar:

- **Onboarding**: [http://localhost:3000/onboarding](http://localhost:3000/onboarding)
- **Home**: [http://localhost:3000/home](http://localhost:3000/home)
- **Rutina**: [http://localhost:3000/routine](http://localhost:3000/routine)
- **Perfil**: [http://localhost:3000/profile](http://localhost:3000/profile)

**💡 Tip:** En móvil o responsive mode, verás la navegación inferior funcionando.

---

## 📱 Probar en Móvil

### Opción 1: Chrome DevTools

1. Abre Chrome DevTools (F12)
2. Click en el icono de dispositivo móvil (Ctrl+Shift+M)
3. Selecciona un dispositivo (iPhone 14 Pro, etc.)
4. Recarga la página

### Opción 2: Dispositivo Real

1. Asegúrate de estar en la misma red WiFi
2. Encuentra tu IP local:
   ```bash
   # macOS
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # O visita cuando corre el servidor, Next.js muestra la URL
   ```
3. Visita desde tu móvil: `http://[TU-IP]:3000`

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
pnpm dev              # Inicia servidor (localhost:3000)

# Producción
pnpm build            # Crea build optimizado
pnpm start            # Inicia servidor de producción

# Calidad
pnpm lint             # Ejecuta ESLint
```

---

## 📂 Estructura Rápida

```
app/
├── home/            → Dashboard principal
├── onboarding/      → Bienvenida
├── profile/         → Perfil usuario
├── routine/         → Rutinas
└── layout.tsx       → Layout global

components/
└── bottom-navigation.tsx  → Navegación inferior

lib/                 → Para tus utilidades
types/               → Para tus tipos TS
```

---

## 🎨 Próximos Pasos

### Empieza a construir:

1. **Personaliza el onboarding** en `app/onboarding/page.tsx`
2. **Diseña el home** en `app/home/page.tsx`
3. **Crea componentes** en `components/`
4. **Agrega utilidades** en `lib/`
5. **Define tipos** en `types/`

---

## 📚 Documentación Completa

- **README.md** - Información general del proyecto
- **CHECKLIST.md** - Todos los items del setup verificados
- **SUMMARY.md** - Resumen ejecutivo detallado
- **docs/SETUP.md** - Guía técnica completa
- **PROJECT_TREE.txt** - Árbol visual del proyecto

---

## 💡 Tips de Desarrollo

### Hot Reload
- Los cambios se reflejan **automáticamente** sin recargar
- Si algo no funciona, guarda el archivo de nuevo

### TypeScript
- Los errores de tipo se muestran en tiempo real
- Usa `@/` para imports: `import X from '@/components/X'`

### Tailwind CSS
- Autocompletado de clases (si tienes la extensión)
- Dark mode automático con `dark:` prefix
- Mobile-first: usa `sm:`, `md:`, `lg:` para responsive

### Navegación
- `BottomNavigation` ya está en el layout
- Solo aparece en `/home`, `/routine`, `/profile`
- Para agregar más rutas, edita `components/bottom-navigation.tsx`

---

## 🐛 ¿Problemas?

### El servidor no inicia

```bash
# Limpia y reinstala
rm -rf .next node_modules
pnpm install
pnpm dev
```

### Errores de TypeScript

```bash
# Inicia el servidor (regenera types)
pnpm dev
# Luego reinicia tu editor (VS Code: Cmd+Shift+P → Reload Window)
```

### Puerto 3000 ocupado

```bash
# Usa otro puerto
pnpm dev -p 3001
```

---

## ✅ Verificación

Todo está funcionando si:

- ✅ El servidor inicia sin errores
- ✅ Puedes ver la página en el navegador
- ✅ La navegación inferior funciona
- ✅ Puedes cambiar entre rutas

---

## 🎯 Estado Actual

**Versión**: v0.1.0 - Setup Inicial  
**Estado**: ✅ Listo para desarrollo  
**Siguiente**: Fase 2 - Implementación de UI

---

## 📞 ¿Dudas?

Revisa:
1. **README.md** - Para información general
2. **docs/SETUP.md** - Para detalles técnicos
3. **CHECKLIST.md** - Para ver qué está hecho

---

💪 **¡Feliz coding! Es hora de construir Fierro.**
