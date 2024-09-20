import Util from '../util/util.js';
import DropdownButton from '../components/atoms/dropdown-button.js';
import CheckButton from '../components/atoms/check-button.js';
import DropdownList from '../components/molecules/dropdown-list.js';
import ShareButton from '../components/molecules/share-button.js';
import Calendar from '../components/molecules/calendar.js';
import CalendarFull from '../components/molecules/calendar-full.js';
import Search from '../components/molecules/search.js';
import FiltersBar from '../components/organisms/filters-bar.js';
import FiltersDropdowns from '../components/molecules/filters-dropdowns.js';
import Dropdowns from '../components/molecules/dropdowns.js';
import List from '../components/molecules/list.js';
import '../components/molecules/tabs.js';
import '../components/molecules/navTabs.js';
import '../components/molecules/heroHomepageSlider.js';
import '../components/molecules/sortBy.js';
import '../components/molecules/testimonialSlider.js';
import '../components/molecules/librarySlider.js';
import '../components/molecules/sliderStructure.js';
import '../components/molecules/imageVariantSwiper.js';
import '../components/molecules/videoSlider.js';
import '../components/molecules/upcomingEventsSlider.js';
import '../components/molecules/heroAcademySlider.js';
import '../components/molecules/homepageSilder.js';
import '../components/organisms/header-main.js';
import '../components/organisms/burgerMobile.js';

import logIn from '../components/organisms/logIn.js';
import '../components/molecules/sliderDelivered.js';
import '../components/molecules/logoSlide.js';
import '../components/molecules/logoSlideHome.js';
import PopUpExchange from '../components/organisms/popUpExchage.js';


export default class Page {
  constructor(options) {
    this.options = options || {};
    this.pageName = this.options.page || 'home';
    window.pageName = this.pageName;
    this.scrollItems = [];
    console.log('log page pageName', this.pageName);
    this.init();
    this.initIntro();

    Util.waitForLoader(this.pageReady);
  }
  init() {
    document.scrollingElement.scrollLeft = 0;
    document.scrollingElement.scrollTop = 0;
    this.resize = this.resize.bind(this);
    this.paralax = this.paralax.bind(this);
    this.pageReady = this.pageReady.bind(this);

    this.isMobile = false;
    this.mobileInitialized = false;
    this.winW = window.innerWidth;
    this.winH = window.innerHeight;

    this.isTouch = Util.isTouch();
    
    document.documentElement.setAttribute('data-browser', Util.getBrowser());
    document.documentElement.setAttribute('data-touch', this.isTouch);

    this.scrollingElement = document.getElementById('main');

    //Dropdowns
    let dropdown = document.querySelector('.dropdown')
    if(dropdown){new Dropdowns(dropdown)}
    
    //logIn
    let login = document.getElementById('popup-login')
    if(login){new logIn(login)}

    this.resize();
    window.addEventListener('resize', () => {
      clearTimeout(this.resizedFinished);
      this.resize();
      this.resizedFinished = setTimeout(() => {
        this.resize();
      }, 500);
    });

    window.addEventListener('beforeunload', () => {
    });
    window.addEventListener('pagehide', () => {
    });
    document.addEventListener('scroll', this.paralax);
    this.setOS();
  }
  initIntro() {
  }
  intro() {
    
  }
  paralax() {
    this.scrollItems = Array.from(
      document.querySelectorAll(
        ".fade-in-y, .fade-in, [data-fade-in-y], [data-fade-in], [data-scroll-item]"
      )
    );
    this.scrollItems.forEach((item) => {
      const offset = item.getAttribute('data-scroll-offset') ? Number(item.getAttribute('data-scroll-offset')) : 120;
      if (!item.classList.contains('show') && Util.isInViewportDom(item, offset)) {
        item.classList.add('show')
      }else if(item.classList.contains('show') && item.getBoundingClientRect().top > this.winH) {
        item.classList.add('no-transition');
        item.classList.remove('show');
        item.classList.remove('no-transition');
      }
    });
  }
  pageReady() {
    this.resize();
    this.intro();
  }
  setOS() {
    let os = "osx";
    if (navigator.platform) {
      if (navigator.platform.indexOf("Win") > -1) {
        os = "windows";
      } else if (navigator.platform.indexOf("Mac") > -1) {
        os = "osx";
      } else if (navigator.platform.indexOf("Linux") > -1) {
        os = "linux";
      }
    } else {
      if (navigator.userAgent.indexOf("Windows") > -1) {
        os = "windows";
      } else if (navigator.userAgent.indexOf("Mac") > -1) {
        os = "osx";
      } else if (navigator.userAgent.indexOf("Linux") > -1) {
        os = "linux";
      }
    }
    document.documentElement.setAttribute("data-os", os);
  }
  resize() {
    this.isTouch = Util.isTouch();
    this.winW = window.innerWidth;
    this.winH = window.innerHeight;
  
    // Set the viewport size for css
    const vh = this.winH * 0.01;
    this.isMobile = window.innerWidth <= 1024;
  
    if (this.isMobile && !this.mobileInitialized) {
      this.mobileInitialized = true;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    } else if (!this.isMobile) {
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    let container = document.querySelector('.container');
    let rect;
    if(!container) {
      container = document.createElement('div');
      container.classList.add('container');
      document.body.append(container);
      rect = container.getBoundingClientRect();
      container.remove();
    }else {
      rect = container.getBoundingClientRect();
    }
    if (rect) {
      this.containerMargin = rect.left;
      document.documentElement.style.setProperty(
        '--container-margin',
        `${this.containerMargin}px`
      );
      document.documentElement.style.setProperty(
        '--container-width',
        `${rect.width}px`
      );
    }
    document.scrollingElement.scrollLeft = 0;
  }
}