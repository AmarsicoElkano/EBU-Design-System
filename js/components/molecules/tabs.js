let btns = document.querySelectorAll(".btn_tab");

btns.forEach((btn) => {
	btn.addEventListener("click", () => {
		let father = btn.closest(".content_tabs");
		let grandFather = btn.closest(".chapters-content");
		let currentTarget = grandFather.querySelector(".tab_content.show");

		let allChildButtons = father.querySelectorAll(".btn_tab");
		allChildButtons.forEach((b) => b.classList.remove("active"));

		btn.classList.add("active");

		let targetContentId = btn.dataset.href;
		let targetContent = document.getElementById(targetContentId);

		console.log(targetContent)
		//const targetPosition = targetContent.getBoundingClientRect().top - 90;
		//console.log(targetPosition, targetContent.getBoundingClientRect())

		if (targetContent) {
			if (currentTarget) {
				currentTarget.classList.remove("show");
			}
			targetContent.classList.add("show");
			father.scrollLeft = btn.offsetLeft - father.offsetLeft + 25;
			targetContent.scrollIntoView(200);
			// window.scrollTo({
			// 	top: targetPosition,
			// 	behavior: "smooth",
			// });
		} else {
			console.error("Target content not found: ", targetContentId);
		}
	});
});
