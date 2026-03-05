# Plan de Implementación: Gestor de Tareas ICE

**Nivel:** Junior  
**Duración estimada:** 17 horas (1 semana part-time)  
**Enfoque:** Incremental, sin cambios de contexto entre tareas

---

## Visión General

Este plan organiza la implementación en **8 tareas secuenciales**. Cada tarea genera código funcional sin dependencias circulares. Al finalizar cada una, la app progresa de "no compilable" a "funcional en producción".

---

## Tarea 1: Setup Inicial y Estructura Base ⚙️

**Duración:** 1–2 horas  
**Dependencia:** Ninguna

### Descripción

Crear el proyecto Vite + React + TypeScript con dependencias exactas, estructura de carpetas e integración de Material-UI. Configurar linting (ESLint), code formatting (Prettier) y asegurar compilación limpia.

### Archivos a crear

```
gestor-tareas-ice/
├── .gitignore
├── .eslintrc.json
├── .prettierrc.json
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── .env.example
└── src/
    ├── main.tsx
    ├── index.css          # Global + variables CSS
    ├── App.tsx            # Vacío por ahora
    ├── components/        # Carpeta plana
    ├── hooks/
    ├── services/
    ├── utils/
    ├── types/
    └── constants/
```

### Dependencias exactas

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@mui/material": "^5.14.0",
    "@mui/icons-material": "^5.14.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/node": "^20.10.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "eslint": "^8.55.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "@typescript-eslint/eslint-plugin": "^6.13.0",
    "@typescript-eslint/parser": "^6.13.0",
    "prettier": "^3.1.0"
  }
}
```

### Archivos de configuración a crear

#### `.eslintrc.json`

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": { "jsx": true },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react", "react-hooks", "@typescript-eslint"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  },
  "settings": {
    "react": { "version": "detect" }
  }
}
```

#### `.prettierrc.json`

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

#### `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

#### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "strict": true,
    "resolveJsonModule": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### `package.json` scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write src"
  }
}
```

### Criterios de aceptación

- ✅ `npm run dev` compila sin errores
- ✅ `npm run build` genera output optimizado
- ✅ Estructura de carpetas existe y está lista
- ✅ `tsconfig.json` con `strict: true`
- ✅ `.env.example` con placeholder para API key de Gemini
- ✅ Archivo CSS global con variables (colores Material Design)
- ✅ `App.tsx` importable pero vacío
- ✅ ESLint configurado: `npm run lint` pasa sin errores
- ✅ Prettier configurado: `npm run format` formatea código sin cambios lógicos
- ✅ Material-UI instalado y usable (importable desde `@mui/material`)
- ✅ No hay warnings en `npm install`

### Referencias

- [MVP: Stack Tecnológico](../MVP_Gestor_Tareas_Inteligente_ICE.md#2-stack-tecnológico-100-gratuito)
- [Arquitectura: Estructura de carpetas](./ARQUITECTURA_REACT_GESTOR_ICE.md#1-estructura-de-carpetas)

---

## Tarea 2: Tipos, Constantes y Validación ✒️

**Duración:** 1–1.5 horas  
**Dependencia:** Tarea 1 (setup compilable)

### Descripción

Definir todos los tipos TypeScript y constantes que se usarán en toda la aplicación. Esto permite a las otras tareas tener contrato claro desde el inicio.

### Archivos a crear

#### `src/types/index.ts`

```typescript
export type TaskStatus = 'pending' | 'in_progress' | 'done'

export interface Task {
  id: string
  description: string       // max 200 chars
  impact: number            // 1-10
  confidence: number        // 1-10
  ease: number              // 1-10
  status: TaskStatus
  explanation: string       // generated by AI or manual
}

export interface GeminiAnalysis {
  impact: number
  confidence: number
  ease: number
  explanation: string
}

