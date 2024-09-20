import Page from './page.js';

export default class Topics extends Page {
  constructor() {
    super({page: 'Topics'});
  }
  init() {
    super.init();
  }
  pageReady() {
    this.resize();
    console.log('log page ready');
    this.changeTabs();
  }
  changeTabs(){
    const btn = document.querySelectorAll('.content_tabs button')
    const tabs = document.querySelectorAll('.tabs-contact_content')
    btn.forEach(b => b.addEventListener('click', ()=>{
      let id = b.dataset.ref
      tabs.forEach(t => t.classList.remove('active'))
      document.querySelector('.tabs-contact_content#'+id).classList.add('active')
    }))
  }
}
new Topics();