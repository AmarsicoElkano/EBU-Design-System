import Page from './page.js';

export default class {{nameCapitalized}} extends Page {
  constructor() {
    super({page: '{{nameCapitalized}}'});
  }
  init() {
    super.init();
  }
  pageReady() {
    this.resize();
    console.log('log page ready');
  }
}
new {{nameCapitalized}}();