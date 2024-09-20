import Page from './page.js';

export default class Userplatformmygroups extends Page {
  constructor() {
    super({page: 'Userplatformmygroups'});
  }
  init() {
    super.init();
  }
  pageReady() {
    this.resize();
    console.log('log page ready');
  }
}
new Userplatformmygroups();