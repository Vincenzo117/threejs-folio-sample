import * as THREE from 'three'
import Experience from '../Experience'

export default class Particles {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.objectDistance = this.experience.camera.objectDistance
    this.objectCout = this.experience.world.objects.meshes.length

    this.params = {
      color: 0xfb59eb,
    }

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Particles')
    }

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.particlesCount = 400
    this.positions = new Float32Array(this.particlesCount * 3)

    for (let i = 0; i < this.particlesCount; i++) {
      this.positions[i * 3 + 0] = (Math.random() - 0.5) * 10
      this.positions[i * 3 + 1] =
        this.objectDistance * 0.5 -
        Math.random() * this.objectDistance * this.objectCout
      this.positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }

    this.geometry = new THREE.BufferGeometry()
    this.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(this.positions, 3)
    )
  }

  setMaterial() {
    this.material = new THREE.PointsMaterial({
      color: this.params.color,
      sizeAttenuation: true,
      size: 0.03,
    })

    if (this.debug.active) {
      this.debugFolder
        .addColor(this.params, 'color')
        .name('material color')
        .onChange(() => {
          this.material.color.set(this.params.color)
        })
    }
  }

  setMesh() {
    this.mesh = new THREE.Points(this.geometry, this.material)

    this.scene.add(this.mesh)
  }
}
