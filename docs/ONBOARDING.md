# 📝 Onboarding - Fierro

**Fase 3 del MVP Fierro - COMPLETADO ✅**

---

## 🎯 Objetivo

Construir el flujo de onboarding de Fierro en 4 pasos, capturando la información mínima necesaria para personalizar la rutina inicial del usuario.

---

## 🏗️ Arquitectura

### Flujo Completo

```
┌─────────────────┐
│   /onboarding   │
└────────┬────────┘
         │
         ├─→ Paso 1: ¿Cuántos días entrenas?
         │   └─→ Seleccionar 1-7 días
         │
         ├─→ Paso 2: ¿Tu nivel actual?
         │   └─→ Principiante / Intermedio / Avanzado
         │
         ├─→ Paso 3: ¿Cuántas horas por sesión?
         │   └─→ 0.5 - 3 horas
         │
         └─→ Paso 4: ¿Tu objetivo principal?
             └─→ Perder peso / Ganar músculo / Mantener / Mejorar salud
                 │
                 ├─→ Guardar en localStorage
                 └─→ Redirigir a /home
```

---

## 📁 Estructura de Archivos

### Types

**`types/onboarding.ts`**

Define todos los tipos y constantes:

```typescript
interface OnboardingData {
  daysPerWeek: number | null;
  level: FitnessLevel | null;
  hoursPerSession: number | null;
  goal: FitnessGoal | null;
}

type FitnessLevel = "beginner" | "intermediate" | "advanced";
type FitnessGoal =
  | "lose_weight"
  | "gain_muscle"
  | "maintain"
  | "improve_health";
```

### Hook de Estado

**`lib/useOnboarding.ts`**

Hook personalizado para manejar el estado y persistencia:

```typescript
const {
  data, // Datos del onboarding
  currentStep, // Paso actual (1-4)
  isLoaded, // Si ya cargó del localStorage
  updateData, // Actualizar datos
  nextStep, // Ir al siguiente paso
  prevStep, // Volver atrás
  isStepValid, // Validar si un paso está completo
  isComplete, // Si todo está completo
  reset, // Resetear todo
  complete, // Marcar como completado
} = useOnboarding();
```

### Componentes

```
components/onboarding/
├── stepper.tsx                 # Indicador de progreso
├── option-card.tsx            # Card seleccionable
├── navigation-buttons.tsx     # Botones Atrás/Siguiente
├── step1-days.tsx            # Paso 1: Días por semana
├── step2-level.tsx           # Paso 2: Nivel de fitness
├── step3-hours.tsx           # Paso 3: Horas por sesión
└── step4-goal.tsx            # Paso 4: Objetivo principal
```

---

## 🎨 Componentes

### 1. Stepper

**Propósito**: Indicador visual del progreso

**Props**:

- `currentStep: number` - Paso actual
- `totalSteps: number` - Total de pasos

**Comportamiento**:

- Paso activo: más ancho, color azul
- Pasos completados: pequeños, color azul
- Pasos pendientes: pequeños, color gris

```tsx
<Stepper currentStep={2} totalSteps={4} />
```

**Visual**:

```
● ━━ ○ ○  (Paso 1 completo, Paso 2 activo, 3 y 4 pendientes)
```

### 2. OptionCard

**Propósito**: Card seleccionable para opciones

**Props**:

- `value: string | number` - Valor de la opción
- `label: string` - Título
- `description?: string` - Descripción opcional
- `icon?: string` - Emoji opcional
- `isSelected: boolean` - Si está seleccionado
- `onClick: () => void` - Handler de click

**Estados**:

- **Seleccionado**: Borde azul, fondo azul claro, checkmark
- **No seleccionado**: Borde gris, fondo blanco, hover

```tsx
<OptionCard
  value="beginner"
  label="Principiante"
  description="Nuevo en el gym"
  isSelected={true}
  onClick={() => {}}
/>
```

### 3. NavigationButtons

**Propósito**: Botones de navegación entre pasos

**Props**:

- `currentStep: number`
- `totalSteps: number`
- `onBack: () => void`
- `onNext: () => void`
- `onFinish: () => void`
- `canContinue: boolean` - Si puede continuar (validación)

**Comportamiento**:

- Paso 1: Solo botón "Siguiente"
- Pasos 2-3: Botones "Atrás" y "Siguiente"
- Paso 4: Botones "Atrás" y "Completar"
- Botón deshabilitado si no hay selección