export interface ModalState {
  open: boolean
  selectedTask: Task | null
}
```

#### `src/constants/index.ts`

```typescript
export const STORAGE_KEY = 'gestor-tareas-ice-tasks'
export const MAX_DESCRIPTION_LENGTH = 200
export const ICE_MIN = 1
export const ICE_MAX = 10
export const SCORE_MIN = 0
export const SCORE_MAX = 100
export const SCORE_COLORS = {
  high: '#d32f2f',    // red
  mid: '#f57c00',     // orange
  low: '#388e3c'      // green
}
export const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
export const GEMINI_TIMEOUT_MS = 4000
```

### Criterios de aceptación

- ✅ Archivo `src/types/index.ts` exporta `Task`, `TaskStatus`, `GeminiAnalysis`, `ModalState`
- ✅ Archivo `src/constants/index.ts` exporta constantes nombradas
- ✅ Todos compensadores con `readonly` donde corresponda
- ✅ TypeScript compila sin errores (`npm run build`)

### Referencias

- [Arquitectura: Tipos](./ARQUITECTURA_REACT_GESTOR_ICE.md#34-tipos-typesindexts)
- [MVP: Estructura de Datos](../MVP_Gestor_Tareas_Inteligente_ICE.md#5-estructura-de-datos)

---

## Tarea 3: Utilidades y Servicio Gemini 🛠️

**Duración:** 2–2.5 horas  
**Dependencia:** Tarea 2 (tipos disponibles)

### Descripción

Implementar las funciones puras de utilidad (cálculo de score ICE, validaciones) y el servicio que llama a la API de Gemini. **Ambos son agnósticos a React** — se prueban directamente con Node.

### Archivos a crear

#### `src/utils/ice.ts`

```typescript
// calcularScore(impact: number, confidence: number, ease: number): number
// - sustituir ease=0 con 1 para evitar división por cero
// - fórmula: (impact * confidence * 10) / ease redondeado a entero
// - retornar rango [0, 100]

// validarTarea(description: string, impact: number, confidence: number, ease: number): { valid: boolean; errors: string[] }
// - description entre 1 y MAX_DESCRIPTION_LENGTH
// - impact, confidence, ease entre ICE_MIN y ICE_MAX
// - retornar objeto con validez y lista de errores
```

#### `src/services/gemini.ts`

```typescript
// analyzeTask(description: string): Promise<GeminiAnalysis>
// - hacer fetch POST a GEMINI_API_ENDPOINT
// - construir prompt: "Analiza esta tarea y devuelve en JSON: { impact, confidence, ease, explanation }"
// - usar API key de process.env.VITE_GEMINI_API_KEY
// - timeout GEMINI_TIMEOUT_MS
// - retornar GeminiAnalysis parseado
// - manejo de errores: lanzar Error con mensaje descriptivo
```

### Criterios de aceptación

- ✅ `calcularScore(9, 8, 4)` retorna `180` (redondeado)
- ✅ `calcularScore(1, 1, 0)` retorna `10` (ease reemplazado por 1)
- ✅ `validarTarea()` retorna `{ valid: true, errors: [] }` con datos válidos
- ✅ `validarTarea()` retorna errores concretos para datos inválidos
- ✅ `analyzeTask()` puede ser testeado con API key mock (en .env.local)
- ✅ Ambos archivos son pure functions testeables sin React

### Prueba manual

```bash
# En src/ o en test file
import { calcularScore, validarTarea } from './utils/ice'
import { analyzeTask } from './services/gemini'

console.log(calcularScore(9, 8, 4))  // 180
console.log(validarTarea("Test", 9, 8, 4))  // { valid: true, errors: [] }
await analyzeTask("Rewrite the entire backend in Rust")  // devuelve GeminiAnalysis
```

### Referencias

- [Arquitectura: utils/ice.ts](./ARQUITECTURA_REACT_GESTOR_ICE.md#estructura-de-carpetas)
- [Arquitectura: services/gemini.ts](./ARQUITECTURA_REACT_GESTOR_ICE.md#servicios)
- [MVP: Cálculo Score ICE](../MVP_Gestor_Tareas_Inteligente_ICE.md#9-cálculo-simplificado-del-score-ice)
- [Design: Flujo crear tareas](../design/flujo-crear-tareas.md)

---

## Tarea 4: Hooks de Estado 🪝

**Duración:** 2–2.5 horas  
**Dependencia:** Tarea 2 (tipos)

### Descripción

Implementar los tres custom hooks que encapsulan la lógica de estado. **Estos hooks NO dependen entre sí** — pueden ser testeados aisladamente. Al final de esta tarea, el estado es gestionable desde React pero sin UI.

### Archivos a crear

#### `src/hooks/useLocalStorage.ts`

```typescript
// Hook: useLocalStorage<T>(key: string, initialValue: T): [value: T, setValue: (v: T) => void]
// - leer del localStorage en mount
// - escribir en localStorage en cada setValue
// - si falla parse, usar initialValue
// - no expone removeItem; solo get/set
```

#### `src/hooks/useTareas.ts`

```typescript
// Hook: useTareas(): {
//   tasks: Task[]
//   addTask(task: Omit<Task, 'id'>): void
//   updateTask(id: string, changes: Partial<Omit<Task, 'id'>>): void
//   deleteTask(id: string): void
// }
// - usar useLocalStorage internamente
// - generate id con crypto.randomUUID()
// - ordenar tasks por score descendente en cada cambio
// - NO exponer loading/error (son síncronos)
```

#### `src/hooks/useModal.ts`

```typescript
// Hook: useModal(): {
//   open: boolean
//   selectedTask: Task | null
//   openModal(task: Task): void
//   closeModal(): void
// }
// - estado UI puro, completamente separado de useTareas
// - simplemente useState({ open, selectedTask })
```

### Criterios de aceptación

- ✅ Tres hooks compilables sin errores
- ✅ Los hooks usan sin librería de estado externa (solo React hooks)
- ✅ `useTareas` integra `useLocalStorage` internamente
- ✅ Tasks ordenadas por score después de operaciones CRUD
- ✅ El modal state es independiente del dominio (tasks)
- ✅ Exportables desde `src/hooks/index.ts`

### Prueba manual

```tsx
// En un componente de test
const { tasks, addTask } = useTareas()
const { open, openModal } = useModal()

