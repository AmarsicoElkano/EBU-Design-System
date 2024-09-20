let btns = document.querySelectorAll('.btn_tab')

btns.forEach( e => e.addEventListener('click', ()=>{
    let father = e.closest('.content_tabs')
    let allChild = father.querySelectorAll('.btn_tab')
    allChild.forEach(b=>b.classList.remove('active'))
    e.classList.add('active')
}))

