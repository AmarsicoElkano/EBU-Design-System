import gsap from 'gsap';
import Util from '../util/util';
export default class ScrollCtrl {
  constructor(paralax){
    this.data = {t: 0, c: 0};
    this.page = document.getElementById('page');
    this.scrollingElement = document.getElementById('main');
    this.tween = null;
    this.paralax = paralax;
    var hash = location.hash;

    this.scrollingElement.scrollTop = 0;
    this.isIE = Util.testBrowser('ie');
    if (hash && hash !== '') {
      location.hash = '';
      this.goTo(hash, 0.6);
    }
    window.addEventListener('wheel', (e) => { this.handleWheel(e) });
    document.addEventListener('touchmove', (e) => { this.handleTouch(e) }, { passive: false });
    this.scrollingElement.addEventListener('scroll', (e) => { this.handleScroll(e) });
    this.render();
  }
  handleScroll() {
    var max = page.scrollHeight - window.innerHeight;
    var pos = this.scrollingElement.scrollTop;
    this.data.t = Util.round(pos / max);
  }
  handleWheel() {
    if (this.tween) this.tween.kill();
  }
  handleTouch() {
    if (this.tween) this.tween.kill();
  }
  render () {
    this.data.c += (this.data.t - this.data.c) * 0.12;
    const final = Util.round(this.data.c);
    if(final !== this.data.t){
      if(this.paralax)
        this.paralax(final);
    }
    requestAnimationFrame(() => this.render());
  }
  goTo(id, delay) {
    const section = Util.isElement(id) ? id : document.querySelector(id);
    if (section) {
      this.waitForAssets(() => {
        const pos = section.offsetTop + section.offsetParent.offsetTop;
        this.tween = gsap.to(this.scrollingElement,{
          duration: 2,
          scrollTop: pos,
          delay: delay ? delay : 0,
          overwrite: 'false',
          ease: 'Power2.easeInOut',
          onComplete: () => {
            this.handleScroll();
          }
        });
      });
    }
  }
  waitForAssets(cb) {
    let done = false;
    if(document.readyState === 'complete') {
      done = true;
      cb();
    } else {
      document.addEventListener('readystatechange', () => {
        if(!done && document.readyState === 'complete') {
          done = true;
          cb();
        }
      });
    }
  }
}