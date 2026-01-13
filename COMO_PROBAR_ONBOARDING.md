# 🧪 Cómo Probar el Onboarding - Fierro

Guía paso a paso para probar el flujo de onboarding completo.

---

## 🚀 Iniciar el Proyecto

```bash
# Iniciar el servidor de desarrollo
pnpm dev

# El proyecto estará disponible en:
# http://localhost:3000
```

---

## 📝 Flujo de Prueba Completo

### 1. Primera Visita

**Acción**: Abre http://localhost:3000

**Resultado Esperado**:
- ✅ Redirección automática a `/onboarding`
- ✅ Ves el header "Fierro" y "Paso 1 de 4"
- ✅ Ves el stepper con 4 puntos (1° activo en azul)
- ✅ Ves la pregunta: "¿Cuántos días a la semana entrenas?"
- ✅ Ves 7 botones numerados (1-7)
- ✅ Botón "Siguiente" está deshabilitado (gris)

### 2. Paso 1 - Días por Semana

**Acción**: Click en el botón "3"

**Resultado Esperado**:
- ✅ El botón "3" se vuelve azul
- ✅ El botón se escala ligeramente (110%)
- ✅ Aparece mensaje: "Perfecto, 3 días a la semana"
- ✅ Botón "Siguiente" se habilita (azul)

**Acción**: Click en "Siguiente"

**Resultado Esperado**:
- ✅ Avanza al Paso 2
- ✅ Header dice "Paso 2 de 4"
- ✅ Stepper: 1° pequeño azul, 2° ancho azul, 3° y 4° grises
- ✅ Ahora hay botón "Atrás"

### 3. Paso 2 - Nivel de Fitness

**Resultado Esperado**:
- ✅ Ves pregunta: "¿Cuál es tu nivel actual?"
- ✅ Ves 3 cards verticales con descripciones
- ✅ Botón "Siguiente" deshabilitado

**Acción**: Click en card "Intermedio"

**Resultado Esperado**:
- ✅ Card se vuelve azul con borde azul
- ✅ Aparece checkmark ✓ a la derecha
- ✅ Botón "Siguiente" se habilita

**Acción**: Click en "Atrás"

**Resultado Esperado**:
- ✅ Vuelves al Paso 1
- ✅ Tu selección "3 días" sigue ahí (azul)
- ✅ Botón "Siguiente" está habilitado

**Acción**: Click en "Siguiente" nuevamente

**Resultado Esperado**:
- ✅ Vuelves al Paso 2
- ✅ Tu selección "Intermedio" sigue ahí
- ✅ Botón "Siguiente" está habilitado

**Acción**: Click en "Siguiente"

### 4. Paso 3 - Horas por Sesión

**Resultado Esperado**:
- ✅ Ves pregunta: "¿Cuánto tiempo por sesión?"
- ✅ Ves 6 botones con opciones (0.5, 1, 1.5, 2, 2.5, 3)
- ✅ Cada botón muestra número grande + "hora(s)"
- ✅ Botón "Siguiente" deshabilitado

**Acción**: Click en "1.5"

**Resultado Esperado**:
- ✅ Botón se vuelve azul y se escala
- ✅ Aparece mensaje: "Excelente, 1.5 horas por sesión"
- ✅ Botón "Siguiente" se habilita

**Acción**: Click en "Siguiente"

### 5. Paso 4 - Objetivo Principal

**Resultado Esperado**:
- ✅ Header dice "Paso 4 de 4"
- ✅ Ves pregunta: "¿Cuál es tu objetivo principal?"
- ✅ Ves 4 cards con iconos:
  - 🔥 Perder peso
  - 💪 Ganar músculo
  - ⚖️ Mantener forma
  - ❤️ Mejorar salud
- ✅ Botón ahora dice "Completar" (no "Siguiente")
- ✅ Botón "Completar" está deshabilitado

**Acción**: Click en "💪 Ganar músculo"

**Resultado Esperado**:
- ✅ Card se vuelve azul con checkmark
- ✅ Botón "Completar" se habilita

**Acción**: Click en "Completar"

