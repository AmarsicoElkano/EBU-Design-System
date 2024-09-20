import Page from './page.js';

export default class Library extends Page {
  constructor() {
    super({page: 'Library'});
  }
  init() {
    super.init();
  }
  pageReady() {
    this.resize();
    console.log('log page ready');
  }
}
new Library();