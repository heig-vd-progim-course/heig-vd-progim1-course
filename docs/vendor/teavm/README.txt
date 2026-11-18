Fichiers de TeaVM pour l'essai de code Java exécutable
=======================================================

Ces fichiers servent à la page docs/99-ressources/essai-java-executable.md,
via docs/javascripts/java-runner.js. Ils ne sont pas modifiés.

Origine
-------

Copiés le 18 novembre 2026 depuis https://teavm.org/playground/3/ :

- compiler.wasm               (4 294 850 octets)
- compiler.wasm-runtime.js    (13 573 octets)
- compile-classlib-teavm.bin  (200 623 octets)
- runtime-classlib-teavm.bin  (2 387 011 octets)

teavm.org n'envoie pas d'en-têtes CORS et bloque les téléchargements depuis
GitHub Actions : il faut donc les héberger avec le site.

Licences
--------

- TeaVM et teavm-javac, d'Alexey Andreev : Apache License 2.0. Texte complet
  dans LICENSE.txt, mentions obligatoires dans NOTICE.txt.
- compiler.wasm et compile-classlib-teavm.bin contiennent des composants
  d'OpenJDK (le compilateur javac, compilé en bytecode puis en WebAssembly),
  sous GNU General Public License v2 avec Classpath Exception :
  https://openjdk.org/legal/gplv2+ce.html

Code source
-----------

- teavm-javac : https://github.com/konsoletyper/teavm-javac
  (branche master, commit 0340fab28da146d283ba94df8a36d66a4c635084 au moment
  de la copie)
- TeaVM : https://github.com/konsoletyper/teavm
- OpenJDK : https://github.com/openjdk/jdk
