import Util from '../../util/util.js';

export default class ImageVariant {
    constructor(el){
        this.$el = el;
        this.slider = this.$el.querySelector('.slide-image-variant')
        this.slideThumb = this.$el.querySelector('.slider-thumbnail')
        this.category = 'Molecules';
        this.componentName = 'ImageVariant';
        const imageVariantThumb = new Swiper(this.slideThumb, {
            slidesPerView: 3,
            spaceBetween: 10,
            freeMode: true,
            watchSlidesProgress: true,
            breakpoints: {
                768: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                }
            }
        });

        const swiper2 = new Swiper(this.slider, {
            spaceBetween: 10,
            navigation: {
                nextEl: '.image-variant-lib-next',
                prevEl: '.image-variant-lib-prev',
            },
            thumbs: {
                swiper: imageVariantThumb
            }
        });
    }
}
Array.from(document.querySelectorAll('.slide-gallery-thumbnails')).forEach((el) => {
    Util.addComponent(new ImageVariant(el));
});
