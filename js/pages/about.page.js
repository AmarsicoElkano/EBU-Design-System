import Page from './page.js';

export default class about extends Page {
  constructor() {
    super({page: 'about'});
  }
  init() {
    super.init();
  }
  pageReady() {
    super.pageReady();
    this.resize();
    console.log('log page ready');

    const btnTabs = gsap.utils.toArray('.btn_tab')
    
    
    gsap.from('#ourcommunity', {
      scrollTrigger: {
        start: 'top center-=30%',
        end: 'bottom center-=30%',
        trigger: '#ourcommunity',
        // markers: true,
        onEnter() {
          btnTabs.forEach((el) => {
            el.classList.remove('active')
          })
          btnTabs[0].classList.add('active')
        },
        onEnterBack() {
          btnTabs.forEach((el) => {
            el.classList.remove('active')
          })
          btnTabs[0].classList.add('active')
        },
      }
    });

    gsap.from('#ourmission', {
      scrollTrigger: {
        start: 'top center-=30%',
        end: 'bottom center-=30%',
        trigger: '#ourmission',
        // markers: true,
        onEnter() {
          btnTabs.forEach((el) => {
            el.classList.remove('active')
          })
          btnTabs[1].classList.add('active')
        },
        onEnterBack() {
          btnTabs.forEach((el) => {
            el.classList.remove('active')
          })
          btnTabs[1].classList.add('active')
        },
      }
    });

    gsap.from('#ourstrategy', {
      scrollTrigger: {
        start: 'top center-=30%',
        end: 'bottom center-=30%',
        trigger: '#ourstrategy',
        // markers: true,
        onEnter() {
          btnTabs.forEach((el) => {
            el.classList.remove('active')
          })
          btnTabs[2].classList.add('active')
        },
        onEnterBack() {
          btnTabs.forEach((el) => {
            el.classList.remove('active')
          })
          btnTabs[2].classList.add('active')
        },
      }
    });

    gsap.from('#management', {
      scrollTrigger: {
        start: 'top center-=30%',
        end: 'bottom center-=30%',
        trigger: '#management',
        // markers: true,
        onEnter() {
          btnTabs.forEach((el) => {
            el.classList.remove('active')
          })
          btnTabs[3].classList.add('active')
        },
        onEnterBack() {
          btnTabs.forEach((el) => {
            el.classList.remove('active')
          })
          btnTabs[3].classList.add('active')
        },
      }
    });

    gsap.from('#anualreport', {
      scrollTrigger: {
        start: 'top center-=30%',
        end: 'bottom center-=30%',
        trigger: '#anualreport',
        // markers: true,
        onEnter() {
          btnTabs.forEach((el) => {
            el.classList.remove('active')
          })
          btnTabs[4].classList.add('active')
        },
        onEnterBack() {
          btnTabs.forEach((el) => {
            el.classList.remove('active')
          })
          btnTabs[4].classList.add('active')
        },
      }
    });
    

    const aboutStickyTabs = document.querySelector('.about-stickyTabs')

    gsap.from(aboutStickyTabs, {
      scrollTrigger: {
        start: 'top center',
        end: 'bottom center',
        trigger: '.community-section-1',
        onEnter() {
          aboutStickyTabs.style.zIndex = 10
        },
        onLeaveBack() {
          aboutStickyTabs.style.zIndex = 1
        },
      }
    });


    const wrapper = document.querySelector('.circles-wrapper__inner')
    const texts = gsap.utils.toArray('.community-section-texts-js')
    const metrics1 = gsap.utils.toArray('.metric-section-1');

    metrics1.forEach((metric) => {
      gsap.from(metric, {
        scrollTrigger: {
          start: 'top center',
          end: 'bottom center',
          trigger: '.community-section-1',
          // markers: true,
          onEnter() {
            metric.classList.add('active');
            wrapper.classList.add('turn-red')
          },
          onLeave() {
            metric.classList.remove('active');
            wrapper.classList.remove('turn-red')
          },
          onEnterBack() {
            metric.classList.add('active');
            wrapper.classList.add('turn-red')
          },
          onLeaveBack() {
            metric.classList.remove('active');
            wrapper.classList.remove('turn-red')
          }
        }
      });
    });

    const metrics2 = gsap.utils.toArray('.metric-section-2');
    metrics2.forEach((metric) => {
      gsap.from(metric, {
        scrollTrigger: {
          start: 'top center',
          end: 'bottom center',
          trigger: '.community-section-2',
          // markers: true,
          onEnter() {
            metric.classList.add('active');
            wrapper.classList.add('turn-green')
          },
          onLeave() {
            metric.classList.remove('active');
            wrapper.classList.remove('turn-green')
          },
          onEnterBack() {
            metric.classList.add('active');
            wrapper.classList.add('turn-green')
          },
          onLeaveBack() {
            metric.classList.remove('active');
            wrapper.classList.remove('turn-green')
          }
        }
      });
    });
    const metrics3 = gsap.utils.toArray('.metric-section-3');
    metrics3.forEach((metric) => {
      gsap.from(metric, {
        scrollTrigger: {
          start: 'top center',
          end: 'bottom center',
          trigger: '.community-section-3',
          // markers: true,
          onEnter() {
            metric.classList.add('active');
            wrapper.classList.add('turn-purple')

          },
          onLeaveBack() {
            metric.classList.remove('active');
            wrapper.classList.remove('turn-purple')

          }
        }
      });
    });

    texts.forEach((text) => {
      gsap.fromTo(text, {
        autoAlpha: 0,
        yPercent: 15,
      }, {
        scrollTrigger: {
          start: 'top center',
          trigger: text,
          // markers: true,
        },
        autoAlpha: 1,
        yPercent: 0,

      });
    });

    //----------------------------- SCROLL opcion 1

    if(window.innerWidth > 900){

    let panels = gsap.utils.toArray(".panel"),
    observer = ScrollTrigger.normalizeScroll(true),
    scrollTween;

    // on touch devices, ignore touchstart events if there's an in-progress tween so that touch-scrolling doesn't interrupt and make it wonky
    document.addEventListener("touchstart", e => {
      if (scrollTween) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }, {capture: true, passive: false})

    function goToSection(i) {
      scrollTween = gsap.to(window, {
        scrollTo: {y: i * innerHeight, autoKill: false},
        onStart: () => {
          observer.disable(); // for touch devices, as soon as we start forcing scroll it should stop any current touch-scrolling, so we just disable() and enable() the normalizeScroll observer
          observer.enable();
        },
        duration: 1,
        ease: 'power2.out',
        onComplete: () => scrollTween = null,
        overwrite: true
      });
    }

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top bottom",
        end: "bottom top",
        // markers: true,
        ease: 'power2.out',
        onToggle: self => self.isActive && !scrollTween && goToSection(i)
      });
    });

    }




  }
}
new about();