addTask({ description: "Test", impact: 8, ... })
openModal(tasks[0])
// Verificar estados en React DevTools
```

### Referencias

- [Arquitectura: 3.2 Los tres hooks](./ARQUITECTURA_REACT_GESTOR_ICE.md#32-los-tres-hooks)
- [Arquitectura: 3.1 Dónde vive el estado](./ARQUITECTURA_REACT_GESTOR_ICE.md#31-dónde-vive-el-estado)

---

## Tarea 5: Componentes Presentacionales 💻

**Duración:** 3–3.5 horas  
**Dependencia:** Tarea 2 (tipos), Tarea 3 (utils con `calcularScore`)

### Descripción

Crear los 5 componentes React 100% presentacionales (solo props, sin hooks de lógica). Cada componente renderiza UI Material Design basado en wireframes de `design/pantallas-app.png`.

### Archivos a crear

#### `src/components/Navbar.tsx`

```typescript
// interface Props {
//   totalTasks: number
// }
// Render: AppBar con título "Gestor Tareas ICE" + badge contador
```

#### `src/components/TaskList.tsx`

```typescript
// interface Props {
//   tasks: Task[]
//   onAction: (e: ActionEvent) => void
// }
// Render: lista de TaskCard O estado vacío si tasks=[]
```

#### `src/components/TaskCard.tsx`

```typescript
// interface Props {
//   task: Task
//   onAction: (e: ActionEvent) => void
// }
// ActionEvent = { type: 'edit' | 'delete' | 'changeStatus'; taskId: string }
// Render: card con score (color), descripción, acciones
// Score calculado en render con calcularScore(), no recibido como prop
```

#### `src/components/FormCrearTarea.tsx`

```typescript
// interface Props {
//   onAddTask: (task: Omit<Task, 'id'>) => void
// }
// State local: { description, impact, confidence, ease, explanation, loading }
// Event "Analizar": llama a gemini.analyzeTask() — maneja loading/error local
// Event "Guardar": valida + llama onAddTask
```

#### `src/components/PriorityModal.tsx`

```typescript
// interface Props {
//   task: Task | null       // null si cerrado
//   open: boolean
//   onClose: () => void
//   onSave: (changes: Partial<Omit<Task, 'id'>>) => void
// }
// State local: { tempImpact, tempConfidence, tempEase }
// Score recalculado en vivo conforme se editan I,C,E
```

### Criterios de aceptación

- ✅ Todos los componentes renderizados sin errores
- ✅ Cero lógica de estado (solo presentacionales)
- ✅ Props tipadas con TypeScript
- ✅ Event callbacks en lugar de manejo directo
- ✅ Componentes construidos con Material-UI (AppBar, TextField, Button, Dialog, Card, etc.)
- ✅ Responsive (mobile-first)
- ✅ Exportables desde `src/components/index.ts`

### Referencia visual

- [design/pantallas-app.png](../design/pantallas-app.png)
- [design/wireframe-pantallas.svg](../design/wireframe-pantallas.svg)

### References

- [Arquitectura: 2.2 Responsabilidades por componente](./ARQUITECTURA_REACT_GESTOR_ICE.md#22-responsabilidades-por-componente)

---

## Tarea 6: Componente App Orquestador 🎼

**Duración:** 1.5–2 horas  
**Dependencia:** Tarea 4 (hooks), Tarea 5 (componentes)

### Descripción

Crear `App.tsx` que:
1. Llama a `useTareas` y `useModal`
2. Renderiza Navbar + FormCrearTarea + TaskList + PriorityModal
3. Pasa props y callbacks correctos
4. **No tiene lógica extra** — orquesta nada más

### Archivo a crear

#### `src/App.tsx`

```typescript
// function App() {
//   const { tasks, addTask, updateTask, deleteTask } = useTareas()
//   const { open, selectedTask, openModal, closeModal } = useModal()
//   
//   return (
//     <div className="app">
//       <Navbar totalTasks={tasks.length} />
//       <FormCrearTarea onAddTask={addTask} />
//       <TaskList 
//         tasks={tasks.sort((a, b) => calcularScore(b.impact, b.confidence, b.ease) - ...)}
//         onAction={handleAction}  // un solo callback con event delegation
//       />
//       <PriorityModal 
//         task={selectedTask}
//         open={open}
//         onClose={closeModal}
//         onSave={(changes) => { updateTask(selectedTask.id, changes); closeModal() }}
//       />
//     </div>
//   )
// }
```

### Criterios de aceptación

- ✅ App compila y renderiza sin errores
- ✅ Navbar muestra contador correcto
- ✅ FormCrearTarea integrada (botón "Guardar" agrega tarea)
- ✅ TaskList muestra tareas ordenadas por score
- ✅ Modal se abre al clic en "Editar", se cierra al "Guardar" o "Cancelar"
- ✅ Las acciones (agregar, editar, eliminar, cambiar estado) funcionan end-to-end
- ✅ Persistencia en localStorage se actualiza automáticamente

### Referencias

- [Arquitectura: 2.1 Árbol de componentes](./ARQUITECTURA_REACT_GESTOR_ICE.md#21-árbol-de-componentes)
- [Design: diagrama-navegacion.png](../design/diagrama-navegacion.png)

---

## Tarea 7: Validación, Testing Manual y Polish 🧪

**Duración:** 2–2.5 horas  
**Dependencia:** Tarea 6 (app funcional)

### Descripción

Validar que toda la aplicación funciona según los criterios del MVP, hacer testing manual de flujos happy path, y refinar UI/UX.

### Checklist de Testing

**Flujo crear tarea (manual ICE):**
- [ ] Escribir descripción en formulario
- [ ] Rellenar Impacto, Confianza, Facilidad manualmente
- [ ] Score recalcula en vivo
- [ ] Clic "Guardar" agrega tarea a la lista
- [ ] Formulario limpia
- [ ] Tarea persiste en localStorage

**Flujo crear tarea (con IA):**
- [ ] Escribir descripción
- [ ] Clic "Analizar"
- [ ] Mostrar loading 2-3 segundos
- [ ] Fields I, C, E autocompletan
- [ ] Explicación se rellena
- [ ] Score recalcula
- [ ] Clic "Guardar" agrega tarea

**Flujo editar tarea:**
- [ ] Clic "Editar" en TaskCard
- [ ] Modal abre con valores actuales
- [ ] Cambiar I, C, E
- [ ] Score recalcula en modal
- [ ] Clic "Guardar" cierra modal
- [ ] TaskList actualiza con nuevos valores

**Validaciones:**
- [ ] Descripción vacía → error
- [ ] Descripción >200 chars → error o trunca con aviso
- [ ] I, C, E fuera de rango 1-10 → error
- [ ] Eliminar tarea → se quita de lista
- [ ] Cambiar estado tarea → se refleja en UI

**Persistencia:**
- [ ] Refresh página → tareas persisten
- [ ] DevTools → localStorage contiene las tareas

### Refinamientos de UI

- [ ] Colores de score (rojo/naranja/verde) aplicados correctamente
- [ ] Responsivo: funciona en mobile, tablet, desktop
- [ ] Tipografía y espaciado alineado con Material Design
- [ ] Botones hover estados
- [ ] Transiciones suaves (fade, slide)

### Criterios de aceptación

- ✅ Todos los tests manuales pasen
- ✅ No hay console errors o warnings
- ✅ Loading de IA se muestra mientras espera respuesta Gemini
- ✅ Errores de API de Gemini se muestran al usuario
- ✅ Responsivo en todas las pantallas

### Referencias

- [MVP: Criterios de Aceptación](../MVP_Gestor_Tareas_Inteligente_ICE.md#8-criterios-de-aceptación)
- [Design: flujo-crear-tareas.md](../design/flujo-crear-tareas.md)

---

## Tarea 8: Deploy y Documentación para Producción 🚀

**Duración:** 1–1.5 horas  
**Dependencia:** Tarea 7 (app validada)

### Descripción

Preparar la aplicación para producción: variables de entorno, build optimizado, deploy a Vercel/Netlify, y documentación final.

### Archivos a actualizar/crear

#### `.env.local` (local, no commitear)

```env
VITE_GEMINI_API_KEY=tu_api_key_aquí
```

#### `.env.example` (commitear)

```env
VITE_GEMINI_API_KEY=
```

#### `package.json` scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

#### `vite.config.ts`

```typescript
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
//
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'dist',
//     sourcemap: false  // no sourcemaps en prod
//   }
// })
```

### Pasos de Deploy (Vercel)

1. Pushear código a GitHub/GitLab
2. Conectar repositorio a Vercel
3. Configurar variable `VITE_GEMINI_API_KEY` en Vercel Dashboard
4. Deploy automático en cada push a `main`

### Criterios de aceptación

- ✅ `npm run build` genera `/dist` sin errores
- ✅ Build size <300KB (sin gzip)
- ✅ Aplicación deployada en Vercel con dominio público
- ✅ Variables de entorno configuradas en plataforma de deploy
- ✅ Funciona end-to-end en producción
- ✅ README.md con instrucciones de setup y deploy

### Archivo final: README.md

```markdown
# Gestor de Tareas ICE

