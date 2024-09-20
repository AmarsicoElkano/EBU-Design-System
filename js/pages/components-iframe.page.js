import Page from './page.js';

export default class ComponentsIframe extends Page {
  constructor() {
    super({page: 'components-iframe'});
  }
  init() {
    super.init();
    this.sortComponents();
  }
  pageReady() {
    this.resize();
    console.log('log page ready');
  }
  sortComponents() {
    const categories = Array.from(document.querySelectorAll('.category-container'));
    categories.forEach(category => {
      const components = Array.from(category.querySelectorAll('.component-container'));
      components.sort((a, b) => {
        const aName = a.getAttribute('id');
        const bName = b.getAttribute('id');
        return aName.localeCompare(bName);
      });
      components.forEach(component => {
        category.appendChild(component);
      });
    });
  }
}
new ComponentsIframe();