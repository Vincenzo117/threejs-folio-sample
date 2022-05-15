import * as THREE from 'three'
import gsap from 'gsap'
import Experience from '../Experience'

export default class Objects {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.time = this.experience.time
    this.resources = this.experience.resources
    this.debug = this.experience.debug
    this.objectDistance = this.experience.camera.objectDistance
    this.scroll = this.experience.scroll

    this.params = {
      color: 0x00e0ff,
    }

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Objects')
    }

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
      color: this.params.color,
      gradientMap: this.gradientTexture,
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

  setMeshes() {
    this.torus = new THREE.Mesh(this.torusGeometry, this.material)
    this.cone = new THREE.Mesh(this.coneGeometry, this.material)
    this.torusKnot = new THREE.Mesh(this.torusKnotGeometry, this.material)

    this.meshes = [this.torus, this.cone, this.torusKnot]

    this.meshes.forEach((mesh, i) => {
      if (i % 2 === 0) {
        mesh.position.x = 2
      } else {
        mesh.position.x = -2
      }
      mesh.position.y = i * -this.objectDistance
    })

    this.scene.add(...this.meshes)
  }

  update() {
    this.meshes.forEach((mesh, i) => {
      mesh.rotation.x += this.time.delta * 0.0002
      if (i % 2 === 0) {
        mesh.rotation.y += this.time.delta * 0.00025
      } else {
        mesh.rotation.z += this.time.delta * 0.00025
      }
    })
  }

  sectionChange() {
    gsap.to(this.meshes[this.scroll.currentSection].rotation, {
      duration: 1.5,
      ease: 'power2.inOut',
      x: '+=6',
      y: '+=3',
      z: '+=1.5',
    })
  }
}
