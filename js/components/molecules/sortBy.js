let btnSortBy = document.querySelectorAll('.sortby button')

btnSortBy.forEach( e => e.addEventListener('click', ()=>{
    btnSortBy.forEach(b=>b.classList.add('disabled'))
    e.classList.remove('disabled')
}))

