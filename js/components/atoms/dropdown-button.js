import Util from '../../util/util.js';

export default class DropdownButton {
  constructor(el){
    this.$el = el;
    this.category = 'Atoms';
    this.componentName = 'DropdownButton';
    this.defaultState = this.$el.classList.contains('active');
    this.isActive = this.defaultState;
    this.$el.addEventListener('click', this.toggle.bind(this));
  }
  toggle() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.open();
    } else {
      this.close();
    }
  }
  open(propague = true) {
    this.isActive = true;
    this.updateClasses();
    if (this.onClick && propague) {
      this.onClick(this.isActive);
    }
  }
  close(propague = true) {
    this.isActive = false;
    this.updateClasses();
    if (this.onClick && propague) {
      this.onClick(this.isActive);
    }
  }
  updateClasses() {
    this.$el.classList.toggle('active', this.isActive);
  }
}
Array.from(document.querySelectorAll('.dropdown-button:not([data-no-auto])')).forEach((el) => {
  Util.addComponent(new DropdownButton(el));
});