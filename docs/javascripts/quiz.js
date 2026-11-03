// Quiz à choix multiples pour les pages du support.
//
// Dans le Markdown, un quiz est un bloc `<div class="quiz" markdown>` qui
// contient une question, une liste de cases à cocher et, facultativement, un
// bloc `<div class="quiz-explanation" markdown>`. La bonne réponse est la case
// cochée (`- [x]`), les autres sont vides (`- [ ]`).
//
// Ce script transforme chaque case en réponse cliquable. Une mauvaise réponse
// est marquée et l'on peut réessayer. La bonne réponse affiche l'explication et
// lance des confettis, sauf si le système demande de réduire les animations.
//
// Les confettis viennent de `@tsparticles/confetti`, chargé avant ce script
// dans `zensical.toml`, comme dans le cours UPInfo.

(function () {
	"use strict";

	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

	function celebrate(element) {
		if (typeof window.confetti !== "function" || reducedMotion.matches) {
			return;
		}

		const rect = element.getBoundingClientRect();

		window.confetti({
			particleCount: 100,
			spread: 70,
			origin: {
				x: (rect.left + rect.width / 2) / window.innerWidth,
				y: (rect.top + rect.height / 2) / window.innerHeight,
			},
		});
	}

	function setupQuiz(quiz) {
		if (quiz.dataset.quizReady === "true") {
			return;
		}

		const answers = quiz.querySelectorAll("li.task-list-item");
		if (answers.length === 0) {
			return;
		}

		quiz.dataset.quizReady = "true";

		const explanation = quiz.querySelector(".quiz-explanation");
		if (explanation) {
			explanation.hidden = true;
		}

		const feedback = document.createElement("p");
		feedback.className = "quiz-feedback";
		feedback.setAttribute("aria-live", "polite");
		answers[answers.length - 1].parentElement.after(feedback);

		answers.forEach((answer) => {
			const checkbox = answer.querySelector("input[type='checkbox']");
			const isCorrect = checkbox !== null && checkbox.checked;

			// La case à cocher trahirait la réponse : on la retire
			const control = answer.querySelector(".task-list-control") || checkbox;
			if (control) {
				control.remove();
			}

			answer.classList.add("quiz-answer");
			answer.setAttribute("role", "button");
			answer.tabIndex = 0;

			function choose() {
				if (quiz.classList.contains("quiz--solved")) {
					return;
				}

				if (isCorrect) {
					answer.classList.add("quiz-answer--correct");
					quiz.classList.add("quiz--solved");
					feedback.textContent = "Bonne réponse.";
					if (explanation) {
						explanation.hidden = false;
					}
					celebrate(answer);
				} else {
					answer.classList.add("quiz-answer--wrong");
					feedback.textContent = "Ce n'est pas cette réponse. Réessayez.";
				}
			}

			answer.addEventListener("click", choose);
			answer.addEventListener("keydown", (event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					choose();
				}
			});
		});
	}

	function setupAllQuizzes() {
		document.querySelectorAll(".quiz").forEach(setupQuiz);
	}

	// Avec la navigation instantanée, `document$` émet à chaque changement de
	// page. Sans elle, on se contente du chargement initial.
	if (typeof window.document$ !== "undefined") {
		window.document$.subscribe(setupAllQuizzes);
	} else if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", setupAllQuizzes);
	} else {
		setupAllQuizzes();
	}
})();
