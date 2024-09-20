import Util from "../util/util";

export default class Loading {
  constructor(){
    this.el = document.getElementById('loading');
    this.bg = document.querySelector('#loading-bg');
    this.number = document.querySelector('#loading-number');
    this.done = false;
    this.progress = this.progress.bind(this);

    this.event = new CustomEvent('customload');
    this.isMobile = window.innerWidth < 970;

    this.hideItems()

    this.loadImages(() => {
      this.done = true
      if(this.number) this.number.innerHTML = `100%`;
      this.close();
    }, this.progress);

    setTimeout(() => {
      if(!this.done) this.open();
    }, 3000)
  }
  setImages() {
    if (this.isMobile) {
      Array.from(document.querySelectorAll('img[data-responsive-src]')).forEach(image => {
        let src = image.src;
        image.src = src.replace(/\.jpg|\.webp/, ext => '-m' + ext);
      });
      Array.from(document.querySelectorAll('[data-bg-img][data-responsive-src]')).forEach(image => {
        let src = image.getAttribute('data-bg-img');
        image.setAttribute('data-bg-img', src.replace(/\.jpg|\.webp/, ext => '-m' + ext));
      });
    }
    Array.from(document.querySelectorAll('img[data-src]')).forEach(img => {
      img.src = img.dataset.src;
    });
    Array.from(document.querySelectorAll('[data-bg-img]')).forEach(item => {
      item.style.backgroundImage = `url('${item.getAttribute('data-bg-img')}')`;
    });
  }
  loadImages(callback, progress) {
    this.setImages();
    let images = Array.from(document.querySelectorAll('img:not([loading="lazy"])'));
    let done = false;
    function loadedL() {
      return images.filter(image => image.complete).length;
    }
    if(loadedL() === images.length) {
      done = true;
      callback();
    }
    else{
      images.forEach(image => {
        image.addEventListener('load', () => {
          if(progress)progress(loadedL() / images.length)
          if(!done && loadedL() === images.length) {
            done = true;
            callback();
          }
        });
      })
    }
    setTimeout(() => {
      if(!done) {
        done = true;
        callback();
      }
    }, 300);
  }
  progress(prc) {
    if(this.number) this.number.innerHTML = `${Math.ceil(prc * 100)}%`;
  }
  open(){
    this.isOpen = true;
    if(this.number) this.number.style.opacity = 1;
  }
  close(){
    const hash = window.location.hash.substring(1);
    Util.waitForFont('Cormorant', () => {
      Util.waitForFont('Inter', () => {
        setTimeout(() => {
          this.isOpen = false;
          if(hash === 'gallery') {
            setTimeout(() => {
              this.el.classList.add('hide');
              this.bg.style.opacity = 0;
              if(this.number) this.number.style.opacity = 0;
            }, 500);
          }else{
            this.el.classList.add('hide');
            if(this.bg){
              this.bg.style.opacity = 0;
            }
            if(this.number) this.number.style.opacity = 0;
          }
          document.documentElement.setAttribute('data-custom-loaded', true);
          window.dispatchEvent(this.event);
        }, 500);
      });
    });
  }
  hideItems(){
    this.el.classList.add('no-transition');
    if(this.number) this.number.style.opacity = 0;
    setTimeout(() => {
      this.el.classList.remove('no-transition');
    }, 500);
  }
}
const loading = new Loading();