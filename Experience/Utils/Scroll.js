import Experience from '../Experience'
import EventEmitter from './EventEmitter'

export default class Scroll extends EventEmitter {
  constructor() {
    super()

    this.experience = new Experience()
    this.sizes = this.experience.sizes

    this.scrollY = window.scrollY
    this.currentSection = 0
    this.newSection = 0

    this.setLinstener()
  }

  setLinstener() {
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY

      this.newSection = Math.round(this.scrollY / this.sizes.height)

      if (this.currentSection !== this.newSection) {
        this.currentSection = this.newSection
        this.trigger('sectionChanged')
      }
    })
  }
}
