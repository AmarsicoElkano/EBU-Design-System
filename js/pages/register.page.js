/* Home 👇 */
import '../../sass/pages/register.page.scss';

import gsap from 'gsap';

import '../components/aside.js'
import '../components/popup';

import Util from '../util/util';

Util.waitForLoader(() => {
  init();
});
function init() {
  console.log('Iniciado...')

}

// ASIDE
const openAside = document.querySelector('.data-event-title');
const aside = document.getElementById('aside');
const openContact = document.querySelector('.contact-btn');
const contact = document.querySelector('.contact-event');
const closeContact = document.querySelector('.contact-close');
if(openAside)
openAside.addEventListener('click', ()=>{
  aside.classList.toggle('opened');
})
if(openContact)
openContact.addEventListener('click', ()=>{
  contact.classList.toggle('opened');
})
if(closeContact)
closeContact.addEventListener('click', ()=>{
  contact.classList.toggle('opened');
})

var scrollPosition = window.scrollY;
var lastScroll = 0;

window.addEventListener('scroll', function() {
  scrollPosition = window.scrollY;
  if (scrollPosition > lastScroll) {
    aside.classList.add('hide');
  } else {
    aside.classList.remove('hide');
  }
  lastScroll = scrollPosition;
});
// ASIDE END

/* /Home 🔚 */