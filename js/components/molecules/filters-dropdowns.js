import Util from '../../util/util.js';

export default class FiltersDropdowns {
  constructor(el){
    this.$el = el;
    this.category = 'Molecules';
    this.componentName = 'FiltersDropdowns';

    this.counter = this.$el.querySelector('.filters-dropdowns_controls span')
    this.clear = this.$el.querySelector('.filters-dropdowns_controls button')
    this.input = this.$el.querySelector('input')
    this.dropdowns = this.$el.querySelectorAll('.filters-dropdowns_filter h4')

    this.dropdowns.forEach( b => b.addEventListener('click', e => this.openList(e) ) )
    this.clear.addEventListener('click', () => this.clearAll())

    this.$el.querySelectorAll('input[type="checkbox"]').forEach( b => b.addEventListener('change', () => this.counterChecks() ) )
  }
  openList(event){
    console.log(event)
    let h4 = event.target
    let list = h4.nextElementSibling
    console.log(h4)
    console.log(list.classList.contains('open'))
    list.classList.contains('open') ? list.classList.remove('open') : list.classList.add('open')
    h4.classList.contains('open') ? h4.classList.remove('open') : h4.classList.add('open')
  }
  counterChecks(){
    let checks = this.$el.querySelectorAll('input[type="checkbox"]')
    let count = 0
    checks.forEach(c => {
      if(c.checked){
        count++
      }
    })
    this.counter.innerHTML = count
  }
  clearAll(){
   let checks = this.$el.querySelectorAll('input[type="checkbox"]')
   checks.forEach(c => c.checked = false)
   this.counter.innerHTML = 0
  }
}
Array.from(document.querySelectorAll('.filters-dropdowns')).forEach((el) => {
  Util.addComponent(new FiltersDropdowns(el));
});