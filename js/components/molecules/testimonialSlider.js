import Util from '../../util/util.js';

export default class TestimonialSlider {
    constructor(el) {
        this.$el = el;
        this.category = 'Molecules';
        this.componentName = 'TestimonialSlider';
        const sliderTestimonial = new Swiper(this.$el, {
                //direction: 'vertical',
                loop: false,

                // pagination: {
                //   el: '.swiper-pagination',
                // },

                navigation: {
                    nextEl: '.swiper-test-next',
                    prevEl: '.swiper-test-prev',
                },
            }
        )
    }
}
Array.from(document.querySelectorAll('.testimonialSlide_swiper:not([data-no-auto])')).forEach((el) => {
    Util.addComponent(new TestimonialSlider(el));
});