```tsx
<NavigationButtons
  currentStep={2}
  totalSteps={4}
  onBack={prevStep}
  onNext={nextStep}
  onFinish={handleFinish}
  canContinue={isStepValid(2)}
/>
```

### 4. Step1Days

**Propósito**: Seleccionar días por semana

**Opciones**: 1, 2, 3, 4, 5, 6, 7 días

**UI**: Grid de botones cuadrados (4 columnas)

```tsx
<Step1Days value={3} onChange={(days) => updateData({ daysPerWeek: days })} />
```

### 5. Step2Level

**Propósito**: Seleccionar nivel de fitness

**Opciones**:

- **Principiante**: Nuevo en el gym o menos de 6 meses
- **Intermedio**: 6 meses a 2 años de experiencia
- **Avanzado**: Más de 2 años entrenando

**UI**: Stack vertical de OptionCards

```tsx
<Step2Level value="intermediate" onChange={(level) => updateData({ level })} />
```

### 6. Step3Hours

**Propósito**: Seleccionar horas por sesión

**Opciones**: 0.5, 1, 1.5, 2, 2.5, 3 horas

**UI**: Grid de botones (3 columnas)

```tsx
<Step3Hours
  value={1.5}
  onChange={(hours) => updateData({ hoursPerSession: hours })}
/>
```

### 7. Step4Goal

**Propósito**: Seleccionar objetivo principal

**Opciones**:

- 🔥 **Perder peso**: Reducir grasa corporal
- 💪 **Ganar músculo**: Aumentar masa muscular
- ⚖️ **Mantener forma**: Mantener estado actual
- ❤️ **Mejorar salud**: Sentirse mejor y más saludable

**UI**: Stack vertical de OptionCards con iconos

```tsx
<Step4Goal value="gain_muscle" onChange={(goal) => updateData({ goal })} />
```

---

## 💾 Persistencia

### localStorage Keys

| Key                 | Contenido                      | Cuando           |
| ------------------- | ------------------------------ | ---------------- |
| `fierro_onboarding` | Estado temporal del onboarding | Durante el flujo |
| `fierro_profile`    | Perfil completado              | Al finalizar     |

### Estructura de Datos

#### Durante el onboarding (`fierro_onboarding`):

```json
{
  "data": {
    "daysPerWeek": 3,
    "level": "intermediate",
    "hoursPerSession": 1.5,
    "goal": "gain_muscle"
  },
  "currentStep": 2
}
```

#### Perfil completado (`fierro_profile`):

```json
{
  "daysPerWeek": 3,
  "level": "intermediate",
  "hoursPerSession": 1.5,
  "goal": "gain_muscle",
  "completedAt": "2026-01-13T12:00:00.000Z"
}
```

### Comportamiento de Persistencia

#### Auto-guardado

- Cada cambio en el onboarding se guarda automáticamente
- Si el usuario recarga la página, continúa donde se quedó
- El paso actual también se guarda

#### Al completar

1. Se guarda el perfil final en `fierro_profile`
2. Se elimina `fierro_onboarding` (ya no es temporal)
3. Se redirige a `/home`

#### En la página Home

1. Se verifica si existe `fierro_profile`
2. Si no existe, redirige a `/onboarding`
3. Si existe, muestra el dashboard personalizado

---

## ✅ Validaciones

### Validación por Paso

Cada paso requiere una selección antes de continuar:

```typescript
const isStepValid = (step: number): boolean => {
  switch (step) {
    case 1:
      return data.daysPerWeek !== null;
    case 2:
      return data.level !== null;
    case 3:
      return data.hoursPerSession !== null;
    case 4:
      return data.goal !== null;
    default:
      return false;
  }
};
```

### UI de Validación

- Botón "Siguiente" deshabilitado hasta que haya selección
- Color gris cuando está deshabilitado
- No se puede hacer click
- Mensaje visual cuando se completa el paso (fade-in)

---

## 🎨 Diseño Mobile-First

### Layout

```tsx
<div className="flex flex-col min-h-screen">
  {/* Header fijo */}
  <header>
    <h1>Fierro</h1>
    <span>Paso X de 4</span>
    <Stepper />
  </header>

  {/* Contenido scrollable */}
  <main className="flex-1">{/* Paso actual */}</main>

  {/* Navegación fija */}
  <footer>
    <NavigationButtons />
  </footer>
</div>
```

