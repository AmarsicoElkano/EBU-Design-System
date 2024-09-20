import Util from '../../util/util.js';

export default class HeaderMain {
  constructor(el){
    this.$el = el;
    this.category = 'Organisms';
    this.componentName = 'HeaderMain';
    this.openOnHover = this.$el.classList.contains('open-on-hover');
    this.$bg = this.$el.querySelector('.header-main-bg');
    this.$toggle = this.$el.querySelector('.header-main-toggle');
    this.$itemsWithSubmenu = Array.from(this.$el.querySelectorAll('.header-main-item')).filter(el => {
      return el.querySelector('.sub-menu-container');
    });
    this.$accountButton = this.$el.querySelector('.header-main-account-button');
    this.$accountItems = this.$el.querySelector('.header-main-account-items');

    this.$languageButton = this.$el.querySelector('.header-main-language-button');
    this.$languageItems = this.$el.querySelector('.header-main-language-items');


    this.subMenu =  this.$el.querySelectorAll('.sub-menu-container')

    this.subMenu.forEach(sb=>{
      sb.addEventListener('click',e=>{
        e.stopPropagation();

      })
    })

    this.$itemsWithSubmenu.forEach(el => {
      if(this.openOnHover && !Util.isTouch()) {
        el.addEventListener('mouseenter', (e) => {
          this.$bg.classList.remove('white')
          this.$itemsWithSubmenu.forEach(other => {
            other.classList.remove('opened');
          });
          if(this.$accountItems)
            this.$accountItems.classList.remove('opened');
          if(this.$languageItems)
            this.$languageItems.classList.remove('opened');
          el.classList.add('opened');
          const height = el.querySelector('.sub-menu-container').offsetHeight + 32 * 2;
          this.$bg.style.height = `${height}px`;
        });
        const close = () => {
          this.$itemsWithSubmenu.forEach(other => {
            other.classList.remove('opened');
          });
          if(this.$accountItems)
            this.$accountItems.classList.remove('opened');
          if(this.$languageItems)
            this.$languageItems.classList.remove('opened');
          this.$bg.style.height = `0px`;
        }
        this.$el.addEventListener('mouseleave', (e) => {
          close();
        });
        this.$el.addEventListener('mousemove', (e) => {
          const $right = this.$el.querySelector('.header-main-right');
          let isRight = e.clientX > $right.getBoundingClientRect().left - window.innerWidth * 0.05;
          if(
            (!isRight && (!e.target.closest('.sub-menu-container') && !e.target.closest('.header-main-bg'))) ||
            (e.target.closest('.header-main-item') && !e.target.closest('.header-main-item').querySelector('.sub-menu-container'))
          ) {
            close();
          }
        });
      }else {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          el.classList.toggle('opened');
          const height = el.classList.contains('opened') ? el.querySelector('.sub-menu-container').offsetHeight + 32 * 2 : 0;
          this.$bg.style.height = `${height}px`;
          this.$itemsWithSubmenu.forEach(other => {
            if(other !== el) {
              other.classList.remove('opened');
            }
          });
          if(this.$accountItems)
            this.$accountItems.classList.remove('opened');
        });
      }
    });
    if(this.$accountButton && this.$accountItems) {
      this.$accountButton.addEventListener('click', (e) => {
        this.$bg.classList.remove('white')
        e.preventDefault();
        e.stopPropagation();
        this.$accountItems.classList.toggle('opened');
        this.$itemsWithSubmenu.forEach(other => {
          other.classList.remove('opened');
        });
        if(this.$accountItems.classList.contains('opened')) {
          const height = this.$accountItems.offsetHeight + 32 * 2;
          this.$bg.style.height = `${height}px`;
        }else {
          this.$bg.style.height = `0px`;
        }
      });
    }
    if(this.$languageButton && this.$languageItems) {
      this.$languageButton.addEventListener('click', (e) => {       
        e.preventDefault();
        e.stopPropagation();
        this.$languageItems.classList.toggle('opened');
        this.$itemsWithSubmenu.forEach(other => {
          other.classList.remove('opened');
        });
        if(this.$languageItems.classList.contains('opened')) {
          const height = this.$languageItems.offsetHeight + 32 * 2;
          this.$bg.classList.add('white')
          this.$bg.style.height = `${height}px`;
        }else {
          this.$bg.style.height = `0px`;
          this.$bg.classList.remove('white')
        }
      });
    }
    if(this.$toggle) {
      this.$toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.$el.classList.toggle('opened');

        this.$bg.style.height = `0px`;
      });
    }
    // this.$el.querySelector('.header-main-search-button').addEventListener('click', (e) => {
    //   if(!this.$el.classList.contains('search-opened')) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     this.$el.classList.add('search-opened');
    //   }
    // });
    // this.$el.querySelector('.header-main-search-close').addEventListener('click', (e) => {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   this.$el.classList.remove('search-opened');
    // });
  }
}
Array.from(document.querySelectorAll('.header-main:not([data-no-auto])')).forEach((el) => {
  Util.addComponent(new HeaderMain(el));
});