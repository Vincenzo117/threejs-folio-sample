import * as THREE from 'three'
import Experience from '../Experience'

export default class Particles {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.objectDistance = this.experience.camera.objectDistance
    this.objectCout = this.experience.world.objects.meshes.length

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
      color: 0xffffff,
      sizeAttenuation: true,
      size: 0.03,
    })
  }

  setMesh() {
    this.mesh = new THREE.Points(this.geometry, this.material)

    this.scene.add(this.mesh)
  }
}
