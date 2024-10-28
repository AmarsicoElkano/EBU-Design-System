import Page from "./page.js";

//import {gsap} from 'gsap';

export default class Home extends Page {
	constructor() {
		super({ page: "Home" });
	}
	init() {
		super.init();
	}
	pageReady() {
		this.resize();
		console.log("log page ready");
		const circles = document.querySelectorAll(".element");
		const glowingCircle = document.querySelector(".glowing-circle");
		const arrowCompass = document.querySelector(".arrowCompass");
		const chapters = document.querySelectorAll(".chapter");
		const backToTopArrow = document.querySelector(".back-to-top");
		const totalChapters = chapters.length;
		const headerHeight = document.querySelector("header")?.offsetHeight || 0;
		const elements = document.querySelectorAll(".element-list");

		let currentAngle = 0;

		document.querySelector('#showMoreVideo').addEventListener('click', ()=>{
			document.querySelectorAll('.video-card.hide').forEach(vc => vc.classList.remove('hide'))
		})

		gsap.set(circles, { opacity: 0 });
		gsap.set(arrowCompass, { opacity: 0, rotate: 720 });
		gsap.to(glowingCircle, { opacity: 1, duration: 1, delay: 0.5 });

		// popup contact arrow
		const popupTriggers = document.querySelectorAll(".popup-trigger");
		const popupContents = document.querySelectorAll(
			".pop-up_simple_contact_content_hidden"
		);

		popupTriggers.forEach((popupTrigger, index) => {
			let isRotated = false;

			popupTrigger.addEventListener("click", function () {
				const popupContent = popupContents[index];

				// Toggle pop-up content display
				if (popupContent.style.display === "block") {
					popupContent.style.display = "none";
				} else {
					popupContent.style.display = "block";
				}

				if (!isRotated) {
					popupTrigger.style.transform = "rotate(-180deg)";
				} else {
					popupTrigger.style.transform = "rotate(0deg)";
				}
				isRotated = !isRotated;
			});
		});

		const n = circles.length; // numero de circulos
		const r = glowingCircle.offsetWidth / 2; // radio

		let angulo = 0;
		let originX = circles[0].offsetLeft;
		let originY = circles[0].offsetTop;

		backToTopArrow.addEventListener("click", () => {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		});
		let videoHero = document.querySelector('.video-hero')
		window.addEventListener("scroll", () => {
			const scrollPos = window.scrollY;
			if(scrollPos > window.innerHeight){
				backToTopArrow.classList.remove('hidden')
				videoHero.classList.add('hidden')
			}else{
				backToTopArrow.classList.add('hidden')
				videoHero.classList.remove('hidden')
			}
		})
		videoHero.addEventListener('click', ()=>{
			let srcVideo = videoHero.dataset.src
			let iframe = `<iframe width="100%" height="100%" src="${srcVideo}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
			document.querySelector('#videoContent').classList.add('open')
			document.querySelector('#videoContentIframe').innerHTML = iframe
			
		})
		document.querySelector('.bt-close').addEventListener('click', ()=>{
			document.querySelector('#videoContent').classList.remove('open')
			document.querySelector('#videoContentIframe').innerHTML = ''
		})
		
		//angulo += 0.01
		circles.forEach((element, i) => {
			gsap.to(element, {
				duration: 2,
				delay: i / 10,
				opacity: 1,
				top: `${originX + r * Math.cos(angulo + ((2 * Math.PI) / n) * i)}px`,
				left: `${originY + r * Math.sin(angulo + ((2 * Math.PI) / n) * i)}px`,
				ease: "Power3.easeOut",
			});
			// element.style.left = `${originX + r*Math.cos(angulo + 2*Math.PI/n*i)}px`
			// element.style.top = `${originY + r*Math.sin(angulo + 2*Math.PI/n*i)}px`
		});

		gsap.to(arrowCompass, {
			duration: 1,
			opacity: 1,
			rotate: 0,
			delay: 1,
			onComplete: () => {
				arrowCompass.removeAttribute("style");
				gsap.to(circles, {
					stagger: {
						each: 0.1,
						onComplete() {
							this.targets()[0].classList.add("show");
						},
					},
				});
			},
		});

		circles.forEach((e) => {
			e.addEventListener("mouseover", () => {
				let i = e.dataset.index;
				arrowCompass.setAttribute("data-rel", "index-" + i);
				chapters.forEach((c) => {
					c.classList.remove("show");
					if (c.classList.contains("chapter-" + i)) {
						c.classList.add("show");
					}
				});
			});

			e.addEventListener("click", () => {
				let chapterIndex = e.dataset.index;
				let targetChapters = document.querySelectorAll(
					".chapters-content.chapter-" + chapterIndex
				);

				let targetChapter =
					targetChapters.length > 1 ? targetChapters[1] : targetChapters[0];

				const headerHeight =
					document.querySelector("header")?.offsetHeight || 0;
				const targetPosition = targetChapter.offsetTop - headerHeight;

				window.scrollTo({
					top: targetPosition,
					behavior: "smooth",
				});
			});
    });
    
    elements.forEach((e) => {
			e.addEventListener("click", () => {
				let chapterIndex = e.dataset.index;
				let targetChapters = document.querySelectorAll(
					".chapters-content.chapter-" + chapterIndex
				);

				let targetChapter =
					targetChapters.length > 1 ? targetChapters[1] : targetChapters[0];

				const headerHeight =
					document.querySelector("header")?.offsetHeight || 0;

				const targetPosition = targetChapter.offsetTop - headerHeight;

				window.scrollTo({
					top: targetPosition,
					behavior: "smooth",
				});
			});
		});

		glowingCircle.addEventListener("mouseleave", () => {
			chapters.forEach((c) => c.classList.remove("show"));
			arrowCompass.setAttribute("data-rel", "");
		});

		// Helper function for arrow compass rotation anim
		function getChapterTopPosition(chapterIndex) {
			let targetChapters = document.querySelectorAll(
				".chapters-content.chapter-" + chapterIndex
			);

			if (targetChapters.length === 0) {
				console.warn(
					`No target chapters found for Chapter Index: ${chapterIndex}`
				);
				return 0;
			}

			let targetChapter = targetChapters[0];

			if (!targetChapter) {
				console.warn(
					`Target chapter not found for Chapter Index: ${chapterIndex}`
				);
				return 0;
			}

			const targetPosition = targetChapter.offsetTop - headerHeight;
			return targetPosition;
		}

		// Arrow compass rotation animation
		window.addEventListener("scroll", () => {
			const scrollPos = window.scrollY;

      if (scrollPos === 0) {
        currentAngle = 0;
      } else {
        chapters.forEach((chapter, index) => {
          const chapterIndex = index + 1;
          const chapterTop = getChapterTopPosition(chapterIndex);
          const chapterHeight = document.querySelector(
            `.chapters-content.chapter-${chapterIndex}`
          ).offsetHeight;

          const chapterBottom = chapterTop + chapterHeight;

          if (scrollPos >= chapterTop && scrollPos < chapterBottom) {
            const totalScrollRange = chapterHeight;
            const scrollOffset = scrollPos - chapterTop;

            let rawAngle =
              index * (360 / totalChapters) +
              (scrollOffset / totalScrollRange) * (360 / totalChapters);

            currentAngle = Math.round(rawAngle * 100) / 100;

            if (currentAngle >= 360) {
              currentAngle -= 360;
            } else if (currentAngle < 0) {
              currentAngle += 360;
            }
          }
        });
      }

			//arrowCompass.style.transform = `rotate(${currentAngle}deg)`;
			arrowCompass.setAttribute(
				"data-rel",
				"index-" + (Math.round(currentAngle / (360 / totalChapters)) + 1)
			);
		});
		//BT VIEW
		this._handlerMenuViews();
	}
	_handlerMenuViews() {
    let btns = document.querySelectorAll(".show-list"); 
		let compassView = document.querySelector(".glowing-circle");
		let listsView = document.querySelector(".navigation-list");

		btns.forEach((but) => {
			but.addEventListener("click", () => {
				let data = but.dataset.view; 

				if (data === "list") {
					gsap.to(compassView, {
						duration: 0.5,
						autoAlpha: 0,
						onComplete: () => {
							but.setAttribute("data-view", "compass");
							gsap.to(listsView, { duration: 0.5, autoAlpha: 1 });
						},
					});
				} else {
					gsap.to(listsView, {
						duration: 0.5,
						autoAlpha: 0,
						onComplete: () => {
							but.setAttribute("data-view", "list");
							gsap.to(compassView, { duration: 0.5, autoAlpha: 1 });
						},
					});
				}
			});
		});
	}
}
new Home();
