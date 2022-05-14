import * as THREE from 'three'
import Experience from './Experience.js'

export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.objectDistance = 4
    this.scrollY = window.scrollY

    this.setListener()
    this.setGroup()
    this.setInstance()
  }

  setGroup() {
    this.group = new THREE.Group()
    this.scene.add(this.group)
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    )
    this.instance.position.z = 8
    this.group.add(this.instance)
  }

  setListener() {
    this.cursor = {
      x: 0,
      y: 0,
    }
    window.addEventListener('mousemove', (event) => {
      this.cursor.x = event.clientX / this.sizes.width - 0.5
      this.cursor.y = event.clientY / this.sizes.height - 0.5
    })
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    this.scrollY = window.scrollY
    this.instance.position.y =
      (-this.scrollY / this.sizes.height) * this.objectDistance

    this.group.position.x += (this.cursor.x - this.group.position.x) * 0.1
    this.group.position.y += (-this.cursor.y - this.group.position.y) * 0.1
  }
}
