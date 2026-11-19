CodeMirror 6 pour les blocs de code exécutable
==============================================

codemirror.js est l'éditeur des blocs `java-run`, utilisé par
docs/javascripts/java-runner.js. Ce fichier est construit, ne pas le modifier
à la main : la recette est dans outils/codemirror/ (README.md).

Contenu, versions figées dans outils/codemirror/package.json :

- @codemirror/state, view, commands, language, autocomplete, lang-java
- @lezer/highlight, common, lr, java
- style-mod, w3c-keyname, crelt, @marijn/find-cluster-break

Licence : MIT, de Marijn Haverbeke et des personnes qui contribuent à
CodeMirror. Texte complet dans LICENSE.txt. Sources :
https://github.com/codemirror et https://github.com/lezer-parser
