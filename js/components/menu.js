import gsap from 'gsap';
import Util from '../util/util';

export default class Menu {
  constructor(){
    this.el = document.getElementById('menu');
    this.button = document.getElementById('menu-toggle');
    this.navBar = document.getElementById('nav');
    this.bg = document.querySelector('#menu-bg');
    this.button.addEventListener('click', () => { this.toggle() });
    this.items = Array.from(this.el.querySelectorAll('.menu-item small, .menu-item h5, #menu-footer, #element-mobile'));
    this.overlay = document.getElementById('overlay');
    
    Array.from(document.querySelectorAll(`[data-lang="${Util.getLang()}"]`)).forEach(item => {
      item.classList.add('active');
    });
    Array.from(this.el.querySelectorAll('.menu-item')).forEach(item => {
      item.addEventListener('click', (e) => {
        const URL = item.href.split('#')[0];
        const hash = item.href.split('#')[1];
        if(hash && URL === window.location.href.replace('#', '')) {
          e.preventDefault();
          if(item.getAttribute('data-start-gallery') === null) {
            e.stopImmediatePropagation();
            e.stopPropagation();
          }
          this.overlay.classList.remove('show');
          window.scroll.goTo(`#${hash}`);
          this.close();
        }
      });
    });
    
    this.hide();
  }
  toggle(){
    if(this.isOpen) this.close();
    else this.open();
  }
  open(){
    if(this.isOpen) return;
    window.scroll.pause();
    this.isOpen = true;
    this.button.classList.add('close');
    this.navBar.classList.add('menu-open');
    this.el.classList.add('show');
    gsap.to(this.bg, {duration: 1, opacity: 1, ease: 'Power4.easeIn'});
    let delay = 0.2;
    const areHidden = this.items.every(item => !Util.isInViewportDom(item));
    this.items.forEach((item) => {
      if(areHidden) gsap.fromTo(item, {y: window.innerHeight, opacity: 0}, {duration: 2, y: 0, opacity: 1, delay: delay, ease: 'Power4.easeInOut'});
      else gsap.to(item, {duration: 2, y: 0, opacity: 1, delay: delay, ease: 'Power4.easeInOut'});
      delay += 0.02;
    });
  }
  close(){
    if(!this.isOpen) return;
    gsap.killTweensOf([
      ...this.items,
      this.bg,
    ])
    this.isOpen = false;
    let delay = 0;
    this.items.forEach((item) => {
      gsap.to(item, {duration: 1, y: -window.innerHeight, opacity: 0, delay: delay, ease: 'Power4.easeInOut'});
      delay += 0.02;
    });

    gsap.to(this.bg, {duration: 1, opacity: 0, delay: 0.2, ease: 'Power4.easeInOut', onComplete: () => {
      this.navBar.classList.remove('menu-open');
      this.button.classList.remove('close');
      window.scroll.play();
    }});
    this.el.classList.remove('show');
  }
  hide(){
    gsap.set(this.items, {opacity: 0, y: window.innerHeight});
    gsap.set(this.bg, {opacity: 0});
  }
}