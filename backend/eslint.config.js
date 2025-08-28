// eslint.config.js
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default [
  // Base JS rules
  eslint.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // Disable formatting conflicts (let Prettier handle it)
  prettier,

  {
    files: ["src/**/*.{ts,js}"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    rules: {
      "no-console": "warn", // warn instead of error
      "prefer-const": "error",

      // 🔑 Updated: allow unused function params if prefixed with "_"
      "no-unused-vars": [
        "warn",
        { 
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_"
        }
      ],
    },
  },
];
