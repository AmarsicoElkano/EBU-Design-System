import Page from './page.js';

export default class Userplatformnewsletter extends Page {
  constructor() {
    super({page: 'Userplatformnewsletter'});
  }
  init() {
    super.init();
  }
  pageReady() {
    this.resize();
    console.log('log page ready');
  }
}
new Userplatformnewsletter();