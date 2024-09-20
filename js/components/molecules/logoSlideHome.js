import Util from '../../util/util.js';

export default class LogoSliderHome {
    constructor(el) {
        this.$el = el;
        this.category = 'Molecules';
        this.componentName = 'LogoSliderHome';
        const logoSlide = new Swiper(this.$el, {
            
                loop: true,
                slidesPerGroup:2,
                slidesPerView: 3,
                spaceBetween: 16,
                speed: 1500,

                autoplay: {
                  delay: 3000,
                  disableOnInteraction: false,
                },
                
                breakpoints: {
                    768: {
                        slidesPerGroup:4,
                        slidesPerView: 7,
                        spaceBetween: 24,
                    }
                },
            }
        )
    }
}
Array.from(document.querySelectorAll('.slider-logos-home')).forEach((el) => {
    if(el){
        Util.addComponent(new LogoSliderHome(el));
    }
});