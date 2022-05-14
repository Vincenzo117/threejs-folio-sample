import * as THREE from 'three'
import Experience from '../Experience'

export default class Objects {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.time = this.experience.time
    this.resources = this.experience.resources
    this.objectDistance = this.experience.camera.objectDistance

    this.setGeometries()
    this.setTexture()
    this.setMaterials()
    this.setMeshes()
  }

  setGeometries() {
    this.torusGeometry = new THREE.TorusBufferGeometry(1, 0.4, 16, 60)
    this.coneGeometry = new THREE.ConeBufferGeometry(1, 2, 32)
    this.torusKnotGeometry = new THREE.TorusKnotBufferGeometry(
      0.8,
      0.35,
      100,
      16
    )
  }

  setTexture() {
    this.gradientTexture = this.resources.items['gradientTexture']
    this.gradientTexture.magFilter = THREE.NearestFilter
  }

  setMaterials() {
    this.material = new THREE.MeshToonMaterial({
      color: 0xffffff,
      // gradientMap: this.gradientTexture
    })
  }

  setMeshes() {
    this.torus = new THREE.Mesh(this.torusGeometry, this.material)
    this.cone = new THREE.Mesh(this.coneGeometry, this.material)
    this.torusKnot = new THREE.Mesh(this.torusKnotGeometry, this.material)

    this.torus.position.y = 0
    this.cone.position.y = -this.objectDistance
    this.torusKnot.position.y = -this.objectDistance * 2

    this.torus.position.x = 2
    this.cone.position.x = -2
    this.torusKnot.position.x = 2

    this.scene.add(this.torus, this.cone, this.torusKnot)
  }

  update() {
    this.torus.rotation.x = this.time.elapsed * 0.00043
    this.torus.rotation.y = this.time.elapsed * 0.0004

    this.cone.rotation.x = this.time.elapsed * 0.00043
    this.cone.rotation.z = this.time.elapsed * 0.0004

    this.torusKnot.rotation.x = this.time.elapsed * 0.00043
    this.torusKnot.rotation.y = this.time.elapsed * 0.0004
  }
}
