import '../libs/facebook';
import { TweenMax, Power4 } from '../libs/gsap.min';
export default class Share {
  constructor() {
    this.el = document.getElementById('share');
    this.buttonClose = document.getElementById('share-close');
    this.container = document.getElementById('share-container');
    this.bg = document.querySelector('#share .bg');
    this.customText = undefined;
    this.customHashtag = undefined;
    this.customUrl = undefined;
    this.customImage = undefined;

    Array.from(document.querySelectorAll('.share-item[data-type]')).forEach(item => {
      item.addEventListener('click', () => { this.shareByType(item.getAttribute('data-type')) });
    });
    Array.from(document.querySelectorAll('.share-button')).forEach(item => {
      item.addEventListener('click', () => { 
        let text = item.getAttribute('data-share-text');
        let hashtag = item.getAttribute('data-share-hashtag');
        let url = item.getAttribute('data-share-url');
        const image = item.getAttribute('data-share-image');
        if(text) {
          this.customText = text;
          this.el.querySelector('#share-paragraph').innerHTML = text;
        }
        if(hashtag) {
          this.customHashtag = hashtag;
          this.el.querySelector('#share-hashtag').innerHTML = hashtag;
        }
        if(url) {
          this.customUrl = url;
          this.el.querySelector('#share-url').innerHTML = url;
        }
        if(image) {
          this.customImage = image;
          this.el.querySelector('#share-image').style.backgroundImage = 'url(' + this.customImage + ')';
        }
        this.open();
      });
    });

    this.buttonClose.addEventListener('click', () => { this.close() });
    this.el.addEventListener('click', (e) => { 
      if(e.target.closest('.bg')){
        this.close();
      }
    });
    this.hide();
  }
  shareByType(type){
    let url = document.getElementById('share-url').innerText;
    let copy = document.getElementById('share-text').innerText;
    let hash = copy.match(/#[^ ]+/);
    switch (type) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${copy} ${url}`)}`,
          'sharer',
          'toolbar=0,status=0,width=580,height=480',
        );
        break;
      case 'facebook':
        FB.ui({
          method: 'share',
          hashtag: hash,
          href: url,
          quote: copy,
        });
        break;
      default:
        break;
    }
  }
  open() {
    if(this.isOpen) return;
    this.isOpen = true;
    window.scroll.pause();
    this.el.classList.add('show');
    TweenMax.fromTo(this.bg, 0.7, { opacity: 0 }, {opacity: 1, ease: Power2.easeIn});
    if(window.innerWidth <= 580){
      setTimeout(() => {
        // const h = window.innerHeight - this.container.querySelector('#share-content').getBoundingClientRect().height - 96;
        const h = this.container.querySelector('#share-content').getBoundingClientRect().width / 1.4;
        this.container.querySelector('#share-image').style.height = `${h}px`;
      }, 200); 
    }
    TweenMax.fromTo(this.container, 1, { opacity: 0 }, { opacity: 1, delay: 0.3, ease: Power2.easeIn, onComplete: () => {
      this.buttonClose.classList.add('show');
    }});
  }
  close() {
    if(!this.isOpen) return;
    this.isOpen = false;
    this.buttonClose.classList.remove('show');
    TweenMax.to(this.container, 0.5, { opacity: 0, ease: Power4.easeOut });
    TweenMax.to(this.bg, 1, { opacity: 0, delay: 0.3, ease: Power4.easeOut, onComplete: () => {
      this.hide();
      this.el.classList.remove('show');
      this.buttonClose.classList.add('show');
      window.scroll.resume();
    }});
  }
  hide() {
    TweenMax.set([this.bg, this.container], { opacity: 0, overwrite: 'all' });
  }
}