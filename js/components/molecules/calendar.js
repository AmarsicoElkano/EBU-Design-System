import Util from '../../util/util.js';

export default class Calendar {
  constructor(el){
    this.$el = el;
    this.category = 'Molecules';
    this.componentName = 'Calendar';
    this.label = this.$el.getAttribute('data-label');
    
    this.$refs = {};
    this.$refs.button = Util.getComponent(this.$el.querySelector('.dropdown-button'));
    this.$refs.next = this.$el.querySelector('[ref="next"]');
    this.$refs.prev = this.$el.querySelector('[ref="prev"]');
    this.$refs.button.onClick = this.toggle.bind(this);
    this.$refs.next.addEventListener('click', this.next.bind(this));
    this.$refs.prev.addEventListener('click', this.prev.bind(this));
    this.upateHeight = this.updateHeight.bind(this);

    this.isOpen = false;
    this.value = null;
    this.year = 2022;
    this.currentMonth = -1;
    this.months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    this.year = new Date().getFullYear();
    this.initMonths();
    this.updateHeight();
  }
  initMonths() {
    this.months.forEach((item, index) => {
      const span = document.createElement('span');
      span.classList.add('month');
      span.innerHTML = item;
      span.addEventListener('click', () => {
        this.select(index);
      });
      this.$el.querySelector('.months').appendChild(span);
    });
    this.updateDOM();
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
    this.updateDOM();
  }
  close(propague = true) {
    this.isOpen = false;
    this.updateHeight();
    if(!propague) this.$refs.button.close(false);
    if(this.onClose && propague) this.onClose();
    this.updateDOM();
  }
  updateHeight() {
    const padding = getComputedStyle(this.$el).paddingBottom.replace('px', '');
    this.$el.style.height = this.isOpen ? `${this.$el.scrollHeight - padding}px` : `${this.$refs.button.$el.clientHeight}px`;
  }
  select(index) {
    this.currentMonth = index;
    this.value = new Date(this.year, index, 1);
    if(this.onChange) {
      this.onChange({label: this.label, value: this.value.toLocaleDateString()});
    }
    this.updateDOM();
  }
  prev() {
    this.year--;
    if(this.currentMonth !== -1) {
      this.value = new Date(this.year, this.currentMonth, 1);
      if(this.onChange) {
        this.onChange({label: this.label, value: this.value.toLocaleDateString()});
      }
    }
    this.updateDOM();
  }
  next() {
    this.year++;
    if(this.currentMonth !== -1) {
      this.value = new Date(this.year, this.currentMonth, 1);
      if(this.onChange) {
        this.onChange({label: this.label, value: this.value.toLocaleDateString()});
      }
    }
    this.updateDOM();
  }
  setState(date) {
    const d = new Date(date);
    this.year = d.getFullYear();
    this.currentMonth = d.getMonth();
    this.value = d;
    this.updateDOM();
  }
  clear() {
    this.value = null;
    this.year = new Date().getFullYear();
    this.currentMonth = -1;
    this.updateDOM();
  }
  updateDOM() {
    this.$el.classList.toggle('open', this.isOpen);
    this.$el.querySelectorAll('.month').forEach((el, index) => {
      el.classList.toggle('active', this.currentMonth === index);
    });
    this.$el.querySelector('.year').innerHTML = this.year;
  }
}
Array.from(document.querySelectorAll('.calendar:not([data-no-auto])')).forEach((el) => {
  Util.addComponent(new Calendar(el));
});