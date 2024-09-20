import Util from '../../util/util.js';
import Calendar from '../../libs/calendar.js';

export default class CalendarFull {
  constructor(el){
    this.$el = el;
    this.category = 'Molecules';
    this.componentName = 'Calendar';
    this.label = this.$el.getAttribute('data-label');

    this.startDate = this.$el.getAttribute('data-start-date');
    this.endDate = this.$el.getAttribute('data-end-date');
    this.isDouble = this.$el.classList.contains('double');

    
    this.$refs = {};
    this.$refs.button = this.$el.querySelector('[ref="button"]');
    this.$refs.label = this.$refs.button.querySelector('span');
    this.$refs.input = this.$refs.button.querySelector('input');
    this.$refs.next = this.$el.querySelector('[ref="next"]');
    this.$refs.prev = this.$el.querySelector('[ref="prev"]');

    this.$refs.button.addEventListener('click', this.toggle.bind(this));
    this.$refs.next.addEventListener('click', this.next.bind(this));
    this.$refs.prev.addEventListener('click', this.prev.bind(this));
    this.upateHeight = this.updateHeight.bind(this);

    this.isOpen = false;
    this.value = {
      start: null,
      end: null,
    };
    this.calendar = null;
    this.year = 2022;
    this.currentMonth = 0;
    this.startDate = null;
    this.endDate = null;
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

    this.weeks = [];
    this.currentLabel = '';

    this.init();
    this.updateHeight();
  }
  updateComputed() {
    const weeks = () => {
      if(!this.calendar) return [[]];
      return this.calendar.monthDates(this.year, this.currentMonth).map(week => {
        return week.map(day => {
          return {
            number: day.getDate(),
            date: day,
            isDisabled: day.getMonth() !== this.currentMonth,
            isStart: this.startDate && this.startDate.getDate() === day.getDate() && this.startDate.getMonth() === day.getMonth(),
            isEnd: this.endDate && this.endDate.getDate() === day.getDate() && this.endDate.getMonth() === day.getMonth(),
            isSelected: this.startDate && this.endDate && day >= this.startDate && day <= this.endDate,
          }
        });
      });
    };
    this.weeks = weeks();

    const currentLabel = () => {
      if(this.startDate && this.endDate && this.isDouble) {
        return `${this.startDate.getDate()} ${this.getMonthName(this.startDate.getMonth(), true)} - ${this.endDate.getDate()} ${this.getMonthName(this.endDate.getMonth(), true)}`;
      }
      if(this.startDate) {
        return `${this.startDate.getDate()} ${this.getMonthName(this.startDate.getMonth(), true)}`;
      }
      return this.label;
    };
    this.currentLabel = currentLabel();

    const $weeks = this.$el.querySelector('.weeks');
    $weeks.innerHTML = '';
    this.weeks.forEach((week, weekIndex) => {
      const $week = document.createElement('div');
      $week.classList.add('week');
      week.forEach((day, dayIndex) => {
        const $day = document.createElement('span');
        $day.classList.add('day');
        if(day.isDisabled) $day.classList.add('disabled');
        if(day.isToday) $day.classList.add('today');
        if(day.isStart) $day.classList.add('isStart');
        if(day.isEnd) $day.classList.add('isEnd');
        if(day.isSelected) $day.classList.add('selected');
        $day.innerHTML = day.number;
        $day.addEventListener('click', () => {
          this.select(day);
        });
        $week.appendChild($day);
      });
      $weeks.appendChild($week);
    });
  }
  init() {
    const header = this.$el.querySelector('.header');
    for(let i = 0; i < 7; i++) {
      const span = document.createElement('span');
      span.innerHTML = this.getDayName(i);
      header.appendChild(span);
    }
    this.locale = 'en-us';
    this.year = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    this.calendar = new Calendar(1);

    this.updateComputed();
    this.updateDOM();
  }
  getDayName(day) {
    const date = new Date();
    date.setDate(day - 1);
    return date.toLocaleDateString(this.locale, { weekday: 'short' });
  }
  getMonthName(month, isShort) {
    const date = new Date();
    date.setMonth(month);
    return date.toLocaleDateString(this.locale, { month: isShort ? 'short' : 'long' });
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
    if(this.onOpen && propague) this.onOpen();
    this.updateDOM();
  }
  close(propague = true) {
    this.isOpen = false;
    this.updateHeight();
    if(this.onClose && propague) this.onClose();
    this.updateDOM();
  }
  updateHeight() {
    const padding = getComputedStyle(this.$el).paddingBottom.replace('px', '');
    // this.$el.style.height = this.isOpen ? `${this.$el.scrollHeight - padding}px` : `${this.$refs.button.$el.clientHeight}px`;
  }
  select(day) {
    if(day.isDisabled) return;
    if(this.isDouble) {
      if(!this.startDate) {
        this.startDate = day.date;
        this.endDate = null;
      } else if(!this.endDate) {
        this.endDate = day.date;
        if(this.endDate < this.startDate) {
          const temp = this.endDate;
          this.endDate = this.startDate;
          this.startDate = temp;
        }
      } else {
        this.startDate = day.date;
        this.endDate = null;
      }
      this.value.start = this.startDate;
      this.value.end = this.endDate;
    }else {
      this.startDate = day.date;
      this.endDate = day.date;
      this.value.start = this.startDate;
      this.value.end = this.endDate;
    }
    if(this.onChange) {
      this.onChange({label: this.label, value: this.value});
    }
    this.updateComputed();
    this.updateDOM();
  }
  prev() {
    if(this.currentMonth === 0) {
      this.currentMonth = 11;
      this.year--;
    } else {
      this.currentMonth--;
    }
    if(this.currentMonth !== -1) {
      if(this.onChange) {
        this.onChange({label: this.label, value: this.value});
      }
    }
    this.updateComputed();
    this.updateDOM();
  }
  next() {
    if(this.currentMonth !== 11) {
      this.currentMonth++;
    }else {
      this.currentMonth = 0;
      this.year++;
    }
    if(this.currentMonth !== -1) {
      this.value = new Date(this.year, this.currentMonth, 1);
      if(this.onChange) {
        this.onChange({label: this.label, value: this.value});
      }
    }
    this.updateComputed();
    this.updateDOM();
  }
  setStartState(date) {
    const d = new Date(date);
    this.year = d.getFullYear();
    this.currentMonth = d.getMonth();
    this.value.start = d;
    this.updateComputed();
    this.updateDOM();
  }
  setEndState(date) {
    const d = new Date(date);
    this.value.end = d;
    this.updateComputed();
    this.updateDOM();
  }
  clear() {
    this.value.start = null;
    this.value.end = null;
    this.year = new Date().getFullYear();
    this.currentMonth = 0;
    this.updateComputed();
    this.updateDOM();
  }
  updateDOM() {
    this.$el.classList.toggle('open', this.isOpen);
    this.$el.querySelectorAll('.month').forEach((el, index) => {
      el.classList.toggle('active', this.currentMonth === index);
    });
    this.$el.querySelector('.year').innerHTML = this.year;
    this.$el.querySelector('.month').innerHTML = this.getMonthName(this.currentMonth);
    if(this.$refs.label){
      this.$refs.label.innerHTML = this.currentLabel;
    }else{
      if(this.startDate){
        this.$refs.input.value = `${this.startDate.getDate()}/${this.startDate.getMonth()+1}/${this.year}`
      }
    }

    this.weeks.forEach((week, weekIndex) => {
      const $week = this.$el.querySelectorAll('.week')[weekIndex];
      week.forEach((day, dayIndex) => {
        const $day = $week.querySelectorAll('.day')[dayIndex];
        if(day.isDisabled) $day.classList.add('disabled');
        if(day.isToday) $day.classList.add('today');
        if(day.isStart) $day.classList.add('isStart');
        if(day.isEnd) $day.classList.add('isEnd');
        if(day.isSelected) $day.classList.add('selected');
      });
    });
  }
}
Array.from(document.querySelectorAll('.calendar-full:not([data-no-auto])')).forEach((el) => {
  Util.addComponent(new CalendarFull(el));
});