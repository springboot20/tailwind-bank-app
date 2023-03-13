const menu = document.querySelector('.nav-menu');
const menuBtn = document.getElementById('open-btn');
const closeBtn = document.querySelector('.close-icon')

function openMenu() {
  if (menuBtn && menu) {
    menu.classList.toggle('open')
  }

  return () => {
    closeBtn.addEventListener('click', (event) => {
      event.target.parentElement.classList.remove('open')
      console.log(event.target)
    })
  }
}
menuBtn.addEventListener('click', () => {
  openMenu()()
})
