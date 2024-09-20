import Util from '../../util/util.js';
export default class SliderStructure {
    constructor(el) {
        this.$el = el;
        this.category = 'Molecules';
        this.componentName = 'SliderStructure';
        const sliderStructure = new Swiper(this.$el, {
            slidesPerView: 1,
            spaceBetween: 0,
            grid: {
                rows: 1
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints:{
                768:{
                    slidesPerView: 2,
                    spaceBetween: 10,
                    grid: {
                        rows: 1
                    }

                },
                1000:{
                    slidesPerView: 7,
                    spaceBetween: 30,
                    grid: {
                        rows: 2
                    },
                },
            },
            on: {
                resize() {
                    console.log(sliderStructure)
                    sliderStructure.slidesPerView = 1
                }
            }
        })
    }
}
Array.from(document.querySelectorAll('.slider-structure_swiper:not([data-no-auto])')).forEach((el) => {
    Util.addComponent(new SliderStructure(el));
});
