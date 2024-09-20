import gsap from 'gsap';
import Util from '../util/util';

export default class Sticky {
  constructor(el, onProgress){
    this.el = el;
    this.placeholder = this.el.querySelector('[data-scroll-sticky-placeholder]');
    this.container = this.el.querySelector('[data-scroll-sticky-container]');
    this.content = this.el.querySelector('[data-scroll-sticky-content]');
    this.main = document.getElementById('main');
    this.progress = 0;

    this.onProgress = onProgress;
    this.resize = this.resize.bind(this);
    this.scroll = this.scroll.bind(this);

    this.resize();

    window.addEventListener('resize', this.resize);
    this.main.addEventListener('scroll', this.scroll);
  }
  resize() {
    this.winH = window.innerHeight;
    this.height = this.content.getAttribute('data-scroll-sticky-height') ? Number(this.content.getAttribute('data-scroll-sticky-height')) * this.winH : this.content.scrollHeight + this.winH;
    this.heightMultiply = this.content.getAttribute('data-scroll-sticky-multiply') ? Number(this.content.getAttribute('data-scroll-sticky-multiply')) : 1;
    
    this.height *= this.heightMultiply;

    this.placeholder.style.height = `${this.height}px`;

    this.top = this.main.scrollTop + this.el.getBoundingClientRect().top;
  }
  scroll() {
    const pos = this.main.scrollTop;
    this.rTop = this.el.getBoundingClientRect().top;
    if(pos < this.top) {
      this.progress = 0;
    }
    else if(pos > this.top && pos < this.top + this.height) {
      this.progress = Math.max(Math.min(1, (pos - this.top) / (this.height - this.winH)), 0);
    }else {
      this.progress = 1;
    }
    
    this.container.style.transform = `translateY(${this.progress * (this.height - this.winH)}px)`;
    this.onProgress(this.progress);
  }
}