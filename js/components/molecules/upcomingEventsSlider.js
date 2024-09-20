import Util from '../../util/util.js';

export default class UpcomingEvents {
    constructor(el) {
        this.$el = el;
        this.category = 'Molecules';
        this.componentName = 'UpcomingEvents';
        const sliderUpcoming = new Swiper(this.$el, {
            slidesPerView: 1.2,
            spaceBetween: 20,
            breakpoints: {
                // when window width is >= 640px
                1024: {
                    slidesPerView: 2,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                },
                1440: {
                    slidesPerView: 3
                },
            },

            navigation: {
                nextEl: '.upcoming-button-prev',
                prevEl: '.upcoming-button-next',
            },
            }
        )
    }
}
Array.from(document.querySelectorAll('.upcoming_swiper:not([data-no-auto])')).forEach((el) => {
    Util.addComponent(new UpcomingEvents(el));
});