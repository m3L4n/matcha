module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "no-console": "warn", // Avertissement pour les appels à console.log et autres méthodes console
    "no-unused-vars": "warn", // Avertissement pour les variables non utilisées

    // Règles spécifiques à React (plugin:react/recommended)
    "react/prop-types": "off", // Désactiver la vérification des propTypes
    "react/jsx-uses-react": "off", // Désactiver le rappel inutile de React pour les versions récentes
    "react/react-in-jsx-scope": "off", // Désactiver la nécessité d'importer React pour les versions récentes

    // Autres règles personnalisées ou spécifiques
    // Ajoute tes propres règles ici

    // Exemple : forcer l'utilisation de let/const au lieu de var
    "no-var": "error",

    // Exemple : forcer l'indentation avec 2 espaces
    indent: ["warn", 4],
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
};
