import Util from '../../util/util.js';

export default class Dropdowns {
  constructor(el){
    this.$el = el;
    this.isOpen = false;
    this.dropdown = this.$el.querySelector('.dropdown-input')
    this.options = this.$el.querySelector('.dropdown-options')
    this.li = this.$el.querySelectorAll('.dropdown-options li')
    this.inputText = this.$el.querySelector('input[name="dropdown"]')
    this.dropdown.addEventListener('click', () => this.toggle())
    this.li.forEach(n => n.addEventListener('click', ()=>this.selectItem(n.innerHTML)));
  }
  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.open();
    } else {
      this.close();
    }
  }
  open() {
    this.isOpen = true;
    this.dropdown.classList.add('open')
    this.options.setAttribute('data-view', 'open')
  }
  close() {
    this.isOpen = false;
    this.dropdown.classList.remove('open')
    this.options.setAttribute('data-view', 'close')
  }
  selectItem(t){
    this.inputText.value = t
  }
}