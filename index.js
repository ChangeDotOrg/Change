let scene, camera, renderer
let geometry, material, mesh

document.body.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 87: //w
      mesh.position.z -= 100
      break
    case 65: //a
      mesh.position.x -= 100
      break
    case 83: //s
      mesh.position.z += 100
      break
    case 68: //d
      mesh.position.x += 100
      break
  }
})

init()
animate()

function init() {

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
  camera.position.z = 1000

  geometry = new THREE.BoxGeometry(300, 300, 300)
  material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  })

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.getElementById('game').appendChild(renderer.domElement)

}

function animate() {

  requestAnimationFrame(animate)

  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.02

  renderer.render(scene, camera)

}