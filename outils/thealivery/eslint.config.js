// Configuration ESLint : règles recommandées, avec vérification des types
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["node_modules/", "coverage/"] },
	js.configs.recommended,
	...tseslint.configs.strictTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{ files: ["eslint.config.js"], ...tseslint.configs.disableTypeChecked },
);
