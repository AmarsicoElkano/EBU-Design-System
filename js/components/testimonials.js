import Swiper from '../libs/swiper.min';

Array.from(document.querySelectorAll('.testimonials')).forEach(container => {
  const swiper = new Swiper(container.querySelector('.testimonials-mask'), {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 800,
    navigation: {
      prevEl: '.slider-button-prev',
      nextEl: '.slider-button-next',
    },
  });
});