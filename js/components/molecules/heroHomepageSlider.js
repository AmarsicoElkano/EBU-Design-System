import Util from '../../util/util.js';

export default class LibrarySlider {
    constructor(el) {
        this.$el = el;
        this.category = 'Molecules';
        this.componentName = 'LibrarySlider';
        const swiperHeroHome =  new Swiper(this.$el, {
            loop: false,
            slidesPerView: 1,
            spaceBetween: 10,
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                }
            },
            
            navigation: {
                nextEl: '.swiper-heroHome-next',
                prevEl: '.swiper-heroHome-prev',
            },
        });
    }
}
Array.from(document.querySelectorAll('.swiperHero.small')).forEach((el) => {
    Util.addComponent(new LibrarySlider(el));
});