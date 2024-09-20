import Util from '../../util/util.js';

export default class Search {
  constructor(el){
    this.$el = el;
    this.category = 'Molecules';
    this.componentName = 'Search';

    this.input = this.$el.querySelector('input')

    this.input.addEventListener('keydown', () => this.keyDown() )

  }
  keyDown(){
    let textInput = this.input.value
    if(textInput.length > 2 && !this.$el.classList.contains('open')){
      this.$el.classList.add('open')
    }else if(textInput.length < 2){
      this.$el.classList.remove('open');
    }
  }
}
Array.from(document.querySelectorAll('.search-input')).forEach((el) => {
  Util.addComponent(new Search(el));
});