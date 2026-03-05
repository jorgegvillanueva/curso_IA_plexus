# Referencia: React + TypeScript + MUI

## ESLint (React + TypeScript)

Ejemplo de configuración mínima en `eslint.config.js` (flat config) o `.eslintrc`:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react", "react-hooks", "jsx-a11y"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  },
  "settings": { "react": { "version": "detect" } }
}
```

Dependencias típicas: `eslint`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`.

## Tema MUI

Ejemplo de `theme.ts`:

```ts
import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
```

Uso en la app:

```tsx
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from './theme';

<ThemeProvider theme={appTheme}>
  <App />
</ThemeProvider>
```

## Patrones de hooks

- **Estado local**: `useState`; estado derivado preferir cálculo en render o `useMemo` si es costoso.
- **Efectos**: un efecto por preocupación; dependencias completas en el array; limpieza con return si hay suscripciones/timeouts.
- **Custom hooks**: nombre `useAlgo`; devolver objeto o tupla estable (mismo orden); no llamar hooks condicionalmente.

Ejemplo de custom hook tipado:

```ts
function useToggle(initial = false): [boolean, () => void] {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle];
}
```

## Estructura de carpetas sugerida

```
src/
  components/     # componentes reutilizables
  hooks/           # custom hooks
  theme/           # theme.ts, paletas
  pages/ o views/  # componentes de página
  types/           # interfaces/types globales
```

## Accesibilidad (a11y)

- Botones e interactivos con texto o `aria-label`.
- Formularios con `<label>` asociado o `aria-labelledby`.
- Contraste suficiente; MUI usa por defecto ratios adecuados si no se sobrescribe el tema.
