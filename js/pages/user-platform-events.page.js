import Page from './page.js';

export default class Userplatformevents extends Page {
  constructor() {
    super({page: 'Userplatformevents'});
  }
  init() {
    super.init();
  }
  pageReady() {
    this.resize();
    console.log('log page ready');
  }
}
new Userplatformevents();