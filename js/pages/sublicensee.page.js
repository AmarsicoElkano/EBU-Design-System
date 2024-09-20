import Page from './page.js';

export default class sublicensee extends Page {
  constructor() {
    super({page: 'sublicensee'});
  }
  init() {
    super.init();
  }
  pageReady() {
    super.pageReady();
    this.resize();
    console.log('log page ready');
  }
}
new sublicensee();