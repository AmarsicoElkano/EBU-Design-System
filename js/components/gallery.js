import Swiper from '../libs/swiper.min';

Array.from(document.querySelectorAll('.gallery')).forEach(container => {

  const thumbs = new Swiper(".thumbs .swiper-mask", {
    loop: true,
    spaceBetween: 14,
    mousewheel: false,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      640: {
        slidesPerView: 4,
      }
    }
  });
  const slideShow = new Swiper(".gallery-right .swiper", {
    loop: true,
    spaceBetween: 1,
    spaceBetween: 0,
    centerInsufficientSlides: true,
    watchSlidesProgress: true,
    navigation: {
      prevEl: '.slider-button-prev-mobile',
      nextEl: '.slider-button-next-mobile',
    },
    breakpoints: {
      640: {
        navigation: {
          prevEl: '.slider-button-prev-gallery',
          nextEl: '.slider-button-next-gallery',
        }
      }
    },
    thumbs: {
      swiper: thumbs,
    },
  });
  
  setTimeout(function(){
    slideShow.update(true);
    slideShow.slideTo(0, 0)
  }, 300);
  //comento esto AM
  // const thumbs = new Swiper(container.querySelector('.thumbs .swiper-mask'), {
  //   spaceBetween: 14,
  //   mousewheel: false,
  //   slidesPerView: 3,
  //   centerInsufficientSlides: true,
  //   watchSlidesProgress: true,
  //   breakpoints: {
  //     640: {
  //       slidesPerView: 4,
  //       navigation: {
  //         prevEl: '.slider-button-prev',
  //         nextEl: '.slider-button-next',
  //       },
  //     }
  //   },
  //   on: {
  //     slideChange: () => {
  //       swiper.slideTo(thumbs.activeIndex);
  //     }
  //   }
  // });
  //comento esto AM

  // const texts = new Swiper(container.querySelector('.gallery-left .gallery-text'), {
  //   slidesPerView: 1,
  //   spaceBetween: 0,
  //   speed: 800,
  //   autoHeight: true,
  //   breakpoints: {
  //     640: {
  //       autoHeight: false,
  //     }
  //   },
  //   on: {
  //     slideChange: () => {
  //       cambiaText();
  //     }
  //   }
  // });
  
  //comento esto AM
  // const swiper = new Swiper(container.querySelector('.gallery-right .swiper'), {
  //   slidesPerView: 1,
  //   spaceBetween: 0,
  //   speed: 800,
  //   navigation: {
  //     prevEl: '.slider-button-prev-mobile',
  //     nextEl: '.slider-button-next-mobile',
  //   },
  //   thumbs: {
  //     swiper: thumbs,
  //   },
  //comento esto AM

    // on: {
    //   slideChange: () => {
    //     texts.slideTo(swiper.activeIndex);
    //   }
    // }

    

  });
  // function cambiaText() {
  //   swiper.slideTo(texts.activeIndex);
  // }
