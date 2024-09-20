import Page from './page.js';

export default class Enteruserpage extends Page {
  constructor() {
    super({page: 'Enteruserpage'});
  }
  init() {
    super.init();
  }
  pageReady() {
    this.resize();
    console.log('log page ready');
  }
}
new Enteruserpage();