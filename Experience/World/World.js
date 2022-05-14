import Experience from '../Experience.js'
import Environment from './Environment.js'
import Objects from './Objects.js'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.resources.on('ready', () => {
      this.objects = new Objects()
      this.environment = new Environment()
    })
  }

  update() {
    if (this.objects) {
      this.objects.update()
    }
  }
}
