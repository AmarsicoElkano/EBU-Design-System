import Util from '../../util/util.js';

export default class DropdownList {
  constructor(el){
    this.$el = el;
    this.category = 'Molecules';
    this.componentName = 'DropdownList';
    this.isOpen = false;
    this.values = [];
    this.label = this.$el.getAttribute('data-label');
    this.items = Array.from(this.$el.querySelectorAll('button')).map(el => {
      const component = Util.getComponent(el);
      component.onClick = this.change.bind(this);
      return {
        label: el.innerText.trim(),
        value: el.getAttribute('data-value'),
        checked: el.classList.contains('active')
      }
    });
    this.$refs = {};
    this.$refs.button = Util.getComponent(this.$el.querySelector('.dropdown-button'));
    this.$refs.button.onClick = this.toggle.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    this.updateClasses = this.updateClasses.bind(this);
    this.updateHeight();
  }
  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.open();
    } else {
      this.close();
    }
  }
  open(propague = true) {
    this.isOpen = true;
    this.updateHeight();
    if(!propague) this.$refs.button.open(false);
    if(this.onOpen && propague) this.onOpen();
    this.updateClasses();
  }
  close(propague = true) {
    this.isOpen = false;
    this.updateHeight();
    if(!propague) this.$refs.button.close(false);
    if(this.onClose && propague) this.onClose();
    this.updateClasses();
  }
  updateHeight() {
    const padding = getComputedStyle(this.$el).paddingBottom.replace('px', '');
    this.$el.style.height = this.isOpen ? `${this.$el.scrollHeight - padding}px` : `${this.$refs.button.$el.clientHeight}px`;
  }
  change(e) {
    if(e.checked) {
      this.values.push(e.value);
    } else {
      this.values.splice(this.values.indexOf(e.value), 1);
    }
    if(this.onChange) {
      this.onChange({label: this.label, value: this.values.join(',')});
    }
  }
  setState(items) {
    if(this.$refs.checkButton) {
      this.$refs.checkButton.forEach(button => {
        button.setState(items.find(item => item.value === button.value).checked);
      });
    }
  }
  clear() {
    this.values = [];
    if(this.$refs.checkButton) {
      this.$refs.checkButton.forEach(button => {
        button.setState(false);
      });
    }
  }
  updateClasses() {
    this.$el.classList.toggle('open', this.isOpen);
  }
}
Array.from(document.querySelectorAll('.dropdown-list:not([data-no-auto])')).forEach((el) => {
  Util.addComponent(new DropdownList(el));
});