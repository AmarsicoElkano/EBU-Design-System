import Page from './page.js';
import Util from '../util/util.js';
import ScrollToAnchor from '../libs/scrolltoanchor.esm.js';

export default class strategy extends Page {
  constructor() {
    super({page: 'strategy'});
  }
  init() {
    super.init();
  }
  pageReady() {
    super.pageReady();
    this.resize();
    console.log('log page ready');

    var smoothScroll = new ScrollToAnchor({
      //duration: 300,
      offset: 70
    });

    document.addEventListener('scroll', this.sections);
  }
  sections(){
    const section = document.querySelectorAll('.section')
    const buttons = document.querySelectorAll('.sub-nav .btn_tab')
    section.forEach(s =>{
      if(Util.isInViewportDom(s,300)){
        console.log('si')
        Array.from(buttons).forEach(b=>{b.classList.remove('active')})
        let current = Array.from(buttons).filter(b=>b.dataset.link ==s.getAttribute('id'))
        if(current[0]){
          current[0].classList.add('active')
        }
      }
    })
  }
}
new strategy();