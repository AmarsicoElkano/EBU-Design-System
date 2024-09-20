import Page from './page.js';

export default class Librarytemplate extends Page {
  constructor() {
    super({page: 'Librarytemplate'});
  }
  init() {
    super.init();
  }
  pageReady() {
    this.resize();
    console.log('log page ready');
  }
}
new Librarytemplate();