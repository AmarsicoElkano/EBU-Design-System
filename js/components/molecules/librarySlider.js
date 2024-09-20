import Util from '../../util/util.js';

export default class LibrarySlider {
    constructor(el) {
        this.$el = el;
        this.category = 'Molecules';
        this.componentName = 'LibrarySlider';
        const swiperLibrary =  new Swiper(this.$el, {
            loop: false,
            navigation: {
                nextEl: '.swiper-lib-next',
                prevEl: '.swiper-lib-prev',
            },
        });
    }
}
Array.from(document.querySelectorAll('.librarySlide_swiper:not([data-no-auto])')).forEach((el) => {
    Util.addComponent(new LibrarySlider(el));
});
