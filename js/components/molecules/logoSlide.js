import Util from '../../util/util.js';

export default class LogoSlide {
    constructor(el) {
        this.$el = el;
        this.category = 'Molecules';
        this.componentName = 'LogoSlide';
        const logoSlide = new Swiper(this.$el, {
            
                loop: true,

                slidesPerView: 3,
                spaceBetween: 16,
                speed: 1000,
                
                breakpoints: {
                    768: {
                        slidesPerView: 8,
                        spaceBetween: 24,
                    }
                },

                navigation: {
                    nextEl: '.slidelogos-next',
                    prevEl: '.slidelogos-prev',
                }
            }
        )
    }
}
Array.from(document.querySelectorAll('.slidelogos_swiper')).forEach((el) => {
    if(el){
        Util.addComponent(new LogoSlide(el));
    }
});