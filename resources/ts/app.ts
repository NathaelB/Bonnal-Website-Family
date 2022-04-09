import '../css/app.css'
import '../css/carroussel.scss'
import Alpine from 'alpinejs'

Alpine.data('dropdown', () => ({
  open: false,

  toggle() {
    this.open = !this.open
  }
}))

Alpine.start()
