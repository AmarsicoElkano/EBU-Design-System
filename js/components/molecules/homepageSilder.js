import Util from '../../util/util.js';

export default class HomepageSlider {
    constructor(el) {
        this.$el = el;
        this.category = 'Molecules';
        this.componentName = 'HomepageSlider';
        const homepageWrapper = new Swiper(this.$el.querySelector('.mySwiper'), {
            slidesPerView: 1.5,
            grid: {
                rows: 2,
            },
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }
}

Array.from(document.querySelectorAll('.mySwiper:not([data-no-auto])')).forEach((el) => {
    Util.addComponent(new HomepageSlider(el));
});