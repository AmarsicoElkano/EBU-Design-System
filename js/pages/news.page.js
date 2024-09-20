import Page from './page.js';

export default class News extends Page {
  constructor() {
    super({page: 'News'});
  }
  init() {
    super.init();
  }
  pageReady() {
    this.resize();
    console.log('log page ready');
  }
}
new News();