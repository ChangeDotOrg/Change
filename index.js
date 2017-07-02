let scene, camera, renderer
let geometry, material, cube

document.body.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 87: //w
      cube.position.z -= 100
      break
    case 65: //a
      cube.position.x -= 100
      break
    case 83: //s
      cube.position.z += 100
      break
    case 68: //d
      cube.position.x += 100
      break
  }
})

init()
animate()

function init() {

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
  camera.position.z = 1500

  geometry = new THREE.BoxGeometry(3000, 3000, 3000)
  material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  })

  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.getElementById('game').appendChild(renderer.domElement)

}

function animate() {

  requestAnimationFrame(animate)

  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.02

  renderer.render(scene, camera)

}