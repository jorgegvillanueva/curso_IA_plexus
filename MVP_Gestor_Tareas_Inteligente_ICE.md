# MVP: Gestor de Tareas Inteligente con Modelo ICE
## Documento de Alcance Funcional

**Versión:** 2.0 (Arquitectura Optimizada)  
**Fecha:** 3 de Marzo de 2026  
**Audiencia:** Desarrolladores principiantes aprendiendo React + IA  
**Nivel:** Junior (requiere conocimientos básicos de JavaScript y React)

---

## 📑 Tabla de Contenidos

**Sección 1: Fundamentos**
- [1. Visión General](#1-visión-general)
- [1.1 Decisiones de Arquitectura](#11-decisiones-de-arquitectura-justificación)
- [2. Stack Tecnológico](#2-stack-tecnológico-100-gratuito)
- [3. Alcance Funcional del MVP](#3-alcance-funcional-del-mvp)
- [4. Flujo de Usuario](#4-flujo-de-usuario-happy-path)

**Sección 2: Especificación Técnica**
- [5. Estructura de Datos](#5-estructura-de-datos)
- [6. Componentes React](#6-componentes-react-simplificados)
- [7. Integración con API IA](#7-integración-con-api-ia-gratuita-google-gemini)
- [8. Criterios de Aceptación](#8-criterios-de-aceptación)
- [9. Cálculo Score ICE](#9-cálculo-simplificado-del-score-ice)
- [10. Arquitectura de Carpetas](#10-arquitectura-de-carpetas)

**Sección 3: Implementación**
- [11. Dependencias Exactas](#11-dependencias-exactas)
- [12. Guía de Desarrollo](#12-guía-de-desarrollo-para-principiantes)
- [13. Casos de Uso Reales](#13-casos-de-uso-reales)
- [14. Limitaciones Conocidas](#14-limitaciones-conocidas-mvp)
- [15. Testing Manual](#15-testing-manual-paso-a-paso)

**Sección 4: Producción**
- [16. Métricas de Éxito](#16-métricas-de-éxito-objetivas)
- [17. Roadmap Post-MVP](#17-roadmap-post-mvp)
- [18. Recursos](#18-recursos-para-principiantes)
- [19. FAQ Completo](#19-faq-completo)
- [20. Conclusión](#20-conclusión)

---

## 🚀 Resumen Ejecutivo (TL;DR)

**¿Qué es?** Un gestor de tareas que usa IA (Google Gemini) para calcular automáticamente la prioridad usando el modelo ICE.

**¿Para quién?** Desarrolladores aprendiendo React que quieren un proyecto de portafolio con IA real.

**Score ICE:** `(Impact × Confidence × 10) / Ease` → Resultado 0-100 sin decimales

**Stack:** React + Vite + TailwindCSS + Gemini API + localStorage

**Costo:** $0.00 (100% gratuito, sin tarjeta de crédito)

**Tiempo desarrollo:** 17 horas (1 semana part-time)

**Dificultad:** Junior (requiere conocer: React básico, async/await, hooks)

**Features principales:**
- ✅ Crear tarea → IA analiza → Score automático
- ✅ 3 estados: Esperando / En curso / Hecha
- ✅ Editar valores ICE manualmente
- ✅ Ver explicación del razonamiento IA
- ✅ Persistencia automática (localStorage)
- ✅ Deploy en 5 minutos (Vercel/Netlify)

**Lo que NO tiene (intencional):**
- ❌ Backend
- ❌ Autenticación
- ❌ Filtros/búsqueda
- ❌ Colaboración multi-usuario
- ❌ Configuración compleja

**Diferenciador:** Único proyecto de to-do list con IA integrada y cálculo de prioridad automático.

---

## 1. Visión General

Un **Gestor de Tareas Inteligente minimalista** que ayuda a priorizar usando el modelo ICE:
- ✍️ Escribe una tarea en lenguaje natural (máx 200 caracteres)
- 🤖 **IA analiza y calcula Score ICE (0-100)** usando Google Gemini
- 📊 Ve tus tareas ordenadas automáticamente por prioridad
- 🎯 3 estados simples: Esperando → En curso → Hecha
- 💾 Todo persiste en tu navegador (localStorage)
- 🚀 **100% frontend - deploy gratis, sin configuración**

**🎓 Objetivo pedagógico:**  
Aprender React moderno + integración de IA real en un proyecto útil y simple.

**💡 Filosofía de diseño:**
- Zero configuración
- Máximo 3 clicks para cualquier acción  
- Sin curva de aprendizaje
- Completamente gratuito

---

## 1.1 Decisiones de Arquitectura (Justificación)

### **✅ Decisiones tomadas**

| Decisión | Alternativa rechazada | Razón |
|---|---|---|
| **Score 0-100** | Score decimal (ej: 9.33) | Más intuitivo para usuarios sin experiencia técnica |
| **Máx 200 chars** | Sin límite | Evitar tokens caros en API gratuita |
| **3 estados simples** | 5+ estados (backlog, blocked, etc) | Evitar parálisis por análisis |
| **Sin filtros** | Filtros avanzados | Reduce complejidad UI para principiantes |
| **localStorage** | Base de datos | Cero configuración, 100% privado |
| **Gemini API** | OpenAI / Claude | Única API IA gratuita sin tarjeta |
| **Sliders 1-10** | Input numérico | Más intuitivo visualmente |
| **Sin paginación** | Paginación 20/page | <50 tareas no lo necesita |
| **Un solo modal** | Múltiples ventanas | UX más simple |
| **Fetch nativo** | Axios | Una dependencia menos |

### **🎯 Principios aplicados**

1. **KISS (Keep It Simple):** Elegir siempre la solución más simple que funcione
2. **Zero-config:** Usuario no debe configurar nada para empezar
3. **Mobile-first:** Diseñar primero para móvil, escalar a desktop
4. **Offline-capable:** Funciones core trabajan sin internet (excepto IA)
5. **Privacy-first:** Datos nunca salen del navegador del usuario

### **🔒 Limitaciones aceptadas conscientemente**

```
✗ Sin sincronización multi-dispositivo
  → Razón: Requeriría backend (complejidad + costo)
  → Solución post-MVP: Vercel KV o Supabase

✗ Sin colaboración en tiempo real
  → Razón: Arquitectura single-user más simple
  → Solución post-MVP: WebSockets + compartir link

✗ Sin histórico de cambios
  → Razón: Complejidad innecesaria para MVP
  → Solución post-MVP: Event sourcing simple

✗ Máximo 200 caracteres por tarea  
  → Razón: Tokens API limitados (gratis)
  → Workaround: Dividir tarea grande en subtareas
```

### **📐 架构 simplificada (vs over-engineering)**

**❌ EVITAMOS:**
- Context API (useState + props es suficiente)
- Redux (overkill para este scope)
- React Router (SPA de una sola vista)
- TypeScript (añade complejidad para principiantes)
- Testing extensivo (aprendizaje > producción)
- Microservicios (una función hace todo back)

**✅ USAMOS:**
- Custom hook `useTareas` (encapsula toda la lógica)
- Props drilling (máximo 2 niveles)
- Componentes puros cuando posible
- localStorage directo (sin wrapper innecesario)

---

## 2. Stack Tecnológico (100% Gratuito)

```
📱 Frontend:
├── React 18.2          → Framework (hooks, componentes)
├── Vite 5.1            → Build tool ultra-rápido
├── TailwindCSS 3.4     → Estilos utility-first
├── Lucide React        → Iconos modernos SVG
└── Native Fetch API    → HTTP requests (sin axios)

🤖 IA/Backend:
├── Google Gemini API   → LLM gratuito (60 req/min)
└── localStorage        → Persistencia navegador

🚀 Deploy:
├── Vercel / Netlify    → Hosting gratuito
├── GitHub              → Versionado
└── Custom domain       → Opcional (gratis con Vercel)

🛠️ Dev Tools:
├── VS Code             → Editor recomendado
├── Chrome DevTools     → Debugging
├── Git                 → Control de versiones
└── ESLint (opcional)   → Code quality
```

**💰 Costo total:** $0.00

**⚡ Performance esperada:**
- Primera carga: <2s
- Respuesta IA: 2-4s  
- Score Lighthouse: 95+
- Bundle size: ~180KB

**🌐 Compatibilidad:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile responsive

---

## 3. Alcance Funcional del MVP

### ✅ **Funcionalidades Core (INCLUIDAS)**

| # | Funcionalidad | Descripción | Complejidad | Story Points |
|---|---|---|---|---|
| 1 | **Crear Tarea** | Formulario simple: descripción (máx 200 chars) | ⭐ | 2 |
| 2 | **Análisis IA (ICE)** | Enviar a Gemini → recibir I, C, E + explicación | ⭐⭐⭐ | 8 |
| 3 | **Cálculo Score ICE** | `(I × C × 10) / E` → resultado 0-100 | ⭐ | 1 |
| 4 | **Listar Tareas** | Mostrar ordenadas por score (descendente) | ⭐ | 2 |
| 5 | **Cambiar Estado** | Toggle: Esperando → En curso → Hecha | ⭐ | 2 |
| 6 | **Editar Valores ICE** | Ajustar manualmente I, C, E con sliders | ⭐ | 3 |
| 7 | **Ver Explicación** | Modal/expandible con razonamiento IA | ⭐ | 2 |
| 8 | **Eliminar Tarea** | Borrar sin confirmación (simple) | ⭐ | 1 |
| 9 | **Persistencia** | Auto-guardar en localStorage | ⭐ | 2 |

**Total Story Points: 23** (Sprint de 1 semana para principiantes)

**🎯 Principios de diseño:**
- Interfaz minimalista (3 clicks máximo)
- Sin configuraciones complejas
- Feedback visual inmediato
- Cero curva de aprendizaje

### ❌ **Funcionalidades EXCLUIDAS (MVP)**

- [ ] Filtros de búsqueda
- [ ] Paginación
- [ ] Tags/categorías
- [ ] Sistema de usuarios
- [ ] Backend/Base de datos
- [ ] Colaboración en equipo
- [ ] Exportación de datos
- [ ] Historial de cambios
- [ ] Modo offline avanzado
- [ ] Notificaciones
- [ ] Drag & drop para reordenar

---

## 4. Flujo de Usuario (Happy Path)

```
1. Usuario abre la app
   ↓
2. Ve input simple: "¿Qué tarea quieres priorizar?"
   ↓
3. Escribe: "Completar proyecto React" (máx 200 chars)
   ↓
4. Click "Analizar" → Loading 2-3 seg
   ↓
5. Tarea aparece instantáneamente con:
   • Score: 73/100 🟠
   • Estado: Esperando ⏸️
   • Botones: [Ver por qué] [Editar] [✓] [🗑️]
   ↓
6. Usuario hace click en "Ver por qué"
   → Modal muestra: "Esta tarea tiene impacto medio-alto..."
   ↓
7. Usuario cierra modal y cambia estado a "En curso" ▶️
   ↓
8. Más tarde, marca como "Hecha" ✅
   → Tarea baja visualmente en la lista
   ↓
9. Recarga página → Todas las tareas persisten
```

**⏱️ Tiempo promedio de uso:** 30 segundos por tarea

---

## 5. Estructura de Datos

### **Objeto Tarea**

```json
{
  "id": "task_1709472000000",
  "descripcion": "Completar proyecto React para curso",
  "impact": 8,
  "confidence": 7,
  "ease": 6,
  "scoreICE": 73,
  "estado": "esperando",
  "explanation": "Tarea crítica para completar educación, factible con recursos disponibles"
}
```

**📏 Restricciones:**
- `descripcion`: 1-200 caracteres
- `impact`, `confidence`, `ease`: 1-10
- `scoreICE`: 0-100 (sin decimales)
- `estado`: "esperando" | "en_curso" | "hecha"

### **Estado Global (Hook useTareas)**

```javascript
{
  tareas: [TareaObject],
  loading: boolean,
  error: string | null,
  agregarTarea: (tarea) => void,
  actualizarTarea: (id, cambios) => void,
  eliminarTarea: (id) => void
}
```

**💾 Persistencia automática:** Cada cambio guarda en `localStorage`

---

## 6. Componentes React (Simplificados)

```
App
├── Header (simple)
│   └── Título + contador de tareas
│
├── FormCrearTarea
│   ├── Input de texto (max 200 chars)
│   ├── Contador de caracteres
│   └── Botón "Analizar" (loading state)
│
├── ListaTareas
│   └── TareaCard × N
│       ├── Score grande (0-100)
│       ├── Descripción truncada
│       ├── Estado visual (⏸️/▶️/✅)
│       └── Acciones: [👁️] [✏️] [🗑️]
│
└── Modal (reutilizable)
    ├── ExplicacionModal
    │   ├── Título "¿Por qué este score?"
    │   ├── Texto de explicación IA
    │   └── Valores I:8, C:7, E:6
    │
    └── EditarModal
        ├── Sliders: Impact (1-10)
        ├── Sliders: Confidence (1-10)
        ├── Sliders: Ease (1-10)
        ├── Preview score en vivo
        └── Botón "Guardar"
```

**🎨 Reglas de diseño:**
- Máximo 1 modal abierto a la vez
- Colores según score: 🔴 80-100, 🟠 50-79, 🟡 20-49, ⚪ 0-19
- Estados con emojis universales
- Sin tooltips complejos

---

## 7. Integración con API IA Gratuita: Google Gemini

### **Setup Google Gemini**

```javascript
// .env
VITE_GEMINI_API_KEY=AIzaSy...

// Función en iaService.js
async function calcularICE(descripcion) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  // Prompt optimizado para respuestas consistentes
  const prompt = `Analiza esta tarea de productividad y asigna valores ICE.

Tarea: "${descripcion}"

CRITERIOS:
- Impact (1-10): ¿Qué tan importante es completarla?
- Confidence (1-10): ¿Qué tan seguro estás de poder hacerla?
- Ease (1-10): ¿Qué tan fácil es ejecutarla?

Responde SOLO con JSON (sin \`\`\` ni markdown):
{
  "impact": <número 1-10>,
  "confidence": <número 1-10>,
  "ease": <número 1-10>,
  "explanation": "Explicación breve y clara (máx 150 palabras)"
}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 200,
          },
        }),
      }
    );

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!content) throw new Error("No response from API");
    
    // Extraer JSON de forma robusta
    const jsonMatch = content.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) throw new Error("JSON no encontrado en respuesta");
    
    const result = JSON.parse(jsonMatch[0]);
    
    // Validación básica de estructura
    if (!result.impact || !result.confidence || !result.ease) {
      throw new Error('Respuesta incompleta de IA');
    }
    
    // Calcular score ICE: (I × C × 10) / E
    result.scoreICE = Math.round((result.impact * result.confidence * 10) / result.ease);
    
    return result;
  } catch (error) {
    console.error("Error al calcular ICE:", error);
    throw error;
  }
}
```

**Pasos de setup:**
1. Ir a [Google AI Studio](https://aistudio.google.com/apikey)
2. Crear API Key (gratis, sin tarjeta de crédito)
3. Copiar a `.env` como `VITE_GEMINI_API_KEY`
4. ✅ Listo - 60 solicitudes/minuto gratis

---

## 8. Criterios de Aceptación

### **User Story 1: Crear Tarea**

```gherkin
Given: Usuario ve el input vacío
When: Escribe "Estudiar React Hooks" (12 caracteres)
And: Click en "Analizar"
Then: Muestra loading spinner 2-3 segundos
And: Tarea aparece con score 67/100 🟠
And: Estado inicial: "Esperando" ⏸️
And: Se posiciona según score en la lista
```

### **User Story 2: Cambiar Estado**

```gherkin
Given: Tarea con estado "Esperando" ⏸️
When: Usuario hace click en el botón de estado
Then: Estado cambia a "En curso" ▶️
And: Tarea se reposiciona si cambia prioridad visual
When: Vuelve a hacer click
Then: Estado cambia a "Hecha" ✅
And: Tarea se mueve al final de la lista
```

### **User Story 3: Ver Explicación**

```gherkin
Given: Tarea con score 73/100
When: Usuario hace click en icono 👁️
Then: Modal se abre mostrando:
  - "Esta tarea tiene alto impacto (8/10)..."
  - Valores I:8, C:7, E:6
  - Botón "Entendido"
When: Click en "Entendido" o fuera del modal
Then: Modal se cierra
```

### **User Story 4: Editar Valores ICE**

```gherkin
Given: Tarea con I=8, C=7, E=6, Score=73
When: Usuario hace click en ✏️
Then: Modal con 3 sliders aparece
When: Ajusta Impact de 8 a 9
Then: Preview muestra nuevo score: 82/100 🔴
When: Click en "Guardar"
Then: Modal se cierra
And: Tarea se actualiza y reordena
And: Cambios persisten en localStorage
```


---

## 9. Cálculo Simplificado del Score ICE

### **Fórmula Optimizada**

```javascript
// Score de 0 a 100 (sin decimales)
function calcularScoreICE(impact, confidence, ease) {
  // (I × C × 10) / E → resultado entre 0-100
  return Math.round((impact * confidence * 10) / ease);
}
```

**📊 Interpretación de scores:**

| Rango | Color | Emoji | Prioridad | Acción recomendada |
|---|---|---|---|---|
| 80-100 | 🔴 Rojo | ⚡ | CRÍTICA | Hacer AHORA |
| 50-79 | 🟠 Naranja | 🔥 | ALTA | Hacer HOY |
| 20-49 | 🟡 Amarillo | ⭐ | MEDIA | Planificar |
| 0-19 | ⚪ Gris | 💤 | BAJA | Postponer |

**📐 Ejemplos reales:**

```
Tarea: "Corregir bug crítico en producción"
I:10, C:9, E:3 → Score = (10×9×10)/3 = 300/3 = 100 🔴

Tarea: "Leer documentación nueva librería"
I:5, C:8, E:7 → Score = (5×8×10)/7 = 400/7 = 57 🟠

Tarea: "Reorganizar carpeta de screenshots"
I:2, C:10, E:9 → Score = (2×10×10)/9 = 200/9 = 22 🟡
```

---

## 10. Arquitectura de Carpetas

```
gestor-tareas-ice/
├── src/
│   ├── components/
│   │   ├── Header.jsx              (30 líneas)
│   │   ├── FormCrearTarea.jsx      (60 líneas)
│   │   ├── TareaCard.jsx           (80 líneas)
│   │   ├── ListaTareas.jsx         (40 líneas)
│   │   ├── ExplicacionModal.jsx    (50 líneas)
│   │   └── EditarModal.jsx         (90 líneas)
│   │
│   ├── hooks/
│   │   └── useTareas.js            (100 líneas - todo incluido)
│   │
│   ├── services/
│   │   └── gemini.js               (80 líneas - API + validación)
│   │
│   ├── utils/
│   │   └── calcularICE.js          (10 líneas - fórmula pura)
│   │
│   ├── App.jsx                     (50 líneas)
│   ├── index.css                   (Tailwind base)
│   └── main.jsx                    (15 líneas)
│
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 11. Dependencias Exactas

```json
{
  "name": "gestor-tareas-ice",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.0",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.35",
    "autoprefixer": "^10.4.17"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**📦 Tamaño del build:**
- **Desarrollo:** ~2.5MB (includes HMR)
- **Producción:** ~180KB (minified + gzipped)
- **Lighthouse Score:** 95+ esperado

**🔧 Configuración mínima requerida:**

**`tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        priority: {
          critical: '#ef4444',  // Red
          high: '#f97316',      // Orange
          medium: '#eab308',    // Yellow
          low: '#94a3b8'        // Gray
        }
      }
    }
  },
  plugins: []
}
```

**`vite.config.js`:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Cambiar si deploy en subdirectorio
})
```

**`.env.example`:**
```bash
# Google Gemini API Key
# Obtener en: https://aistudio.google.com/apikey
VITE_GEMINI_API_KEY=tu_api_key_aqui
```

**⚠️ IMPORTANTE:** Nunca comitear `.env` - agregar a `.gitignore`

---

## 12. Guía de Desarrollo para Principiantes

### **Día 1: Setup + Estructura (2h)**

```bash
# 1. Crear proyecto
npm create vite@latest gestor-tareas-ice -- --template react
cd gestor-tareas-ice
npm install

# 2. Instalar Tailwind (estilos fáciles)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Instalar Lucide (iconos)
npm install lucide-react

# 4. Crear .env
echo "VITE_GEMINI_API_KEY=tu_key_aqui" > .env
```

**📝 Configurar Tailwind en `tailwind.config.js`:**
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

---

### **Día 2: Componentes Base (3h)**

✅ **Orden de implementación:**

1. `App.jsx` - estructura principal (30 min)
2. `Header.jsx` - título simple (15 min)
3. `FormCrearTarea.jsx` - input + botón (45 min)
4. `TareaCard.jsx` - mostrar tarea (1h)
5. `ListaTareas.jsx` - listar cards (30 min)

**🎯 Al final del día:** App funciona con datos dummy

---

### **Día 3: Lógica + Persistencia (3h)**

1. **Crear `hooks/useTareas.js`** (1.5h)
   - useState para tareas
   - localStorage auto-save
   - Funciones: agregar, editar, eliminar

2. **Crear `utils/calcularICE.js`** (15 min)
   - Fórmula: `(I × C × 10) / E`
   - Return sin decimales

3. **Conectar componentes con hook** (1h)
   - Pasar funciones a Form
   - Pasar tareas a Lista

**🎯 Al final:** CRUD completo funcionando

---

### **Día 4: IA + API Gemini (4h)**

1. **Obtener API Key** (15 min)
   - Ir a https://aistudio.google.com/apikey
   - Copiar a `.env`

2. **Crear `services/gemini.js`** (2h)
   - Función `analizarTarea(descripcion)`
   - Manejo de errores
   - Parsing JSON robusto

3. **Integrar en Form** (1h)
   - Loading state
   - Mostrar error
   - Crear tarea con resultado

4. **Testing** (45 min)
   - Probar con 5 tareas diferentes
   - Validar respuestas

**🎯 Al final:** IA funcionando end-to-end

---

### **Día 5: Modales + Estados (3h)**

1. **Modal de Explicación** (1h)
   - Mostrar texto IA
   - Valores I, C, E

2. **Modal de Edición** (1.5h)
   - 3 sliders (1-10)
   - Preview score en tiempo real
   - Guardar cambios

3. **Estados de tarea** (30 min)
   - Toggle: esperando → en curso → hecha
   - Iconos visuales

**🎯 Al final:** Todas las interacciones completas

---

### **Día 6: Polish + Deploy (2h)**

1. **Estilos finales** (1h)
   - Colores según score
   - Responsive básico
   - Animaciones sutiles

2. **Testing completo** (30 min)
   - Checklist funcionalidades
   - Diferentes navegadores

3. **Deploy a Vercel/Netlify** (30 min)
   - Push a GitHub
   - Conectar con Vercel
   - Configurar env variables

**🎯 MVP listo en producción**

---

**⏱️ Tiempo Total: 17 horas** (3 días intensivos o 1 semana relajada)

**💡 Tips para principiantes:**
- Usa `console.log()` generosamente
- Commit cada funcionalidad completa
- Si te atascas >30min, simplifica
- Prioriza que funcione > que sea perfecto

---

## 13. Casos de Uso Reales

### **Caso 1: Estudiante 📚**
```
Descripción: "Estudiar para examen de algoritmos"
IA responde:
  Impact: 9
  Confidence: 7
  Ease: 4
  
Score: (9×7×10)/4 = 630/4 = 158 → Max 100 🔴
Explicación: "Examen crítico para aprobar la materia. 
Tienes recursos pero requiere dedicación intensiva."
```

### **Caso 2: Freelancer 💼**
```
Descripción: "Responder correo cliente VIP"
IA responde:
  Impact: 8
  Confidence: 9
  Ease: 8
  
Score: (8×9×10)/8 = 720/8 = 90 🔴
Explicación: "Alto impacto en relación cliente, 
tarea rápida y tienes toda la info necesaria."
```

### **Caso 3: Desarrollador 💻**
```
Descripción: "Arreglar bug menor en footer"
IA responde:
  Impact: 3
  Confidence: 9
  Ease: 8
  
Score: (3×9×10)/8 = 270/8 = 34 🟡
Explicación: "Bug cosmético de baja prioridad.
Fácil de resolver pero no urgente."
```

### **Caso 4: Tareas del hogar 🏠**
```
Descripción: "Organizar fotos del teléfono"
IA responde:
  Impact: 2
  Confidence: 8
  Ease: 6
  
Score: (2×8×10)/6 = 160/6 = 27 🟡
Explicación: "Tarea de mantenimiento sin urgencia.
Llevaría tiempo pero es directa."
```

**🎯 Patrón observado:**
- Score >80: Hacer inmediatamente
- Score 50-79: Programar hoy
- Score 20-49: Planificar esta semana
- Score <20: Backlog o eliminar

---

## 14. Limitaciones Conocidas (MVP)

⚠️ **Limitaciones técnicas aceptadas:**

| Limitación | Razón | Workaround |
|---|---|---|
| **Máx 200 chars/tarea** | Evitar tokens API excesivos | Dividir tareas grandes |
| **Sin multi-dispositivo** | localStorage es por navegador | Exportar/importar futuro |
| **60 req/min Gemini** | API gratuita tiene límites | Retry automático 1x |
| **Sin modo offline** | IA requiere conexión | Mostrar error claro |
| **Sin búsqueda/filtros** | Mantener simplicidad | Scroll manual |
| **Sin undo** | Complejidad innecesaria | Cuidado al eliminar |
| **Sin colaboración** | Enfoque individual | Un usuario = un navegador |

**🎯 Decisiones de diseño intencionales:**
- ✅ Máximo 50 tareas recomendadas (performance)
- ✅ Sin paginación (scroll infinito simple)
- ✅ Sin autenticación (cero fricción)
- ✅ Sin backend (deploy gratis)
- ✅ Sin analytics (privacidad total)

---

## 15. Testing Manual Paso a Paso

### **Checklist completo para validar MVP:**

#### ✅ **1. Crear Primera Tarea**
- [ ] Abrir app en navegador
- [ ] Ver input vacío con placeholder
- [ ] Escribir: "Aprender React" (14 chars)
- [ ] Ver contador: 14/200
- [ ] Click en "Analizar"
- [ ] Ver spinner loading ~3 seg
- [ ] Tarea aparece con score entre 0-100
- [ ] Estado inicial: "Esperando" ⏸️
- [ ] Input se limpia automáticamente

#### ✅ **2. Ver Explicación**
- [ ] Click en icono 👁️ de la tarea
- [ ] Modal se abre
- [ ] Muestra texto explicativo
- [ ] Muestra I, C, E con números
- [ ] Click fuera del modal
- [ ] Modal se cierra

#### ✅ **3. Cambiar Estado**
- [ ] Click en badge de estado
- [ ] Cambia a "En curso" ▶️
- [ ] Click nuevamente
- [ ] Cambia a "Hecha" ✅
- [ ] Tarea baja en la lista

#### ✅ **4. Editar Valores**
- [ ] Click en ✏️
- [ ] Modal con 3 sliders aparece
- [ ] Mover slider Impact: 5 → 8
- [ ] Preview score se actualiza en vivo
- [ ] Click "Guardar"
- [ ] Score de tarea cambia
- [ ] Lista se reordena

#### ✅ **5. Crear Múltiples Tareas**
- [ ] Crear tarea con score alto (ej: 85)
- [ ] Crear tarea con score bajo (ej: 23)
- [ ] Verificar orden: mayor score arriba
- [ ] Estados diferentes son visibles

#### ✅ **6. Persistencia**
- [ ] Recargar página (F5)
- [ ] Todas las tareas persisten
- [ ] Scores correctos
- [ ] Estados mantienen

#### ✅ **7. Eliminar Tarea**
- [ ] Click en 🗑️
- [ ] Tarea desaparece inmediatamente
- [ ] Recargar → sigue eliminada

#### ✅ **8. Edge Cases**
- [ ] Escribir 200 caracteres exactos
- [ ] API falla → ver mensaje error
- [ ] Crear 10+ tareas → scroll funciona
- [ ] Cerrar/abrir navegador → datos OK

#### ✅ **9. Validación Visual**
- [ ] Scores >80 son rojos 🔴
- [ ] Scores 50-79 naranjas 🟠
- [ ] Scores <50 amarillos/grises
- [ ] Estados tienen emojis correctos
- [ ] Loading spinner es visible

#### ✅ **10. Navegadores**
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (si disponible)
- [ ] Mobile responsive

**🎯 Criterio de aprobación:** 100% checklist verde

---

## 16. Métricas de Éxito (Objetivas)

| Métrica | Objetivo | Método | Herramienta |
|---|---|---|---|
| **Tiempo primera tarea** | < 1 minuto | Cronometrar desde landing | Manual |
| **Respuesta IA** | 2-4 segundos | `console.time()` | DevTools |
| **Score consistente** | ±10% variación | Misma tarea 3x | Promedio |
| **Persistencia 100%** | Sin pérdida datos | 10 recargas consecutivas | Manual |
| **Clicks para completar** | ≤ 3 clicks | Crear → Ver → Completar | Contador |
| **Tasa de error API** | < 5% | 20 tareas de prueba | % fallidos |
| **Carga inicial** | < 2 segundos | Lighthouse | Chrome |
| **Peso total app** | < 500KB | Build size | Vite output |

**🎯 Definición de MVP exitoso:**
- Usuario sin experiencia crea 1 tarea en <60 seg
- 95%+ tareas analizadas correctamente
- Cero configuración requerida
- App funciona después de recargar

---

## 17. Roadmap Post-MVP

### **Versión 1.1 - Mejoras UX (1 semana)**
- ✅ Animaciones suaves (Framer Motion)
- ✅ Drag & drop para reordenar manual
- ✅ Dark mode toggle
- ✅ Exportar a CSV
- ✅ Atajos de teclado (Enter, Esc)

### **Versión 1.5 - Funcionalidades Extra (2 semanas)**
- 🔹 Subtareas (checklist dentro de tarea)
- 🔹 Tags/categorías personalizables
- 🔹 Filtros: por estado, score, fecha
- 🔹 Búsqueda en tiempo real
- 🔹 Estadísticas: gráficos de productividad

### **Versión 2.0 - Backend Opcional (1 mes)**
- 🔸 Autenticación simple (email/password)
- 🔸 Sincronización multi-dispositivo
- 🔸 API REST propia
- 🔸 Base de datos (Supabase/Firebase)
- 🔸 Compartir tareas (link público)

### **Versión 3.0 - IA Avanzada (Futuro)**
- ⭐ Descomposición automática de tareas
- ⭐ Estimación de tiempo con ML
- ⭐ Sugerencias proactivas
- ⭐ Detección de dependencias
- ⭐ Integración con calendarios

**🔒 Nunca agregar:**
- Gamificación compleja (mantener simplicidad)
- Múltiples vistas (evitar sobrecarga cognitiva)
- Configuraciones avanzadas (zero-config philosophy)

---

## 18. Recursos para Principiantes

### **📚 Documentación oficial:**
- **React:** https://react.dev/learn (tutorial interactivo)
- **Vite:** https://vitejs.dev/guide/ (setup rápido)
- **TailwindCSS:** https://tailwindcss.com/docs (clases utility)
- **Gemini API:** https://ai.google.dev/tutorials/web_quickstart

### **🎥 Videos recomendados (YouTube):**
- "React Hooks Explained" - aprender useState y useEffect
- "Custom Hooks in React" - crear useTareas
- "Fetch API Tutorial" - llamadas async
- "TailwindCSS Crash Course" - estilos rápidos

### **🛠️ Herramientas necesarias:**
- VS Code + extensiones: ES7 React snippets, Tailwind IntelliSense
- Node.js 18+ (`node -v` para verificar)
- Git para versionado
- Cuenta GitHub (gratis)
- Cuenta Vercel/Netlify (deploy gratis)

### **💬 Comunidades de ayuda:**
- React Discord: https://discord.gg/react
- Stack Overflow: tag `reactjs`
- Reddit: r/reactjs

### **🔗 Código de referencia:**
- Iconos: https://lucide.dev (biblioteca usada)
- localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- Regex JSON parsing: https://regex101.com (testing patterns)

### **📝 Checklist pre-desarrollo:**
```bash
# Verificar instalaciones
node -v          # ≥18.0.0
npm -v           # ≥9.0.0
git --version    # cualquier versión moderna

# Crear cuenta en:
☐ GitHub (versionado)
☐ Google AI Studio (API key)
☐ Vercel (deploy)
```

---

## 19. FAQ Completo

**P: ¿Es realmente gratis?**  
R: Sí, 100%. Gemini API tiene 60 requests/minuto gratis sin tarjeta. Deploy en Vercel/Netlify es gratis. Cero costos.

**P: ¿Funciona sin internet?**  
R: No, la creación de tareas requiere conexión (API Gemini). El listado de tareas existentes sí funciona offline.

**P: ¿Dónde se guardan mis tareas?**  
R: En tu navegador (localStorage). Son privadas y no salen de tu computadora. Si borras historial, se pierden.

**P: ¿Qué pasa si llego al límite de API (60/min)?**  
R: Poco probable (1 tarea por segundo). Si pasa, esperas 1 minuto y reintenta. La app lo detecta automáticamente.

**P: ¿La IA puede equivocarse?**  
R: Sí, es un asistente. Puedes editar manualmente los valores I,C,E si no estás de acuerdo. El score se recalcula instantáneo.

**P: ¿Puedo usarlo en móvil?**  
R: Sí, es responsive. Funciona en Chrome/Safari mobile. Mismo funcionamiento.

**P: ¿Cuántos caracteres puedo escribir?**  
R: Máximo 200. Si tu tarea es más larga, divídela en 2-3 subtareas.

**P: ¿Puedo cambiar la fórmula ICE?**  
R: Sí, editando `utils/calcularICE.js`. Por defecto: `(I×C×10)/E`

**P: ¿Hay límite de tareas?**  
R: Técnicamente no, pero recomendamos max 50 para performance.

**P: ¿Qué pasa con mi API key si publico el repo?**  
R: NUNCA comitear `.env`. Usar variables de entorno en Vercel/Netlify.

**P: ¿Puedo colaborar con otros?**  
R: No en MVP. Es single-user. Versión 2.0 tendrá compartir.

**P: ¿Por qué no hay filtros/búsqueda?**  
R: Simplicidad intencional. Con <50 tareas no se necesita. Post-MVP tendrá.

**P: ¿Qué navegadores soporta?**  
R: Chrome, Firefox, Safari, Edge (todos modernos, últimos 2 años).

**P: ¿Cómo exporto mis tareas?**  
R: Por ahora: copiar/pegar del localStorage. Versión 1.1 tendrá botón "Exportar CSV".

---

## 20. Conclusión

### **🎯 Por qué este MVP es perfecto para aprender React:**

✅ **Conceptos clave cubiertos:**
- Componentes funcionales
- Hooks (useState, useEffect, custom hooks)  
- Props y comunicación
- Eventos y manejo de estado
- API calls con async/await
- localStorage (persistencia simple)
- Conditional rendering
- Listas y keys
- Forms controlados

✅ **Experiencia práctica con:**
- Integración de API externa (IA moderna)
- Manejo de errores realista
- Loading states y UX
- JSON parsing y validación
- Cálculos dinámicos (score ICE)
- Modales y UI interactiva

✅ **Valor de portafolio:**
- Proyecto único (no es to-do list genérico)
- IA integrada = "wow factor"
- Completamente funcional
- Deploy público posible
- Demuestra problem-solving

### **📊 Stack tecnológico profesional:**
```
React 18.x    → Framework moderno
Vite          → Build tool rápido
Tailwind CSS  → Estilos productivos
Gemini API    → IA state-of-the-art
Vercel        → Deploy instantáneo
localStorage  → Persistencia sin backend
```

### **🚀 Próximos pasos sugeridos:**

1. **Completar MVP** (17 horas)
2. **Agregar tests** (Jest + React Testing Library)
3. **Optimizar performance** (React.memo, lazy loading)
4. **Documentar código** (JSDoc comments)
5. **Publicar en GitHub** (README detallado)
6. **Deploy a producción** (Vercel con dominio custom)
7. **Compartir en LinkedIn/Twitter** (caso de estudio)

### **📝 Diferenciadores clave:**

| Feature | Este MVP | To-Do típico |
|---|---|---|
| IA integrada | ✅ Gemini API | ❌ |
| Priorización automática | ✅ Score ICE | ❌ |
| Explicaciones contextuales | ✅ Razonamiento IA | ❌ |
| Ajuste manual inteligente | ✅ Sliders + recalc | ❌ |
| Simplicidad extrema | ✅ 3 clicks máx | ❌ |
| 100% gratuito | ✅ Sin límites ocultos | ❌ |

---

**🌟 Este proyecto demuestra que puedes construir aplicaciones reales, útiles y con IA moderna usando solo React y APIs gratuitas.**

**Sin backend. Sin complejidad. Sólo código limpio y funcionalidad útil.**

---

**Autor:** Sistema de Gestor de Tareas Inteligente  
**Versión:** 2.0 (Optimizada para principiantes)  
**Licencia:** MIT  
**Última actualización:** 3 de Marzo de 2026  
**Tiempo estimado de desarrollo:** 17 horas (repartidas en 1 semana)  
**Nivel recomendado:** Junior React (conocimientos básicos de JS/React)  
**Costo total:** $0.00