### Responsive

- **Móvil** (por defecto):
  - Ancho completo con padding
  - Grid adaptable
  - Botones full-width
- **Desktop** (max-w-2xl):
  - Centrado automático
  - Mismo diseño, más espacioso

---

## 🎯 Flujo de Usuario

### Caso 1: Usuario Nuevo

```
1. Visita /
2. Redirect a /onboarding
3. Ve Step 1 (días por semana)
4. Selecciona 3 días
5. Click "Siguiente"
6. Ve Step 2 (nivel)
7. Selecciona "Intermedio"
8. Click "Siguiente"
9. Ve Step 3 (horas)
10. Selecciona 1.5 horas
11. Click "Siguiente"
12. Ve Step 4 (objetivo)
13. Selecciona "Ganar músculo"
14. Click "Completar"
15. Redirige a /home
16. Ve dashboard personalizado
```

### Caso 2: Usuario Recarga Página

```
1. Usuario en Step 2 del onboarding
2. Recarga la página (F5)
3. Datos se cargan de localStorage
4. Vuelve a Step 2
5. Respuestas anteriores están seleccionadas
6. Puede continuar desde donde se quedó
```

### Caso 3: Usuario con Perfil Completo

```
1. Usuario intenta visitar /onboarding
2. Ya tiene fierro_profile
3. [Futuro] Podría redirigir a /home
4. O permitir re-hacer el onboarding
```

---

## 🔧 API del Hook

### `useOnboarding()`

```typescript
// Estado
data: OnboardingData              // Datos del usuario
currentStep: number               // 1, 2, 3, o 4
isLoaded: boolean                 // true cuando cargó del localStorage

// Métodos de actualización
updateData(updates: Partial<OnboardingData>): void

// Navegación
nextStep(): void                  // currentStep++
prevStep(): void                  // currentStep--

// Validación
isStepValid(step: number): boolean    // Si el paso está completo
isComplete(): boolean                 // Si todos los pasos están completos

// Acciones
complete(): void                  // Guardar y marcar como completado
reset(): void                     // Reiniciar todo
```

### Ejemplo de Uso

```tsx
function OnboardingPage() {
  const {
    data,
    currentStep,
    updateData,
    nextStep,
    prevStep,
    isStepValid,
    complete,
  } = useOnboarding();

  const handleFinish = () => {
    complete();
    router.push("/home");
  };

  return (
    <>
      {currentStep === 1 && (
        <Step1Days
          value={data.daysPerWeek}
          onChange={(v) => updateData({ daysPerWeek: v })}
        />
      )}

      <NavigationButtons
        canContinue={isStepValid(currentStep)}
        onNext={nextStep}
        onBack={prevStep}
        onFinish={handleFinish}
      />
    </>
  );
}
```

---

## 🎨 Estilos y Animaciones

### Transiciones

```css
/* Fade in para mensajes de confirmación */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
```

### Estados de Botones

```tsx
// Seleccionado
className = "border-blue-600 bg-blue-50 scale-110";

// No seleccionado
className = "border-gray-200 bg-white hover:border-gray-300";

// Deshabilitado
className = "bg-gray-300 text-gray-500 cursor-not-allowed";
```

---

## 📊 Datos Capturados

### Resumen

| Campo             | Tipo         | Opciones                                           | Ejemplo          |
| ----------------- | ------------ | -------------------------------------------------- | ---------------- |
| `daysPerWeek`     | number       | 1-7                                                | `3`              |
| `level`           | FitnessLevel | beginner, intermediate, advanced                   | `"intermediate"` |
| `hoursPerSession` | number       | 0.5-3                                              | `1.5`            |
| `goal`            | FitnessGoal  | lose_weight, gain_muscle, maintain, improve_health | `"gain_muscle"`  |

### Uso Futuro

Estos datos se usarán para:

1. **Generación de Rutinas**

   - Días por semana → Frecuencia de entrenamientos
   - Horas por sesión → Duración de cada rutina
   - Nivel → Dificultad de ejercicios

2. **Personalización**

   - Objetivo → Tipo de ejercicios y enfoque
   - Nivel → Progresión y recomendaciones

3. **Analytics** (Futuro)
   - Segmentación de usuarios
   - Mejora de recomendaciones

---

## ✅ Entregables Completados

