document.addEventListener("DOMContentLoaded", () => {
	const asideBtns = document.querySelectorAll(".asideTabs li");

	const firstBtn = asideBtns[0];
	firstBtn.classList.add("active");
	const firstContentId = firstBtn.dataset.href;
	const firstContent = document.getElementById(firstContentId);
	firstContent.classList.add("show");

	asideBtns.forEach((btn) => {
		const svg = btn.querySelector(".blue-play");
		if (svg) {
			svg.style.display = "none";
		}
	});

	const firstSvg = firstBtn.querySelector(".blue-play");
	if (firstSvg) {
		firstSvg.style.display = "inline-block";
	}

	asideBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const ul = btn.closest("ul");

			ul.querySelectorAll("li").forEach((li) => {
				li.classList.remove("active");
				const svg = li.querySelector(".blue-play");
				if (svg) {
					svg.style.display = "none";
				}
			});

			btn.classList.add("active");
			const activeSvg = btn.querySelector(".blue-play");
			if (activeSvg) {
				activeSvg.style.display = "inline-block";
			}

			const grandFather = btn.closest(".big-card-gradient");
			const currentTarget = grandFather.querySelector(".column.asideTab.show");

			if (currentTarget) {
				currentTarget.classList.remove("show");
			}

			const targetContentId = btn.dataset.href;
			const targetContent = document.getElementById(targetContentId);

			if (targetContent) {
				targetContent.classList.add("show");
			} else {
				console.error("Target content not found: ", targetContentId);
			}
		});
	});
});
