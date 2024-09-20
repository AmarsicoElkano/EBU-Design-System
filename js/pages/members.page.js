import Page from './page.js';

export default class members extends Page {
  constructor() {
    super({page: 'members'});
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
new members();