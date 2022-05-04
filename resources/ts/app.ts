import '../css/app.css'
import '../css/carroussel.scss'
import Alpine from 'alpinejs'
Alpine.data('dropdown', () => ({
  open: false,

  toggle() {
    this.open = !this.open
  }
}))

Alpine.data('navbar', () => ({
  navShow: false,
  navbar() { this.navShow = !this.navShow }
}))

Alpine.data('modal', () => ({
  open_modal: false,

  toggle_modal () {
    console.log('test modal')
    this.open = !this.open
  }
}))
Alpine.start()
