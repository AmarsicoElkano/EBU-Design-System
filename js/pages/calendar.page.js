/* Calendar 👇 */

import gsap from 'gsap'

import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
//import momentPlugin from '@fullcalendar/moment'

import '../../sass/pages/calendar.page.scss'
import { loadConfig } from '@babel/core/lib/config/files'

const isMobile = window.innerWidth < 800

const calendarEl = document.getElementById('calendar')

//Card Open
const cardElement = document.querySelector('.ebu_cards')

window.onload = () => calendarInit()

function calendarInit() {
  if(isMobile){
    const calendar = new Calendar(calendarEl, {
      plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin ], //momentPlugin
      initialView: 'listWeek',
      firstDay: 1,
      //schedulerLicenseKey: 'XXX',
      headerToolbar: {
        left: 'title,prev,next today',
        center: false,
        right: 'dayGridMonth,listWeek',
      },
      dayHeaderFormat: {
        weekday: 'short',
      },
      listDaySideFormat: 'D MMM YYYY',
      titleFormat: 'D MMM YYYY',
      navLinks: false, 
      editable: false,
      dayMaxEvents: true,
      eventDisplay: 'block',
      displayEventEnd: true,
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      },
      events: [
        {
          id: "Aca va un ID",
          title: 'All Day Event',
          start: '2021-12-20',
          className: 'green',
        },
        {
          id: "Aca va un ID",
          title: 'Event title - 3 Days',
          start: '2021-12-22',
          end: '2021-12-25',
          className: 'yellow',
        },
        {
          id: "Aca va un ID",
          className: 'red',
          groupId: 999,
          title: 'Repeating Event',
          start: '2021-12-23T16:00:00',
          end: '2021-12-23T18:00:00',
        },
        {
          id: "Aca va un ID",
          groupId: 999,
          title: 'Repeating Event',
          start: '2021-12-23T16:00:00',
          end: '2021-12-23T18:00:00',
          className: 'red',
        },
        {
          id: "Aca va un ID",
          title: 'Conference',
          start: '2021-12-23',
          end: '2021-12-23T12:30:00',
          className: 'purple',
        },
        {
          id: "Aca va un ID",
          title: 'Conference 2',
          start: '2021-12-23',
          end: '2021-12-23T12:30:00',
          className: 'green',
        },
        {
          id: "Aca va un ID",
          title: 'Meeting',
          start: '2021-12-24T10:30:00',
          end: '2021-12-24T12:30:00',
          className: 'green',
        },
        {
          id: "Aca va un ID",
          title: 'Digital Committee Workshop and Meeting',
          start: '2021-12-25T12:00:00',
          end: '2021-12-25T18:00:00',
          className: 'purple',
        },
        {
          id: "Aca va un ID",
          title: 'Meeting',
          start: '2021-12-26T14:30:00',
          end: '2021-12-26T19:30:00',
          className: 'gray',
        },
        {
          id: "Aca va un ID",
          title: 'Happy Hour',
          start: '2021-12-26T17:30:00',
          end: '2021-12-26T18:30:00',
          className: 'yellow',
        },
      ],
      eventClick: function(info) {
        openCard(info)
      },
    });
    calendar.render();
  } else {
    const calendar = new Calendar(calendarEl, {
      plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin ],
      initialView: 'dayGridMonth',
      firstDay: 1,
      navLinks: false,
      //schedulerLicenseKey: 'XXX',
      headerToolbar: {
        left: 'title,prev,next today',
      },
      dayHeaderFormat: {
        weekday: 'long',
      },
      editable: false,
      dayMaxEvents: true,
      eventDisplay: 'block',
      displayEventEnd: true,
      dayPopoverFormat: {
        weekday: 'long',
        day: 'numeric',
      },
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      },
      events: [
        {
          id: "Aca va un ID",
          title: 'All Day Event',
          start: '2021-12-20',
          className: 'green',
        },
        {
          id: "Aca va un ID",
          title: 'Event title - 3 Days',
          start: '2021-12-15',
          end: '2021-12-18',
          className: 'yellow',
        },
        {
          id: "Aca va un ID",
          className: 'red',
          groupId: 999,
          title: 'Repeating Event',
          start: '2021-12-23T16:00:00',
          end: '2021-12-23T18:00:00',
        },
        {
          id: "Aca va un ID",
          groupId: 999,
          title: 'Repeating Event',
          start: '2021-12-23T16:00:00',
          end: '2021-12-23T18:00:00',
          className: 'red',
        },
        {
          id: "Aca va un ID",
          title: 'Conference',
          start: '2021-12-23',
          end: '2021-12-23T12:30:00',
          className: 'purple',
        },
        {
          id: "Aca va un ID",
          title: 'Conference 2',
          start: '2021-12-23',
          end: '2021-12-23T12:30:00',
          className: 'green',
        },
        {
          id: "Aca va un ID",
          title: 'Meeting',
          start: '2021-12-24T10:30:00',
          end: '2021-12-24T12:30:00',
          className: 'green',
        },
        {
          id: "Aca va un ID",
          title: 'Digital Committee Workshop and Meeting',
          start: '2021-12-25T12:00:00',
          end: '2021-12-25T18:00:00',
          className: 'purple',
        },
        {
          id: "Aca va un ID",
          title: 'Meeting',
          start: '2021-12-26T14:30:00',
          end: '2021-12-26T19:30:00',
          className: ['gray','cancelled'],
        },
        {
          id: "Aca va un ID",
          title: 'Happy Hour',
          start: '2021-12-26T17:30:00',
          end: '2021-12-26T18:30:00',
          className: 'yellow',
        },
        {
          id: "Aca va un ID",
          title: 'Meeting',
          start: '2021-12-28T14:30:00',
          end: '2021-12-28T19:30:00',
          className: ['gray','postponed'],
        },
      ],
      eventClick: function(info) {
        openCard(info)
      },
    });
    calendar.render();
  }
}
//fn card
function openCard(i){
  let info = i;
  
  if(isMobile){
    let x = '83%';
    let y = info.jsEvent.clientY;
    gsap.fromTo(cardElement,{duration:0,x,y:y+40,autoAlpha:0},{duration:.5,autoAlpha:1,x,y,ease:'Power3.easeInOut'})
  } else {
    let x = info.jsEvent.clientX;
    let y = info.jsEvent.clientY;
    if (x < 200) {
      let x = info.jsEvent.clientX + 200
      gsap.fromTo(cardElement,{duration:0,x,y:y+40,autoAlpha:0},{duration:.5,autoAlpha:1,x,y,ease:'Power3.easeInOut'})
    } else {
      gsap.fromTo(cardElement,{duration:0,x,y:y+40,autoAlpha:0},{duration:.5,autoAlpha:1,x,y,ease:'Power3.easeInOut'})
    }
  }
 
}
const closeCardCalendar = document.querySelector('.closeCardCalendar');
closeCardCalendar.addEventListener('click', ()=>{
  gsap.to(cardElement,{duration:.3,autoAlpha:0,ease:'Power3.easeInOut'})
})

/* /Calendar 🔚 */