import Page from './page.js';

export default class Userplatformmydetails extends Page {
  constructor() {
    super({page: 'Userplatformmydetails'});
  }
  init() {
    super.init();
  }
  pageReady() {
    this.resize();
    console.log('log page ready');
  }
}
new Userplatformmydetails();