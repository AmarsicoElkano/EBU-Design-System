import Page from './page.js';

export default class Gallery extends Page {
  constructor() {
    super({page: 'Gallery'});
  }
  init() {
    super.init();
  }
  pageReady() {
    this.initTree();
    this.resize();
    console.log('log page ready');
  }
  initTree() {
    const $aside = document.querySelector('#aside');
    const $toggle = document.querySelector('#aside-toggle');
    const $tree = document.querySelector('#tree');
    const $iframe = document.querySelector('iframe#components');
    const onLoad = () => {
      const $components = $iframe.contentDocument.documentElement;
      const categories = [
        {label: 'Atoms', items: Array.from($components.querySelectorAll('#Atoms .component-container')).map($item => ({label: $item.getAttribute('id').replace('#', '')}))},
        {label: 'Molecules', items: Array.from($components.querySelectorAll('#Molecules .component-container')).map($item => ({label: $item.getAttribute('id').replace('#', '')}))},
        {label: 'Organisms', items: Array.from($components.querySelectorAll('#Organisms .component-container')).map($item => ({label: $item.getAttribute('id').replace('#', '')}))},
      ];
      categories.forEach(category => {
        const $category = document.createElement('li');
        $category.classList.add('category');
        $category.innerHTML = `
          <div class="category-header">
            <strong>${category.label}</strong>
          </div>
          <ul class="category-items"></ul>
        `;
        const $items = $category.querySelector('.category-items');
        category.items.forEach(item => {
          const $item = document.createElement('li');
          $item.classList.add('category-item');
          $item.innerHTML = `
            <a href="#${item.label}" class="item">${item.label}</a>
          `;
          $items.appendChild($item);
        });
        $tree.appendChild($category);
      });
      $tree.querySelectorAll('a').forEach($link => {
        $link.addEventListener('click', event => {
          event.preventDefault();
          const $item = $iframe.contentDocument.documentElement.querySelector(`#${$link.getAttribute('href').substr(1)}`);
          if ($item) {
            $item.scrollIntoView({behavior: 'smooth'});
            $item.classList.add('highlight');
            setTimeout(() => {
              $item.classList.remove('highlight');
            }, 3000);
          }
        });
      });
    };
    $iframe.addEventListener('load', onLoad);
    if ($iframe.contentDocument.readyState === 'complete') {
      onLoad();
    }
    $toggle.addEventListener('click', () => {
      $aside.classList.toggle('show');
    });
  }
}
new Gallery();