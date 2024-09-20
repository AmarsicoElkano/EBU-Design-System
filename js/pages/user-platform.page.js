import Page from './page.js';

export default class Userplatform extends Page {
  constructor() {
    super({page: 'Userplatform'});
  }
  init() {
    super.init();
  }
  pageReady() {
    this.resize();
    console.log('log page ready');
  }
}
new Userplatform();