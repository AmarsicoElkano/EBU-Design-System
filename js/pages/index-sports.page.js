import Page from './page.js';

export default class Indexsports extends Page {
  constructor() {
    super({page: 'Indexsports'});
  }
  init() {
    super.init();
  }
  pageReady() {
    this.resize();
    this.changeActiveTabScroll();
    this.eventsSlider();
    this.enterHeroAnimation();
    this.enterTabsAnimation();
    this.enterOverviewAnimation();
    this.enterOurCalendarAnimation();
    this.enterSportsAnimation('.summer-sports-js')
    this.enterSportsAnimation('.winter-sports-js')
    //this.enterSportsAnimation('.cycling-sports-js')
    this.enterSportsAnimation('.indoor-sports-js')
    this.enterSportsAnimation('.contact-js')

    //Lateral Navigation
    //sbNav
    let subAllButton = document.querySelectorAll('.sports-side-nav__subnav .sbtn')
    subAllButton.forEach( e => e.addEventListener('click', (n)=>{
      n.preventDefault()
      n.stopPropagation()
      let subSectionSb = e.dataset.rel
      let parentsSb = e.closest('.sports-display')
      let buttonsSb = parentsSb.querySelectorAll('.sports-side-nav__subnav .sbtn')
      let mainSb = parentsSb.querySelectorAll('.main-content')
      if(mainSb.length > 1){
        buttonsSb.forEach(b => b.classList.remove('active'))
        mainSb.forEach(b => b.classList.add('hide'))
        e.classList.add('active')
        parentsSb.querySelector('.main-content.'+subSectionSb).classList.remove('hide')
        console.log(parentsSb.querySelector('.main-content.'+subSectionSb))
        let classSection = parentsSb.getAttribute('class').split(' ')
        this.enterSportsAnimation('.'+classSection[1])
      }
      
    }))
    //Btns
    let AllButtons = document.querySelectorAll('.sports-side-nav li')
    AllButtons.forEach( e => e.addEventListener('click', (n)=>{
        let subSection = e.dataset.rel
        let parents = e.closest('.sports-display')
        let buttons = parents.querySelectorAll('.sports-side-nav li')
        let main = parents.querySelectorAll('.main-content')
        if(main.length > 1){
          buttons.forEach(b => b.classList.remove('active'))
          main.forEach(b => b.classList.add('hide'))
          e.classList.add('active')
          parents.querySelector('.main-content.'+subSection).classList.remove('hide')
          console.log(parents.querySelector('.main-content.'+subSection))
          let classSection = parents.getAttribute('class').split(' ')
          this.enterSportsAnimation('.'+classSection[1])
        }
      })
    )

    //Filters //ourcalendar
    let sectionCalendar = document.querySelector('#ourcalendar')
    let filterButtons = sectionCalendar.querySelectorAll('.filter-button')
    let cards = sectionCalendar.querySelectorAll('.calendar-card')
    let allBtn = sectionCalendar.querySelector('.ghost-button.btnAll')
    filterButtons.forEach(b => {
      b.addEventListener('click', ()=>{
        filterButtons.forEach(fb => fb.classList.remove('active'))
        cards.forEach(c => c.classList.add('hide'))
        let cat = b.dataset.cat
       
        Array.from(cards).filter(c => c.classList.contains(cat) && c.classList.remove('hide'))
       
        b.classList.add('active')
        
      })
    })
    allBtn.addEventListener('click',() => {
      cards.forEach(c => c.classList.remove('hide'))
      filterButtons.forEach(fb => fb.classList.remove('active'))
    })
    
  }
  changeActiveTabScroll () {
    const btnTabs = gsap.utils.toArray('.btn_tab')
    const sections = ['#overview', '#summersports', '#wintersports', '#indoorsports', '#ourcalendar', '#contact']

    sections.forEach((section, index) => {
      gsap.from(section, {
        scrollTrigger: {
          start: 'top center-=30%',
          end: 'bottom center-=30%',
          trigger: section,
          // markers: true,
          onEnter() {
            btnTabs.forEach((el) => {
              el.classList.remove('active')
            })
            btnTabs[index].classList.add('active')
          },
          onEnterBack() {
            btnTabs.forEach((el) => {
              el.classList.remove('active')
            })
            btnTabs[index].classList.add('active')
          },
        }
      });
    })


  }
  eventsSlider () {
    const swiper = new Swiper('.swiper', {
      // Optional parameters
      // direction: 'vertical',
      loop: false,
      // centeredSlides: true,
      // slidesPerView: 4.2,
      // modules: [Navigation],
      // If we need pagination
      // pagination: {
      //   el: '.swiper-pagination',
      // },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1.1,
          spaceBetween: 10
        }, 
        650: {
          slidesPerView: 3.2,
          spaceBetween: 10
        }, 
        1024: {
          slidesPerView: 3.2,
          spaceBetween: 10
        }, 
        1440: {
          slidesPerView: 3.3,
          spaceBetween: 10
        }, 
        1680: {
          slidesPerView: 4.5,
          spaceBetween: 10
        }, 
      }
    });
  }
  enterHeroAnimation() {
    const heroBg = document.querySelectorAll('.hero-bg-js')
    const heroTextsContainer = document.querySelectorAll('.hero-intro-text')
    const heroH2 = document.querySelectorAll('.hero-intro-text h2')
    const heroH1 = document.querySelectorAll('.hero-intro-text h1')
    const heroP = document.querySelectorAll('.hero-intro-text p')
    const blueGradient = document.querySelectorAll('.blue-gradient-js')
    const discoverMore = document.querySelectorAll('.discover-more-js')
    
    const tl = gsap.timeline()
    tl.fromTo(heroBg, {
      autoAlpha: 0,
      scale: 1.2
    },{
      autoAlpha: 1,
      scale: 1,
      ease: 'power4.in',
      duration: .7
    })
    .fromTo(heroTextsContainer, {
      autoAlpha: 0,
      filter: 'blur(5px)',
    }, {
      autoAlpha: 1,
      filter: 'blur(0)',
    }, 1)
    .fromTo([heroH2, heroH1, heroP], {
      autoAlpha: 0,
      x:  -10,
    }, {
      autoAlpha: 1,
      x: 0,
      stagger: .1,
    })
    .fromTo( blueGradient, {
      clipPath: 'inset(0% 0% 0% 100%)'
    }, {
      clipPath: 'inset(0% 0% 0% 0%)',
      stagger: .3,
      duration: .5,
      ease: 'expo.out'
    }, 1.5)
    .fromTo( discoverMore, {
      autoAlpha: 0,
      y:  10,
    }, {
      autoAlpha: 1,
      y: 0,
    })

  }
  enterTabsAnimation () {
    const tabs = document.querySelectorAll('.tab-js')
    const tabsContainer = document.querySelectorAll('.tabs-container-js')

    gsap.fromTo(tabs, {
      autoAlpha: 0,
      y: 20,
    }, {
      scrollTrigger: {
        trigger: tabsContainer,
        start: 'top center+=30%',
        // markers: true,
      },
      autoAlpha: 1,
      y: 0,
      stagger: .1,
    })
  }
  enterOverviewAnimation () {
    const overviewSection = document.querySelector('.overview-section-js')
    const introText = overviewSection.querySelector('.intro-paragraph-js')
    const overviewLeft = overviewSection.querySelector('.overview-left-js')
    const overviewRight = overviewSection.querySelector('.overview-right-js')
    const captions = overviewSection.querySelectorAll('.rectangular-caption-js')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: overviewSection,
        start: 'top top+=50%',
        // markers: true,
      },
    })
    tl
    .fromTo(introText, {
      autoAlpha: 1,
      x: 0,
      duration: .7
    }, {
      autoAlpha: 1,
      x: 0,
      duration: .7
    })
    .fromTo(overviewRight, {
      y: 0,
      autoAlpha: 1
    }, {
      y: 0,
      autoAlpha: 1
    })
    .fromTo(overviewLeft, {
      clipPath: 'inset(100% 0% 0% 0%)',
    }, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.2,
      ease: 'power2.out'
    }, .5)
    .fromTo(captions, {
      
      y: 0,
      autoAlpha: 1,
      stagger: .2,
      duration: .6
    }, {
      y: 0,
      autoAlpha: 1,
      stagger: .2,
      duration: .6
    }, 1.2)
  }
  enterSportsAnimation (section) {
    const summerSection = document.querySelector(section)
    const sideNav = summerSection.querySelectorAll('.sports-side-nav-js')
    const constactCard = summerSection.querySelectorAll('.sports-contact-card-js')
    const sportsInformation = summerSection.querySelectorAll('.sports-information-js')

    const description = summerSection.querySelectorAll('.description-js')
    const descriptionText = summerSection.querySelectorAll('.text-js')
    const bottomSubtitle = summerSection.querySelectorAll('.bottom-subtitle-js')
    const gradientContainer = summerSection.querySelectorAll('.image-container-js')
    const caption = summerSection.querySelectorAll('.image-caption-js')
    
    const calendarEvents = summerSection.querySelectorAll('.calendar-events-js')
    const firstCategory = summerSection.querySelectorAll('.first-category-js')
    const firstCards = summerSection.querySelectorAll('.first-event-cards-js')
    const secondCategory = summerSection.querySelectorAll('.second-category-js')
    const secondCards = summerSection.querySelectorAll('.second-event-cards-js')
    
    
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: summerSection,
        start: 'top center',
        // markers: true,
      }
    })
    .fromTo(sideNav, {
      
      autoAlpha: 1,
      x: 0,
      duration: .5,
    }, {
      autoAlpha: 1,
      x: 0,
      duration: .5,
    }, .5)
    .fromTo(constactCard, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
    }, 1)
    .fromTo(sportsInformation, {
      autoAlpha: 0,
      y: 20,
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
    }, 0)

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: description,
        start: 'top center',
        // markers: true,
      }
    })
    .fromTo(descriptionText, {
      autoAlpha: 1,
      y: 0,
    }, {
      autoAlpha: 1,
      y: 0,
    }, 0)
    .fromTo(gradientContainer, {
      clipPath: 'inset(100% 0% 0% 0%)'
    }, {
      clipPath: 'inset(0% 0% 0% 0%)'
    })
    .fromTo(caption, {
      autoAlpha: 0,
      y: -20,
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
    })
    .fromTo(bottomSubtitle, {
      autoAlpha: 1,
    }, {
      autoAlpha: 1,
    })
    
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: calendarEvents,
        start: 'top center',
        // markers: true,
      }
    })
    .fromTo([firstCategory, firstCards, secondCategory, secondCards], {
      autoAlpha: 1,
      y: 0,
      stagger: .2,
    },{
      autoAlpha: 1,
      y: 0,
      stagger: .2,
    })
    
    
  }
  enterOurCalendarAnimation () {
    const calendarSection = document.querySelector('.our-calendar-js')
    const title = calendarSection.querySelector('.calendar-title-js')
    const tabs = calendarSection.querySelectorAll('.calendar-btn-js')
    const cards = calendarSection.querySelector('.cards-container-js')
    const button = calendarSection.querySelector('.load-more-js')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: calendarSection,
        start: 'top center',
        // markers: true,
      },
    })
    .fromTo(title, {
      autoAlpha: 1,
      x: 0,
    }, {
      autoAlpha: 1,
      x: 0,
    })
    .fromTo(tabs, {
      autoAlpha: 1,
      y: 0,
      stagger: .1,
    }, {
      autoAlpha: 1,
      y: 0,
      stagger: .1,
    })
    .fromTo(cards, {
      autoAlpha: 1,
      y: 0,
    }, {
      autoAlpha: 1,
      y: 0,
    })
    .fromTo(button, {
      autoAlpha: 1,
      y: 0,
    }, {
      autoAlpha: 1,
      y: 0,
    })


  }
}
new Indexsports();