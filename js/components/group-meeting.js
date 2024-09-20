import gsap from 'gsap';

const accordeon = document.querySelectorAll('.accordeon')
accordeon.forEach(e => {
  const bt = e.querySelector('.bt-accordeon')
  const mn = e.querySelector('.accordeon--main')
  bt.addEventListener('click', () => {
    let open = e.classList.contains('open')
    let height
    open ? height = 0 : height = 'auto'
    gsap.to(mn,{duration:2,height,ease:'Power3.easeOut'})
    e.classList.toggle('open')
  })
})