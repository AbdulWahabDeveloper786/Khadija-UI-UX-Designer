import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // These are safe to relax for shadcn/ui components that export constants
      "react-refresh/only-export-components": "off",
      // Warn instead of error for prefer-const to not block builds
      "prefer-const": "warn",
    },
  },
];

export default eslintConfig;
