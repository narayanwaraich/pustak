import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: [
      "index.ts",
      "app.ts",
      "util/*.ts",
      "models/*.ts",
      "controllers/*.ts",
      "**/*.ts"
    ],
    languageOptions: {
      sourceType: "commonjs"
    },
  },
  {
    ignores: [
      "build/",
      "migrations/",
      "*.d.ts",
      "*.mjs",
      "**/*.js"
    ],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/semi": ["error"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { "argsIgnorePattern": "^_" },
      ],
      "no-case-declarations": "off",
    },
  },
  {
    rules: {
      "linebreak-style": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          "checksVoidReturn": false
        },
      ],
    },
  },
];