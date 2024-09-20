/* Home 👇 */
import '../../sass/pages/events.page.scss';

import gsap from 'gsap';

import '../components/aside.js'

import Util from '../util/util';
import schudele from '../components/schudele';

import '../components/popup';
import '../components/gallery';
import '../components/testimonials';
import '../components/video-player';
// Import Group Meeting
import '../components/group-meeting'

import Swiper from '../libs/swiper.min';

// Button up
const btTop = document.querySelector('.scroll-up')
if(btTop)
btTop.addEventListener('click', () => {
  const offsetTop = document.querySelector('main').offsetTop;
  scroll({
    top: offsetTop,
    behavior: "smooth"
  });
})

const iframeVideo = document.querySelectorAll('.iframe-video')
const links = document.querySelectorAll(".ebu_secundary_nav--item");

if(iframeVideo)
iframeVideo.forEach(e => {
  let w = e.clientWidth
  let h = (56 * w) / 100
  e.style.height = `${h}px`
})

for (const link of links) {
  link.addEventListener("click", clickHandler);
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop - 55,
    behavior: "smooth"
  });
}

var scrollItems = [
  ...Array.from(document.querySelectorAll('.fade-in')),
  ...Array.from(document.querySelectorAll('.fade-in-y_NO')),
];

new Swiper('.related-cards-container', {
  loop: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  spaceBetween: 10,
  slidesPerView: 1,
  breakpoints: {
    640: {
      slidesPerView: 3,
      enabled: false
    }
  }
});

new Swiper('.cards-community-events', {
  loop: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  spaceBetween: 10,
  slidesPerView: 1,
  breakpoints: {
    640: {
      slidesPerView: 2,
      enabled: false,
      spaceBetween: 32
    }
  }
});

new Swiper('.partners', {
  slidesPerView: 3,
  autoplay: true,
  slidesPerGroup: 3,
  speed: 1000,
  breakpoints: {
    640: {
      slidesPerView: 6,
      slidesPerGroup: 6,
    }
  }
});

//AGENDA
const expandable = document.getElementById('expandable')
const collapsable = document.getElementById('collapsable')

new schudele(expandable);
new schudele(collapsable);

//SPEAKERS
const popUpSpeakers = document.getElementById('popUpSpeakers')
if(popUpSpeakers) {
  const buttonPopupSpeakers = [...document.querySelectorAll('.read-biography')]
  const closePopUpSpeakers = popUpSpeakers.querySelector('.close-popup')

  buttonPopupSpeakers.forEach( e => {
    e.addEventListener('click', (n)=>{
      n.preventDefault()
      popUpSpeakers.classList.add('open');
      gsap.to(popUpSpeakers,{duration:1,opacity:1,ease: 'Power4.easeInOut'})
    })
  })
  closePopUpSpeakers.addEventListener('click', (n) =>{
    n.preventDefault()
    gsap.to(popUpSpeakers,{duration:.5,opacity:0,ease: 'Power4.easeInOut', onComplete:()=>{
      popUpSpeakers.classList.remove('open');
    }})
  })
}

// PREVIUS EDITION DROPDOWN
const dropDownBt = document.querySelector('.top-dropdown-edition')
if(dropDownBt){
  const spanDropDown = dropDownBt.querySelector('span')
  const select = document.querySelector('.select-dropdown-edition')
  const selectBt = [...select.querySelectorAll('li')]
  //Show / Hide select
  dropDownBt.addEventListener('click', ()=>{
    dropDownBt.classList.toggle('open');
    animateDropDown()
  })
  // Select Edition
  selectBt.forEach((e)=>{
    e.addEventListener('click', ()=>{
      selectBt.forEach(n => n.classList.remove('selected'))
      let edition = e.dataset.edition
      e.classList.add('selected')
      spanDropDown.innerHTML = edition
    })
  })
  const tl = gsap.timeline();
  tl.to(select, {
    duration:1,height:164,
    ease:"power3.inOut"
  });
  tl.reversed(true);

  function animateDropDown() {
    tl.reversed(!tl.reversed());
  }
}
// DropDown end

Util.waitForLoader(() => {
  init();
});
function init() {
  //console.log('Iniciado...')

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

const sectionEvents = document.querySelectorAll('.event-sections')
const sectionPrevius = document.getElementById('previous-edition')
const hero = document.querySelector('.ebu_hero')

var scrollPosition = window.scrollY;
var lastScroll = 0;

window.addEventListener('scroll', function() {
  scrollItems.forEach((item) => {
    const offset = 100;
    if (!item.classList.contains('show') && Util.isInViewportDom(item, offset)) {
      item.classList.add('show');
    }
  });

  scrollPosition = window.scrollY;
  // console.log(scrollPosition) // posición actual
  // console.log(document.body.scrollHeight) // total 11458
  if (scrollPosition > lastScroll) {
    aside.classList.add('hide');
  } else {
    if (scrollPosition > (document.body.scrollHeight - 1000)) {
    } else {
      aside.classList.remove('hide');
    }
  }
  lastScroll = scrollPosition;

  //items
  let st = scrollPosition - hero.clientHeight
  sectionEvents.forEach(s =>{
    if(s.getBoundingClientRect().top < 200){
      // console.log((window.clientHeight / 2))
      //console.log(st,`${s.attributes.id.value} => ${s.getBoundingClientRect().top}`)
      links.forEach(e =>{
        e.classList.remove('active')
        let bt = [...links].filter(n => n.attributes.href.value == `#${s.id}`)
        
        if(bt.length > 0){
          bt[0].classList.add('active')
        }
      })
    }
    if(sectionPrevius) {
      if( sectionPrevius.getBoundingClientRect().top < 200){
        links.forEach(e => e.classList.remove('active') )
        let bts = [...links].filter(n => n.attributes.href.value == '#previous-edition')
        if(bts.length > 0){
          bts[0].classList.add('active')
        }
      }
    }

  })
  //Previus edition
  
});
// ASIDE END

// CHAT

const chatClose = document.querySelector('.chat-title-icon');
const chat = document.querySelector('.chat');

if(chat)
chatClose.addEventListener('click', ()=>{
  chat.classList.toggle('closed');
})

// CHAT END

/* /Home 🔚 */