Aplicación web para gestionar tareas con priorización automática usando IA.

## Setup Local

\`\`\`bash
npm install
echo "VITE_GEMINI_API_KEY=tu_key" > .env.local
npm run dev
\`\`\`

## Deploy

Conectar repo a Vercel, configurar env vars, deployment automático.

## Documentación

- [Arquitectura](./docs/ARQUITECTURA_REACT_GESTOR_ICE.md)
- [MVP](./MVP_Gestor_Tareas_Inteligente_ICE.md)
- [Diagramas](./design/)
```

### Referencias

- [MVP: Deploy](../MVP_Gestor_Tareas_Inteligente_ICE.md#deploy-gratuito)

---

## Flujo de Implementación Recomendado

```
Tarea 1 (Setup)
    ↓
Tarea 2 (Tipos) ←────┐
    ↓                 │
Tarea 3 (Utils) ←────┤ Ningún acoplamiento
    ↓                 │ entre estas 3
Tarea 4 (Hooks) ←────┘
    ↓
Tarea 5 (Componentes)
    ↓
Tarea 6 (App — ahora sí se integra todo)
    ↓
Tarea 7 (QA)
    ↓
Tarea 8 (Deploy)
```

**Notas:**
- Las tareas 2, 3, 4 pueden hacerse en paralelo — no se bloquean entre sí.
- Tarea 5 puede empezar incluso mientras se finalizas tareas 3-4 (usar mocks).
- Tarea 6 integra todo, así que ahí se descubre la mayoría de bugs de integración.
- Tarea 7 es el último checkpoint antes de producción.

---

## Métricas de Éxito

| Métrica | Objetivo |
|---------|----------|
| Tamaño de bundle | <300 KB gzipped |
| Latencia inicial | <2 segundos |
| Tiempo request IA | 2-4 segundos (normal para Gemini) |
| Test pass rate | 100% de criterios de aceptación |
| Cobertura de tipos | 100% (strict: true en tsconfig) |
| Accesibilidad | WCAG 2.1 AA |

---

## Referencias Cruzadas

- **Flujos:** [design/flujo-crear-tareas.md](../design/flujo-crear-tareas.md), [design/flujo-navegacion.md](../design/flujo-navegacion.md)
- **Arquitectura:** [ARQUITECTURA_REACT_GESTOR_ICE.md](./ARQUITECTURA_REACT_GESTOR_ICE.md)
- **MVP:** [MVP_Gestor_Tareas_Inteligente_ICE.md](../MVP_Gestor_Tareas_Inteligente_ICE.md)
- **Wireframes:** [design/pantallas-app.png](../design/pantallas-app.png), [design/diagrama-navegacion.png](../design/diagrama-navegacion.png)
