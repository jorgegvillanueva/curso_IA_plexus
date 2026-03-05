---
name: react-typescript-material
description: Develop React apps with TypeScript, Material-UI (MUI), ESLint compliance, and clean code practices. Use when building or editing React/TypeScript frontends, using Material-UI components, configuring linting, or applying clean code in React/TS codebases.
---

# React + TypeScript + Material-UI (Clean Code & Linting)

## Cuándo aplicar

- Proyectos o archivos React con TypeScript.
- Uso o integración de Material-UI (MUI).
- Configuración o ajuste de ESLint/TypeScript para React.
- Refactor o revisión siguiendo clean code en componentes/funciones.

## Stack y convenciones

- **React** 18+ con **TypeScript** estricto.
- **Material-UI (MUI)** v5+ para componentes de UI.
- **ESLint** con `eslint-plugin-react`, `@typescript-eslint` y reglas de hooks/accesibilidad.
- **Clean code**: componentes pequeños, nombres claros, una responsabilidad por módulo, tipos explícitos.

## Componentes React + TypeScript

- Tipar siempre props con una interfaz nombrada (no `any` ni props inline largas):

```tsx
interface ButtonPrimaryProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ label, onClick, disabled = false }) => (
  <Button variant="contained" onClick={onClick} disabled={disabled}>
    {label}
  </Button>
);
```

- Preferir `React.FC<Props>` o `function Component(props: Props)`; evitar `any` en props o children.
- Extraer lógica y estado complejo a custom hooks; mantener componentes presentacionales enfocados en render.

## Material-UI (MUI)

- Importar desde `@mui/material` (y `@mui/icons-material` si aplica); usar `sx` o `theme` para estilos.
- Preferir componentes semánticos: `Button`, `TextField`, `Box`, `Stack`, `Typography`, `Paper`, etc.
- Temas y paletas en un archivo de tema (p. ej. `theme.ts`) y proveer con `ThemeProvider` en la app.

```tsx
import { Box, Button, TextField, Typography } from '@mui/material';
```

## Linting

- Proyecto debe tener ESLint con parser TypeScript y plugins React.
- Reglas mínimas recomendadas: `@typescript-eslint/no-explicit-any`, `react-hooks/rules-of-hooks`, `react-hooks/exhaustive-deps`, y reglas de accesibilidad básicas (p. ej. `jsx-a11y`).
- El código generado o editado debe pasar `eslint` sin errores; corregir warnings relevantes cuando el usuario lo pida.

## Clean code en React/TS

- **Nombres**: componentes en PascalCase, hooks con prefijo `use`, constantes en UPPER_SNAKE o camelCase según contexto.
- **Tamaño**: componentes que no quepan en una pantalla sin scroll → dividir en subcomponentes o hooks.
- **Una responsabilidad**: cada componente o hook hace una cosa; lógica de negocio en hooks o servicios, no en el JSX.
- **Evitar**: props en cascada (>2–3 niveles), funciones gigantes, tipos implícitos o `as` innecesarios.
- **Imports**: ordenados (externos → internos → tipos), sin imports no usados.

## Checklist rápido

- [ ] Props e estado tipados (sin `any`).
- [ ] Componentes y hooks con nombres descriptivos y tamaño acotado.
- [ ] Uso de MUI consistente y semántico.
- [ ] ESLint sin errores en los archivos tocados.
- [ ] Sin lógica de negocio pesada dentro del JSX; extraer a hooks/funciones.

## Recursos adicionales

- Configuración detallada de ESLint, ejemplos de temas MUI y patrones de hooks: [reference.md](reference.md).
