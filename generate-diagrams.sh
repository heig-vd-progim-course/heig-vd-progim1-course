#!/usr/bin/env bash

# Genere les diagrammes PlantUML en SVG, a cote de leur fichier source.
#
# Deux emplacements sont traites :
#   - `docs/` : les SVG sont copies tels quels par Zensical dans le site et
#     peuvent etre references depuis les pages ;
#   - `presentations/<slug>/images/` : les SVG sont references par les
#     presentations Marp avec `./images/<nom>.svg`, puis copies dans
#     `docs/presentations/<slug>/images/` par `generate-presentations.sh`.
#
# Ce script doit donc tourner AVANT `generate-presentations.sh`.
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

sources=(docs/**/*.puml docs/**/*.plantuml presentations/**/*.puml presentations/**/*.plantuml)

if [ ${#sources[@]} -eq 0 ]; then
	echo "Aucun diagramme PlantUML trouve dans docs/ ni dans presentations/. Rien a faire."
	exit 0
fi

echo "Conversion de ${#sources[@]} diagramme(s) en SVG..."
"${PLANTUML_CMD[@]}" -tsvg -nbthread auto -nometadata --progress "${sources[@]}"

echo "Tous les diagrammes ont ete generes."
