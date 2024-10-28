import Swiper from "../../libs/swiper.min.js";
import Util from "../../util/util.js";

export default class DocumentsSlider {
	constructor(el) {
		this.$el = el;
		this.category = "Molecules";
		this.componentName = "DocumentsSlider";
		this.initDocumentsSlider();
	}

	initDocumentsSlider() {
		requestAnimationFrame(() => {
			const sliderUpcoming = new Swiper(this.$el, {
				slidesPerView: 1.5,
				spaceBetween: 20,
				scrollbar: {
					el: ".swiper-scrollbar",
					draggable: true,
				},
				breakpoints: {
					380: {
						slidesPerView: 1.2,
					},
					580: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 4,
					},
				},
				navigation: {
					nextEl: ".upcoming-button-next",
					prevEl: ".upcoming-button-prev",
				},
			});
			sliderUpcoming.update();
		});
	}
}

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			Util.addComponent(new DocumentsSlider(entry.target));
			observer.unobserve(entry.target);
		}
	});
});

document
	.querySelectorAll(".documents_swiper:not([data-no-auto])")
	.forEach((el) => {
		observer.observe(el);
	});
