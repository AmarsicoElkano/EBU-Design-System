import Util from '../../util/util.js';
export default class VideoSlider {
    constructor(el) {
        this.$el = el;
        this.category = 'Molecules';
        this.componentName = 'VideoSlider';
        const videoSlider = new Swiper(this.$el, {
            slidesPerView: 1.5,
            spaceBetween: 20,
            loop: true,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                }
            },

            navigation: {
                nextEl: '.button-video-next',
                prevEl: '.button-video-prev',
            },

            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
            }
        )
    }
}
Array.from(document.querySelectorAll('.videoSlide_swiper:not([data-no-auto])')).forEach((el) => {
    Util.addComponent(new VideoSlider(el));
});