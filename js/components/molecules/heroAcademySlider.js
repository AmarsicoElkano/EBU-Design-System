import Util from '../../util/util.js';
export default class HeroAcademySlider {
    constructor(el) {
        this.$el = el;
        this.category = 'Molecules';
        this.componentName = 'HeroAcademySlider';
        const heroSwiper = new Swiper(this.$el, {
            loop: false,
            slidesPerView: 1,
            spaceBetween: 5,
            breakpoints: {
                1024: {
                    slidesPerView: 2.5
                }
            },
            navigation: {
                nextEl: '.swiper-hero-lib-next',
                prevEl: '.swiper-hero-lib-prev',
            },
        });
    }
}
Array.from(document.querySelectorAll('.heroAcademySlide_swiper:not([data-no-auto])')).forEach((el) => {
    Util.addComponent(new HeroAcademySlider(el));
});
