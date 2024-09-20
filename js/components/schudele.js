import gsap from 'gsap';
import Util from '../util/util';

export default class schudele {
  constructor($el){
    this.$el = $el;
    if(!this.$el) return;
    this.button = this.$el.querySelectorAll('button');
    this.type = $el.id;
    if(this.type == 'collapsable'){
       this.paragraph = this.$el.querySelectorAll('.p-collapsed')
       this.textInitCollapse(this.paragraph)
    };
    

    [...this.button].forEach( e => {
      e.addEventListener('click', ()=>{
        if(this.type == 'expandable'){
          this.toggleExpande(e)
        }else{
          this.toggleCollapse(e)
        }
      })
    })

  }
  toggleExpande(e){
    const parag = e.parentElement.querySelector('.paragraph')
    const open = e.classList.contains('close')
    if(open) this.close(e,parag);
    else this.open(e,parag);
  }
  open(el,parag){
    gsap.to(parag, {duration:.5,height:'auto', ease: 'Power4.easeInOut'})
    el.classList.add('close')
  }
  close(el,parag){
    gsap.to(parag, {duration:.7,height:0, ease: 'Power4.easeInOut'})
    el.classList.remove('close');
  }
  toggleCollapse(e){
    const p = e.parentElement
    const o = p.classList.contains('open')
    if(o){
      p.querySelector('span').innerText = this.subStrg(p.getAttribute('data-text'))
    }else{
      p.querySelector('span').innerText = p.getAttribute('data-text')
    }
    p.classList.toggle('open')
  }
  textInitCollapse(paraph){
    [...paraph].forEach(e => {
      let data = e.getAttribute('data-text')
      e.querySelector('span').innerText = this.subStrg(data)
    })
  }
  subStrg(t){
    if(t) return t.substring(0, 147) + '...';
  }
}