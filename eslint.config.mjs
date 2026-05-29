import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "next-env.d.ts",
      "node_modules/**",
      "out/**",
      "build/**",
      "coverage/**",
    ],
  },
  ...nextCoreWebVitals,
];

export default eslintConfig;
