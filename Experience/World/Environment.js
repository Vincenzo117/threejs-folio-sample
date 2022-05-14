import * as THREE from 'three'
import Experience from '../Experience'

export default class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setDirectionalLight()
    this.setEnvironmentMap()
  }

  setDirectionalLight() {
    this.directionalLight = new THREE.DirectionalLight('#ffffff', 0.5)
    this.directionalLight.position.set(1, 1, 0)
    this.scene.add(this.directionalLight)
  }

  setEnvironmentMap() {
    // EnvironmentMap setup
  }
}
