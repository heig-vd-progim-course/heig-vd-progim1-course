#!/usr/bin/env bash

# Genere les diagrammes PlantUML en SVG, a cote de leur fichier source.
#
# Les sources vivent dans `docs/`, donc les SVG produits sont copies tels quels
# par Zensical dans le site et peuvent etre references depuis les pages.
#
# Extensions reconnues : `.puml` et `.plantuml`.

set -euo pipefail

WORKDIR=$(pwd)
PLANTUML_DOCKER_IMAGE="plantuml/plantuml:1.2026"

if [ -f "/opt/plantuml.jar" ]; then
	echo "PlantUML est installe localement, utilisation de la version locale..."
	PLANTUML_CMD=(java -jar /opt/plantuml.jar)
else
	echo "PlantUML n'est pas installe, utilisation de son image Docker..."
	PLANTUML_CMD=(
		docker run --rm
		--volume="${WORKDIR}:/data"
		--user "$(id -u):$(id -g)"
		--env _JAVA_OPTIONS="-Duser.home=/tmp"
		"$PLANTUML_DOCKER_IMAGE"
	)
fi

shopt -s globstar nullglob

sources=(docs/**/*.puml docs/**/*.plantuml)

if [ ${#sources[@]} -eq 0 ]; then
	echo "Aucun diagramme PlantUML trouve dans docs/. Rien a faire."
	exit 0
fi

echo "Conversion de ${#sources[@]} diagramme(s) en SVG..."
"${PLANTUML_CMD[@]}" -tsvg -nbthread auto -nometadata --progress "${sources[@]}"

echo "Tous les diagrammes ont ete generes."
