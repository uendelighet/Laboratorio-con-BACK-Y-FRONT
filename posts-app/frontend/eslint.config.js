//Este archivo le dice a ESLint:
//“Vigila mi código TypeScript y React.”
//“Aplica reglas modernas y recomendadas.”
//“Entiende que estoy en navegador.”
//“No me revises lo que está compilado en dist.”

// Importa la configuración base recomendada de ESLint para JavaScript
import js from '@eslint/js'

// Importa definiciones de variables globales (por ejemplo, las del navegador)
import globals from 'globals'

// Plugin que agrega reglas específicas para React Hooks
import reactHooks from 'eslint-plugin-react-hooks'

// Plugin que ayuda con React Refresh (útil en entornos como Vite)
import reactRefresh from 'eslint-plugin-react-refresh'

// Configuración oficial de ESLint para TypeScript
import tseslint from 'typescript-eslint'

// Funciones para definir la configuración en formato "flat config" (nuevo sistema de ESLint)
import { defineConfig, globalIgnores } from 'eslint/config'

// Exporta la configuración final de ESLint
export default defineConfig([

  // Ignora la carpeta "dist" (normalmente donde se compila el proyecto)
  globalIgnores(['dist']),

  {
    // Aplica esta configuración solo a archivos TypeScript y TSX
    files: ['**/*.{ts,tsx}'],

    // Extiende configuraciones recomendadas de varios plugins
    extends: [
      // Reglas recomendadas base para JavaScript
      js.configs.recommended,

      // Reglas recomendadas para TypeScript
      tseslint.configs.recommended,

      // Reglas recomendadas para React Hooks
      reactHooks.configs.flat.recommended,

      // Configuración optimizada para React Refresh con Vite
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      // Define la versión de ECMAScript (ES2020)
      ecmaVersion: 2020,

      // Define variables globales disponibles (como window, document, etc.)
      globals: globals.browser,
    },
  },
])