let btns = document.querySelectorAll('.navTabs button')

btns.forEach( e => e.addEventListener('click', ()=>{
    let father = e.closest('.navTabs')
    let allChild = father.querySelectorAll('.navTabs button')
    allChild.forEach(b=>b.classList.remove('active'))
    e.classList.add('active')
}))