**Resultado Esperado**:
- ✅ Redirección automática a `/home`
- ✅ Ves mensaje: "¡Bienvenido! 💪"
- ✅ Ves card azul "Tu Plan Personalizado" con:
  - Frecuencia: 3 días/semana
  - Duración: 1.5 horas/sesión
  - Nivel: Intermedio
  - Objetivo: 💪 Ganar músculo
- ✅ Ves card "Próxima Rutina"
- ✅ Ves card "Tu Progreso"
- ✅ Navegación inferior está visible

---

## 🔄 Prueba de Persistencia

### Test 1: Recarga en Medio del Flujo

**Setup**:
1. Completa Paso 1 y Paso 2
2. Estás en Paso 3

**Acción**: Presiona F5 (recargar página)

**Resultado Esperado**:
- ✅ Ves loading state brevemente
- ✅ Vuelves al Paso 3 (donde estabas)
- ✅ Stepper muestra correctamente: 1° y 2° completados, 3° activo
- ✅ Selecciones de Paso 1 y 2 están guardadas
- ✅ Puedes ir "Atrás" y ver tus selecciones
- ✅ Puedes continuar normalmente

### Test 2: Cierre y Reapertura del Navegador

**Setup**:
1. Completa hasta Paso 2
2. Cierra el navegador completamente

**Acción**: Abre el navegador y visita http://localhost:3000

**Resultado Esperado**:
- ✅ Redirección a `/onboarding`
- ✅ Estás en Paso 3 (donde dejaste)
- ✅ Selecciones anteriores están ahí
- ✅ Puedes continuar el flujo

### Test 3: Perfil Completado

**Setup**:
1. Completa todo el onboarding
2. Estás en `/home`

**Acción**: Visita http://localhost:3000/onboarding

**Resultado Esperado**:
- ✅ Puedes volver a hacer el onboarding si quieres
- ✅ O implementar redirect a /home si ya hay perfil

**Acción**: Cierra navegador y vuelve a abrir

**Resultado Esperado**:
- ✅ Si visitas `/home` directamente, tus datos están ahí
- ✅ No pierdes tu perfil

---

## 🧹 Limpiar Datos

### Opción 1: DevTools (Recomendado para Testing)

```javascript
// Abre la consola del navegador (F12)

// Limpiar onboarding en progreso:
localStorage.removeItem('fierro_onboarding')

// Limpiar perfil completado:
localStorage.removeItem('fierro_profile')

// Limpiar todo:
localStorage.clear()

// Recargar página:
location.reload()
```

### Opción 2: Application Tab

1. Abre DevTools (F12)
2. Ve a la tab "Application"
3. En el sidebar: Storage → Local Storage → http://localhost:3000
4. Haz click derecho → Clear
5. Recarga la página

---

## ✅ Checklist de Pruebas

### Funcionalidad Básica

- [ ] Redirección inicial a onboarding funciona
- [ ] Stepper muestra correctamente el progreso
- [ ] Botón "Siguiente" deshabilitado sin selección
- [ ] Botón "Siguiente" habilitado con selección
- [ ] Navegación "Atrás" funciona
- [ ] No se puede ir atrás desde Paso 1
- [ ] Paso 4 muestra "Completar" en vez de "Siguiente"
- [ ] Completar redirige a /home

### Validaciones

- [ ] No puedes avanzar sin seleccionar
- [ ] Estados visuales claros (habilitado/deshabilitado)
- [ ] Feedback visual al seleccionar
- [ ] Cada paso valida correctamente

### Persistencia

- [ ] Auto-guardado funciona en cada cambio
- [ ] Recarga mantiene estado y paso actual
- [ ] Selecciones se recuperan correctamente
- [ ] Perfil final se guarda al completar
- [ ] Onboarding temporal se limpia al completar

### UI/UX

- [ ] Diseño mobile-first se ve bien
- [ ] Transiciones suaves
- [ ] Colores consistentes
- [ ] Iconos descriptivos
- [ ] Textos claros
- [ ] Botones táctiles (fácil de tocar)

### Responsive

- [ ] Se ve bien en iPhone (414px)
- [ ] Se ve bien en iPad (768px)
- [ ] Se ve bien en Desktop (1920px)
- [ ] Navegación inferior en mobile
- [ ] Centrado en desktop

### Dark Mode

- [ ] Cambiar sistema a dark mode
- [ ] Colores se adaptan correctamente
- [ ] Contraste es legible
- [ ] Bordes visibles

