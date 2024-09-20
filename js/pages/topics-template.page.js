import Page from './page.js';

export default class Topicstemplate extends Page {
  constructor() {
    super({page: 'Topicstemplate'});
  }
  init() {
    super.init();
  }
  pageReady() {
    this.resize();
    console.log('log page ready');
  }
}
new Topicstemplate();