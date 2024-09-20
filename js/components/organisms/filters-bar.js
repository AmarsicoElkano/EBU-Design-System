import Util from '../../util/util.js';

export default class FiltersBar {
  constructor(el){
    this.$el = el;
    this.category = 'Organisms';
    this.componentName = 'Filters';
    this.isOpen = false;
    this.isOpenTags = false;
    this.items = [];
    this.tagsParsed = [];
    this.filters = [];
    this.meanwhile = [];
    this.isMobile = false;
    this.$refs = {};
    this.resize = this.resize.bind(this);
    
    this.resize();
    this.$refs.button = Util.getComponent(this.$el.querySelector('[ref="toggleButton"]'));
    this.$refs.control = Array.from(this.$el.querySelectorAll(`.${this.isMobile ? 'mobile-filters' : 'desktop'} .control`)).map(el => {
      return Util.getComponent(el);
    });
    this.$refs.count = this.$el.querySelector('.count strong');
    this.$refs.apply = this.$el.querySelector('.apply');
    this.$refs.clear = this.$el.querySelector('.clear');
    this.$refs.close = this.$el.querySelector('.close');
    this.$refs.mobileTags = this.$el.querySelector('.mobile-tags');
    this.$refs.mobileTagsButton = this.$el.querySelector('.mobile-tags-button');
    
    this.change = this.change.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.initData();
    this.initEvents();
  }
  initData() {
    Array.from(this.$el.querySelectorAll('.desktop .tag-container')).forEach(tag => {
      const label = tag.getAttribute('data-label');
      const value = tag.getAttribute('data-value');
      const items = Array.from(tag.querySelectorAll('.tag-items button')).map(item => {
        return {
          label: item.innerText.trim(),
          value: item.getAttribute('data-value')
        }
      });
      this.tagsParsed.push({
        label,
        value,
        checked: false,
        items
      });
    });
    Array.from(this.$el.querySelectorAll('.desktop .controls > .control')).forEach(el => {
      const item = {
        label: el.getAttribute('data-label'),
        type: el.classList.contains('list') ? 'list' : 'calendar'
      };
      if(item.type === 'list') {
        const items = Array.from(el.querySelectorAll('ul button')).map(item => {
          return {
            label: item.innerText.trim(),
            value: item.getAttribute('data-value'),
            checked: item.classList.contains('active')
          }
        });
        item.items = items;
      }
      this.items.push(item);
    });
  }
  initEvents() {
    window.addEventListener('resize', this.resize);
    this.$refs.button.onClick = this.toggle.bind(this);
    this.$refs.apply.addEventListener('click', this.apply.bind(this));
    this.$refs.clear.addEventListener('click', this.clear.bind(this));
    //this.$refs.close.addEventListener('click', this.close.bind(this));
    this.$refs.close.addEventListener('click', () => this.$el.querySelector('[ref="toggleButton"]').dispatchEvent(new Event('click')));
    this.$refs.mobileTagsButton.addEventListener('click', () => {
      this.isOpenTags = !this.isOpenTags;
      this.$refs.mobileTags.classList.toggle('open', this.isOpenTags);
    });

    Array.from(this.$el.querySelectorAll('.tag-button')).forEach(button => {
      button.addEventListener('click', () => {
        const value = button.closest('.tag-container').getAttribute('data-value');
        const tag = this.tagsParsed.find(tag => tag.value === value);
        console.log(tag, value);
        this.toggleTag(tag);
      });
    });

    Array.from(this.$el.querySelectorAll('.tag-container .check-button')).forEach(button => {
      const component = Util.getComponent(button);
      component.onClick = this.change;
    });
    this.$refs.control.forEach(control => {
      control.onChange = this.change;
      control.onOpen = this.open;
      if(!this.isMobile)
        control.onClose = this.close;
    });

    this.$refs.mobileTags.classList.toggle('show', this.isMobile && this.tagsParsed.length > 0);
  }
  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.open(false);
    } else {
      this.close(false);
    }
  }
  open(propague = true) {
    this.setValues();
    this.meanwhile = this.clone(this.filters);
    this.isOpen = true;
    if(this.$refs.control) {
      this.$refs.control.forEach(control => {
        control.open(false);
      });
    }
    if (propague && this.$refs.toggleButton) {
      this.$refs.toggleButton.open(false);
    }
  }
  close(propague = true) {
    this.meanwhile = this.clone(this.filters);
    this.isOpen = false;
    if(!this.isMobile) {
      if(this.$refs.control) {
        this.$refs.control.forEach(control => {
          control.close(false);
        });
      }
    }
    if (propague && this.$refs.toggleButton) {
      this.$refs.toggleButton.close(false);
    }
    this.setValues();
  }
  setValues() {
    if(this.$refs.control) {
      this.$refs.control.forEach(control => {
        const d = this.items.find(item => item.label === control.label);
        if(d.type === 'list'){
          const items = control.items.map(item => {
            const f = this.filters.find(filter => filter.label === control.label);
            const values = f && f.value ? f.value.split(',') : [];
            return {
              ...item,
              checked: values.includes(item.value)
            }
          });
          control.setState(items);
        }else if(d.type === 'calendar'){
          const f = this.filters.find(filter => filter.label === control.label);
          if(f)
            control.setState(f.value);
        }
      });
    }
    this.updateDOM();
  }
  apply(){
    this.filters = this.clone(this.meanwhile);
    this.$refs.count.innerText = this.filters.length;
  }
  clear() {
    this.filters = [];
    this.meanwhile = [];
    if(this.$refs.control) {
      this.$refs.control.forEach(control => {
        control.clear();
      });
    }
    this.updateDOM();
  }
  clone(array) {
    return array.map(item => {
      return {
        ...item
      }
    });
  }
  change(data) {
    const index = this.meanwhile.findIndex(filter => filter.label === data.label);
    if(index !== -1) {
      if(data.value && data.value !== '') {
        this.meanwhile[index].value = data.value;
      } else {
        this.meanwhile.splice(index, 1);
      }
    }else {
      if(data.value && data.value !== '') {
        this.meanwhile.push({
          label: data.label,
          value: data.value
        });
      }
    }
    if(!this.isMobile) {
      this.apply();
    }
    this.updateDOM();
  }
  toggleTag(tag) {
    tag.checked = !tag.checked;
    this.updateDOM();
  }
  resize() {
    this.isMobile = window.innerWidth <= 768;
    if(this.$refs.searchContainer) {
      this.$refs.searchContainer.style.width = `0`;
      setTimeout(() => {
        if(this.$refs.searchContainer) {
          this.$refs.searchContainer.style.width = `calc(100% - ${this.$refs.controls.offsetWidth}px)`;
        }
      }, 500);
    }
    this.$el.style.setProperty('--vh', `${window.innerHeight}px`);
  }
  updateDOM() {
    this.tagsParsed.forEach(tag => {
      const containers = this.$el.querySelectorAll(`.tag-container[data-value="${tag.value}"]`);
      containers.forEach(container => {
        const button = container.querySelector(`.tag-button`);
        container.classList.toggle('checked', tag.checked);
        if(button) {
          button.classList.toggle('checked', tag.checked);
          button.classList.toggle('bt-close', tag.checked);
        }
      });
    });
    this.$el.classList.toggle('open', this.isOpen);
    this.$refs.mobileTags.classList.toggle('open', this.isOpenTags);
  }
  getData() {
    return this.filters;
  }
}
Array.from(document.querySelectorAll('.filters-bar:not([data-no-auto])')).forEach((el) => {
  Util.addComponent(new FiltersBar(el));
});