import Util from '../../util/util.js';

export default class PopUpExchange {
  constructor(el){
    this.$el = el;
    this.isOpen = false;
    this.button = document.querySelectorAll('.open-popup-exchange')
    this.closeBt = this.$el.querySelector('.close-popup')
    console.log(this.button)

    this.closeBt.addEventListener('click', () => this.close())

    this.button.forEach(b => b.addEventListener('click', (e) => this.open(e)))

  }
  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.open();
    } else {
      this.close();
    }
  }
  open(e) {
    e.preventDefault();
    
    this.isOpen = true;
    this.$el.classList.add('open')
    console.log('abre')
  }
  close() {
    this.isOpen = false;
    this.$el.classList.remove('open')
    console.log('cierra')
  }
}