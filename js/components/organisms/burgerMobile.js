import Util from '../../util/util.js';

export default class BurgerMobile {
  constructor(el){
    this.$el = el;
    this.category = 'Organisms';
    this.componentName = 'BurgerMobile';
    this.$menu = document.querySelector('.sub-menu-container-mobile');
    this.$subMenu = document.querySelectorAll('.sub-menu-column-mobile')
    
    if(this.$el){
      this.$el.addEventListener('click', ()=>{
        this.$el.classList.toggle('open')
        this.$menu.classList.toggle('open')
      })
    }
    this.$subMenu.forEach( sb =>{
      sb.addEventListener('click', ()=>{
        if(sb.querySelector('.dropdown')){
          sb.classList.toggle('open')
        }
      })
    })

  }
}
const burger = document.querySelector('.header-main-search-burger')
new BurgerMobile(burger)