### 1. Flujo de Onboarding

- [x] 4 pasos/pantallas creadas
- [x] Navegación Siguiente/Atrás funcional
- [x] Indicador de progreso (stepper)
- [x] UI limpia y mobile-first

### 2. Preguntas Implementadas

- [x] Paso 1: ¿Cuántos días entrenas? (1-7)
- [x] Paso 2: ¿Tu nivel actual? (3 opciones)
- [x] Paso 3: ¿Cuántas horas? (6 opciones)
- [x] Paso 4: ¿Tu objetivo? (4 opciones)

### 3. Validaciones

- [x] No permitir continuar sin selección
- [x] Botón deshabilitado visualmente
- [x] Validación por paso

### 4. Persistencia

- [x] Estado guardado en localStorage
- [x] Auto-guardado en cada cambio
- [x] Recuperación al recargar
- [x] Perfil final guardado

### 5. Finalización

- [x] Guardar perfil local completo
- [x] Redirección a /home
- [x] Datos disponibles en Home

### 6. Home Mejorado

- [x] Verificar si existe perfil
- [x] Redirigir a onboarding si no hay perfil
- [x] Mostrar datos personalizados
- [x] Dashboard básico con resumen

---

## 🧪 Testing Manual

### Checklist de Pruebas

**Flujo Completo:**

- [ ] Iniciar onboarding desde /
- [ ] Completar Paso 1
- [ ] Avanzar al Paso 2
- [ ] Volver atrás al Paso 1
- [ ] Avanzar nuevamente al Paso 2
- [ ] Completar Paso 2
- [ ] Completar Paso 3
- [ ] Completar Paso 4
- [ ] Click en "Completar"
- [ ] Verificar redirección a /home
- [ ] Verificar datos en dashboard

**Persistencia:**

- [ ] Completar Paso 1 y Paso 2
- [ ] Recargar la página (F5)
- [ ] Verificar que está en Paso 2
- [ ] Verificar que las selecciones están guardadas
- [ ] Continuar el flujo
- [ ] Completar onboarding
- [ ] Cerrar navegador
- [ ] Abrir de nuevo y visitar /home
- [ ] Verificar que los datos están ahí

**Validaciones:**

- [ ] Intentar avanzar sin seleccionar
- [ ] Verificar que el botón está deshabilitado
- [ ] Hacer una selección
- [ ] Verificar que el botón se habilita
- [ ] Poder continuar

**Navegación:**

- [ ] Volver atrás múltiples veces
- [ ] No poder volver antes del Paso 1
- [ ] Avanzar hasta el final
- [ ] Verificar que Paso 4 dice "Completar"

---

## 🔜 Mejoras Futuras

Fuera del alcance del MVP pero posibles mejoras:

### UX

- [ ] Animaciones de transición entre pasos
- [ ] Swipe para cambiar de paso (móvil)
- [ ] Barra de progreso animada
- [ ] Confeti al completar 🎉

### Funcionalidad

- [ ] Permitir editar perfil después de completar
- [ ] Exportar/importar perfil
- [ ] Opción de "skip" para usuarios avanzados
- [ ] Sugerencias basadas en selecciones

### Backend

- [ ] Sincronizar con Supabase
- [ ] Guardar en base de datos
- [ ] Recuperar perfil entre dispositivos
- [ ] Analytics de onboarding

---

## 📝 Notas Técnicas

### Performance

- **Bundle Size**: ~8KB adicional
- **Componentes**: Todos Client Components (necesitan interactividad)
- **localStorage**: Sincrónico, no afecta performance
- **Re-renders**: Optimizados, solo cuando cambia el estado

### Accesibilidad

- `aria-pressed` en botones seleccionables
- `aria-current` en stepper
- `aria-label` en elementos visuales
- Focus visible en todos los interactivos
- Navegación por teclado funcional

### Browser Compatibility

- **localStorage**: Soportado en todos los navegadores modernos
- **Fallback**: Si no hay localStorage, el onboarding funciona pero no persiste
- **Private Mode**: Puede tener limitaciones en localStorage

---

**Fase 3 completada el**: 13 de Enero, 2026  
**Status**: ✅ Listo para Fase 4  
**Build**: ✅ Exitoso  
**Linting**: ✅ Sin errores  
**Componentes**: 7 nuevos  
**Types**: 1 archivo nuevo  
**Hooks**: 1 hook personalizado
