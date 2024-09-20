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
  }
}
new Topics();