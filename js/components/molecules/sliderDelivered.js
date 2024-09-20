import Util from '../../util/util.js';
export default class SliderDelivered {
    constructor(el) {
        this.$el = el;
        const sliderDelivered = new Swiper(this.$el, {
            loop:true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            navigation: {
                nextEl: '.swiper-deli-next',
                prevEl: '.swiper-deli-prev',
            },
        })
    }
}
Array.from(document.querySelectorAll('.slider-delivered_swiper')).forEach((el) => {
    Util.addComponent(new SliderDelivered(el));
});
