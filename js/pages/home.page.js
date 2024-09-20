import Page from './page.js';

export default class Home extends Page {
  constructor() {
    super({page: 'home'});
  }
  init() {
    super.init();
  }
  pageReady() {
    this.resize();
    console.log('log page ready');
  }
}
new Home();