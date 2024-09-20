/* Home 👇 */
import '../../sass/pages/home-events.page.scss';

import gsap from 'gsap';

import Util from '../util/util';
import '../components/popup';

const isMobile = window.innerWidth < 800

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
// Filters
const btFilters = document.querySelector('.ebu_filters--show')
const filters = document.getElementById('filters')
const filtersMob = document.querySelector('.ebu_filters_box')
const closeFilterMob = document.querySelector('.header_filters--mobile')
const btH6 = document.querySelectorAll('.filter-by h6')
btH6.forEach(e => {
  e.addEventListener('click', () => btFilters.click())
})
document.querySelector('.ebu_filters_box--container').addEventListener('click', (e) => e.stopPropagation())
btFilters.addEventListener('click', (el) => {
  el.stopPropagation()
  if(isMobile){
    //Mobile
    gsap.to(filtersMob, {duration:1,y:0,ease:'Power3.easeOut'})
    closeFilterMob.addEventListener('click', ()=>{
      gsap.to(filtersMob, {duration:1,y:'100%',ease:'Power3.easeOut'})
    })
  }else{
    //Desktop
    if(btFilters.classList.contains('open')){    
      gsap.to(filters, {duration:1,height:0,ease:'Power3.easeOut'})
    }else{
      gsap.to(filters, {duration:1,height:200,ease:'Power3.easeOut'})
    }
    btFilters.classList.toggle('open')

  }
})

document.addEventListener('click', () => btFilters.classList.contains('open') && btFilters.click())
// Select Tags
const selectTagHead = document.querySelector('.ebu_select_tags--head')
const selectTagDrop = document.querySelector('.ebu_select_tags--dropdown')
const buttonDropDown = selectTagDrop.querySelectorAll('button')
const tagsPils = [...document.querySelectorAll('.tag-selector')]

selectTagHead.addEventListener('click', ()=>{
  selectTagHead.classList.toggle('open')
  if(selectTagHead.classList.contains('open')){
    gsap.to(selectTagDrop, {duration:1,height:'auto',ease:'Power3.easeOut'})
  }else{
    gsap.to(selectTagDrop, {duration:1,height:0,ease:'Power3.easeOut'})
  }
})
buttonDropDown.forEach(e =>{
  e.addEventListener('click', ()=>{
    let clase = e.dataset.tag
    const tag = tagsPils.filter(e => e.classList.contains(clase))
    e.classList.toggle('active')
    tag[0].classList.toggle('active')
  })
})

// Tags
const btTags = document.querySelectorAll('.tag-selector')
btTags.forEach(e =>{
  let dataTag = e.dataset.tag
  const subTags = e.querySelector('.sub-tag')
  e.addEventListener('click', (n) =>{
    n.preventDefault()
    e.classList.toggle('active')
    if(isMobile){
      let btDrop = [...buttonDropDown].filter(n => n.dataset.tag == dataTag)
      btDrop[0].classList.remove('active')
    }
  })
  if(subTags)
  subTags.addEventListener('click', e => e.stopPropagation())
  
})

// Calendar Filters
const datepicker = document.querySelector('.datepicker')
const nextYear = datepicker.querySelector('.next')
const prevYear = datepicker.querySelector('.prev')
const year = datepicker.querySelector('.year')
const months = datepicker.querySelectorAll('.month')
const monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const d = new Date();
let month = d.getMonth();
const currentYear = d.getFullYear()
year.innerHTML = currentYear

prevYear.addEventListener('click', ()=>navYear('prev'))
nextYear.addEventListener('click', ()=>navYear('next'))

months.forEach(e =>{
  if(e.dataset.name == monthArray[month]){e.classList.add('current')}
  e.addEventListener('click', ()=>{
    months.forEach(n => n.classList.remove('current'))
    e.classList.add('current')
    //Show Month / Year
    console.log(`Month: ${e.dataset.name} | Year: ${year.innerHTML}`)
  })
})

function navYear(dir){
  let y = year.innerHTML
  if(dir == 'prev'){
    year.innerHTML = parseInt(y) - 1
  }else if('next'){
    if(y < currentYear){
      year.innerHTML = parseInt(y) + 1
    }
  }
}
//Date cards
dropDownDate()
function dropDownDate(){
  const cardsDate = document.querySelectorAll('.date')
  cardsDate.forEach( e => {
    e.addEventListener('click', ()=>{
      e.classList.toggle('open')
    })
  })
}

Util.waitForLoader(() => {
  init();
});

function init() {
  //console.log('Iniciado...')
}

// LOAD MORE
const contentNews = document.querySelector('.ebu_grid_cards')
// Fake Counter
let count = 0;
const check = document.querySelector('.cta_loadmore')
const buttontLoadMore = check.querySelector('.ebu_button')


if(check) {
  // if(isMobile) {
  //   document.addEventListener('touchmove', e => {
  //     const loadMoreBt = document.querySelector('.cta_loadmore').getBoundingClientRect().top
  //     if (loadMoreBt < (window.innerHeight - 300)) {
  //       if (count < 3){
  //         loadMore()
  //       } else {
  //         const btLoad = check.querySelector('button') 
  //         gsap.to(btLoad,{duration:.3,autoAlpha:0,ease:'Power3.easeOut'})
  //       }
  //       count ++
  //     }
  //   })
  // } else {
  //   document.addEventListener('wheel', e => {
  //     const loadMoreBt = document.querySelector('.cta_loadmore').getBoundingClientRect().top 
  //     if (loadMoreBt < (window.innerHeight - 300)) {
  //       if (count < 3){
  //         loadMore()
  //       } else {
  //         const btLoad = check.querySelector('button') 
  //         gsap.to(btLoad,{duration:.3,autoAlpha:0,ease:'Power3.easeOut'})
  //       }
  //       count ++
  //     }
  //   })
  // }
  //Click
  buttontLoadMore.addEventListener('click', loadMore)
}

function loadMore(){
  //FAKE LOAD 
  // Add here dynamic function async to load more Cards  
  for (let i = 0; i < 3; i++) {
    const clone = document.querySelector('.ebu_cards').cloneNode(true)
    contentNews.append(clone)
    gsap.fromTo(clone,{opacity: 0, y: 70}, {opacity: 1, y:0, duration: 1})
  }
  dropDownDate()
}
//Clear All
const inputsCheckbox = document.querySelectorAll('input[type="checkbox"]')
const buttonClearAll = document.querySelector('.button_clear')
buttonClearAll.addEventListener('click', ()=>{
  inputsCheckbox.forEach(e => e.checked=false)
})
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
if(aside)
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