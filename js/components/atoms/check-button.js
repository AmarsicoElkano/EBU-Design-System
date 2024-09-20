import Util from '../../util/util.js';

export default class CheckButton {
  constructor(el){
    this.$el = el;
    this.category = 'Atoms';
    this.componentName = 'CheckButton';
    this.label = this.$el.getAttribute('data-label') || this.$el.innerText.trim();
    this.value = this.$el.getAttribute('data-value');
    this.defaultState = this.$el.classList.contains('active');
    this.isActive = this.defaultState;
    this.$el.addEventListener('click', this.toggle.bind(this));
  }
  toggle() {
    this.setState(!this.isActive);
    if (this.onClick) {
      this.onClick({label: this.label, value: this.value, checked: this.isActive});
    }
  }
  setState(state) {
    this.isActive = state;
    this.updateClasses();
  }
  updateClasses() {
    this.$el.classList.toggle('active', this.isActive);
  }
}
Array.from(document.querySelectorAll('.check-button:not([data-no-auto])')).forEach((el) => {
  Util.addComponent(new CheckButton(el));
});