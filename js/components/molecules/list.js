import Util from '../../util/util.js';

export default class List {
  constructor(el){
    this.$el = el;
    this.category = 'Molecules';
    this.componentName = 'List';
    Array.from(this.$el.querySelectorAll('ul .item')).forEach(item => {
      const itemTop = item.querySelector('.item-top');
      if(itemTop) {
        itemTop.addEventListener('click', () => {
          item.classList.toggle('open');
        });
      }
    });
  }
}
Array.from(document.querySelectorAll('.list:not([data-no-auto])')).forEach((el) => {
  Util.addComponent(new List(el));
});