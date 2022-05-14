import Experience from '../Experience'

export default class Scroll {
  constructor() {
    this.experience = new Experience()

    this.scrollY = window.scrollY

    this.setLinstener()
  }

  setLinstener() {
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY
    })
  }
}
