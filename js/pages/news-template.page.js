import Page from './page.js';

export default class Newstemplate extends Page {
  constructor() {
    super({page: 'Newstemplate'});
    
  }
  init() {
    super.init();


    const btPopup = document.querySelector('#btpopup')
    const popUp = document.querySelector('#popupcont')
    const btClosePopup = popUp.querySelector('.btClose')

    btPopup.addEventListener('click', () => this.openPopup(popUp))
    btClosePopup.addEventListener('click', () => this.closePopup(popUp))
  }
  pageReady() {
    this.resize();
    console.log('log page ready');
  }
  openPopup(p){p.classList.remove('hiden');}
  closePopup(p){p.classList.add('hiden')}
}
new Newstemplate();