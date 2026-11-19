// Construit le jeu : deux fichiers figés dans docs/javascripts/, versionnés.
// - thealivery.js : le jeu, chargé sur toutes les pages ;
// - thealivery-sandbox.js : le bac à sable, avec CodeMirror, chargé à la demande.
import { build } from "esbuild";

const banner = {
	js: "/* Thealivery, jeu d'apprentissage du cours ProgIM1. Construit depuis outils/thealivery/, ne pas modifier à la main. CC BY-SA 4.0. */",
};

await build({
	entryPoints: { thealivery: "src/main.ts" },
	outdir: "../../docs/javascripts",
	bundle: true,
	minify: true,
	format: "iife",
	target: "es2020",
	banner,
	logLevel: "info",
});

await build({
	entryPoints: { "thealivery-sandbox": "src/sandbox.ts" },
	outdir: "../../docs/javascripts",
	bundle: true,
	minify: true,
	format: "iife",
	target: "es2020",
	banner: {
		js: `${banner.js}\n/* Contient CodeMirror 6 (Marijn Haverbeke et contributeurs, licence MIT). */`,
	},
	legalComments: "none",
	logLevel: "info",
});
