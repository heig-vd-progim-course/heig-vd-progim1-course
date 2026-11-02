#!/usr/bin/env bash

# Genere les PDF des evaluations du dossier `evaluations/` avec Pandoc, vers
# `docs/00-organisation/`, ou Zensical les publie comme fichiers statiques.
#
# Pour chaque dossier `evaluations/<slug>/` :
#   - les diagrammes `images/*.puml` sont convertis en PNG avec PlantUML ;
#   - `<NOM>.md` devient `docs/00-organisation/<nom>.pdf`, en minuscules, avec
#     le filtre `questions-insecables.lua`, qui garde chaque question sur une page.
#
# Contrairement aux presentations, les PDF generes sont versionnes : le workflow
# GitHub ne dispose ni de Pandoc ni de LaTeX. Relancer ce script apres chaque
# modification d'une evaluation, et commiter les PDF.

set -euo pipefail

WORKDIR=$(pwd)
PANDOC_DOCKER_IMAGE="pandoc/latex"
PLANTUML_DOCKER_IMAGE="plantuml/plantuml:1.2026"
SOURCE_DIR="evaluations"
OUTPUT_DIR="docs/00-organisation"

shopt -s nullglob

diagrams=("$SOURCE_DIR"/*/images/*.puml)

if [ ${#diagrams[@]} -gt 0 ]; then
	echo "Conversion de ${#diagrams[@]} diagramme(s) en PNG..."
	docker run --rm \
		--volume="${WORKDIR}:/data" \
		--user "$(id -u):$(id -g)" \
		--env _JAVA_OPTIONS="-Duser.home=/tmp" \
		"$PLANTUML_DOCKER_IMAGE" -tpng -nometadata "${diagrams[@]}"
fi

mkdir -p "$OUTPUT_DIR"

for input in "$SOURCE_DIR"/*/*.md; do
	folder=$(dirname "$input")
	name=$(basename "$input" .md | tr '[:upper:]' '[:lower:]')
	output="$OUTPUT_DIR/$name.pdf"

	echo "Conversion de $input vers $output..."

	# Pandoc tourne dans le dossier de l'evaluation, pour trouver `images/`
	docker run --rm \
		--volume="${WORKDIR}:/data" \
		--workdir="/data/$folder" \
		--user "$(id -u):$(id -g)" \
		"$PANDOC_DOCKER_IMAGE" --lua-filter="/data/$SOURCE_DIR/questions-insecables.lua" \
		-o "/data/$output" "$(basename "$input")"
done

echo "Tous les PDF des evaluations ont ete generes dans $OUTPUT_DIR."