---

## 🐛 Problemas Comunes y Soluciones

### "No puedo hacer click en los botones"

**Solución**:
- Asegúrate de que el servidor esté corriendo (`pnpm dev`)
- Verifica en la consola si hay errores JavaScript
- Limpia localStorage y recarga

### "Mis datos no se guardan"

**Solución**:
- Verifica que localStorage funcione en tu navegador
- Si estás en modo privado/incognito, localStorage puede estar limitado
- Abre DevTools → Application → Local Storage y verifica que se guarde

### "Al recargar vuelvo al Paso 1"

**Solución**:
- Verifica que `fierro_onboarding` exista en localStorage
- Revisa la consola por errores al parsear JSON
- Limpia localStorage y completa el flujo de nuevo

### "Home no muestra mis datos"

**Solución**:
- Verifica que `fierro_profile` exista en localStorage
- Abre la consola y ejecuta:
  ```javascript
  console.log(localStorage.getItem('fierro_profile'))
  ```
- Debería mostrar tu perfil en formato JSON

---

## 🎯 Escenarios de Prueba Avanzados

### Escenario 1: Cambiar de Opinión

1. Selecciona "Principiante" en Paso 2
2. Avanza al Paso 3
3. Vuelve atrás
4. Cambia a "Avanzado"
5. Avanza nuevamente

**Esperado**: Nueva selección se guarda correctamente

### Escenario 2: Medio Flujo en Mobile, Completar en Desktop

1. Inicia onboarding en móvil (Chrome DevTools)
2. Completa Paso 1 y 2
3. Cambia a vista desktop
4. Completa Paso 3 y 4

**Esperado**: Todo funciona, datos persisten

### Escenario 3: Múltiples Tabs

1. Abre onboarding en Tab 1
2. Completa Paso 1
3. Abre onboarding en Tab 2 (nueva tab)
4. Verifica que esté en Paso 2

**Esperado**: Estado sincronizado entre tabs

---

## 📸 Screenshots Esperados

### Paso 1
```
┌─────────────────────┐
│ Fierro  Paso 1 de 4│
│ ● ━━ ○ ○           │
│                     │
│       📅            │
│ ¿Cuántos días       │
│ entrenas?           │
│                     │
│ [1] [2] [3] [4]    │
│ [5] [6] [7]        │
│                     │
│   [Siguiente] ━━    │
└─────────────────────┘
```

### Paso 4 (Seleccionado)
```
┌─────────────────────┐
│ Fierro  Paso 4 de 4│
│ ● ● ● ━━           │
│                     │
│       🎯            │
│ ¿Tu objetivo?       │
│                     │
│ ┌─────────────────┐ │
│ │ 💪 Ganar músculo│ │
│ │ ✓               │ │ ← Seleccionado
│ └─────────────────┘ │
│                     │
│ [Atrás] [Completar]│
└─────────────────────┘
```

### Home con Datos
```
┌─────────────────────┐
│ ¡Bienvenido! 💪     │
│                     │
│ ╔═══════════════╗   │
│ ║ Tu Plan       ║   │
│ ║ 3 días/semana ║   │
│ ║ 1.5 hrs       ║   │
│ ║ Intermedio    ║   │
│ ║ 💪 Ganar      ║   │
│ ╚═══════════════╝   │
│                     │
│ 🏠  💪  👤          │ ← Navegación
└─────────────────────┘
```

---

## ✨ Tips de Debugging

### Ver Estado en Consola

```javascript
// Estado del onboarding
console.log(JSON.parse(localStorage.getItem('fierro_onboarding')))

// Perfil completado
console.log(JSON.parse(localStorage.getItem('fierro_profile')))

// Ver todo localStorage
console.log(localStorage)
```

### Forzar un Estado Específico

```javascript
// Estar en Paso 3 con datos
localStorage.setItem('fierro_onboarding', JSON.stringify({
  data: {
    daysPerWeek: 3,
    level: 'intermediate',
    hoursPerSession: null,
    goal: null
  },
  currentStep: 3
}))
location.reload()
```

---

**Última actualización**: 13 de Enero, 2026  
**Versión del onboarding**: v1.0  
**Status**: ✅ Listo para testing
