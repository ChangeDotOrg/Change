// let scene, camera, renderer
// let geometry, material, cube

document.body.addEventListener("keydown", (e) => {
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


// init()
// animate()

// function init() {

//   scene = new THREE.Scene()

//   camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
//   camera.position.z = 1500

//   geometry = new THREE.BoxGeometry(3000, 3000, 3000)
//   material = new THREE.MeshBasicMaterial({
//     color: 0xff0000,
//     wireframe: true
//   })

//   cube = new THREE.Mesh(geometry, material)
//   scene.add(cube)

//   renderer = new THREE.WebGLRenderer()
//   renderer.setSize(window.innerWidth, window.innerHeight)

//   document.getElementById('game').appendChild(renderer.domElement)

// }

// function animate() {

//   requestAnimationFrame(animate)

//   // cube.rotation.x += 0.01
//   // cube.rotation.y += 0.02

//   renderer.render(scene, camera)

// }

const THREE = require("three")

let container, stats
let camera, scene, renderer, raycaster

// let mouse = new THREE.Vector2()
// let INTERSECTED = null
// let radius = 100
// let  theta = 0

//cube lets
let cube, plane
let targetRotation = 0
let targetRotationOnMouseDown = 0
let mouseX = 0
let mouseXOnMouseDown = 0

let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2

init()
animate()

function init() {

  container = document.getElementById("game")

  // let info = document.createElement('div');
  // info.style.position = 'absolute';
  // info.style.top = '10px';
  // info.style.width = '100%';
  // info.style.textAlign = 'center';
  // info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - interactive cubes';
  // container.appendChild(info);

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000)
  camera.position.y = 150
  camera.position.z = 500
  scene = new THREE.Scene()

  let light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(1, 1, 1).normalize()
  scene.add(light)

  //cube geometry
  let geo = new THREE.BoxGeometry(200, 200, 200)

  for (let i = 0; i < geo.faces.length; i += 2) {
    let hex = Math.random() * 0xffffff
    geo.faces[i].color.setHex(hex)
    geo.faces[i + 1].color.setHex(hex)
  }
  let material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.FaceColors,
    overdraw: 0.5
  })

  cube = new THREE.Mesh(geo, material)
  cube.position.y = 150
  scene.add(cube)

  createPlane()
  //multicube geometry
  // let geometry = new THREE.BoxBufferGeometry(20, 20, 20);

  // for (let i = 0; i < 2000; i++) {

  //   let object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
  //     color: Math.random() * 0xffffff
  //   }));

  //   object.position.x = Math.random() * 800 - 400;
  //   object.position.y = Math.random() * 800 - 400;
  //   object.position.z = Math.random() * 800 - 400;

  //   object.rotation.x = Math.random() * 2 * Math.PI;
  //   object.rotation.y = Math.random() * 2 * Math.PI;
  //   object.rotation.z = Math.random() * 2 * Math.PI;

  //   object.scale.x = Math.random() + 0.5;
  //   object.scale.y = Math.random() + 0.5;
  //   object.scale.z = Math.random() + 0.5;

  //   scene.add(object);
  // }

  raycaster = new THREE.Raycaster()

  renderer = new THREE.WebGLRenderer()
  renderer.setClearColor(0xf0f0f0)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.sortObjects = false
  container.appendChild(renderer.domElement)

  stats = new Stats()
  container.appendChild(stats.dom)

  // document.addEventListener('mousemove', onDocumentMouseMove, false);

  //

  document.addEventListener("mousedown", onDocumentMouseDown, false)
  document.addEventListener("touchstart", onDocumentTouchStart, false)
  document.addEventListener("touchmove", onDocumentTouchMove, false)
  window.addEventListener("resize", onWindowResize, false)

}


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)

}

// function onDocumentMouseMove(event) {

//   event.preventDefault()

//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

// }

function animate() {

  requestAnimationFrame(animate)
  stats.begin()
  render()
  stats.end()
  // stats.update();

}

function render() {

  // theta += 0.1;
  cube.rotation.y += (targetRotation - cube.rotation.y) * 0.05
  // camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
  // camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
  // camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
  // camera.lookAt(scene.position);

  // camera.updateMatrixWorld();

  // // find intersections

  // raycaster.setFromCamera(mouse, camera);

  // let intersects = raycaster.intersectObjects(scene.children);

  // if (intersects.length > 0) {

  //   if (INTERSECTED != intersects[0].object) {

  //     if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

  //     INTERSECTED = intersects[0].object;
  //     INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
  //     INTERSECTED.material.emissive.setHex(0xff0000);

  //   }

  // } else {

  //   if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

  //   INTERSECTED = null;

  // }

  renderer.render(scene, camera)

}

function createPlane() {
  let geometry = new THREE.PlaneBufferGeometry(1000, 1000)
  geometry.rotateX(-Math.PI / 2)

  let material = new THREE.MeshBasicMaterial({
    color: 0xe0e0e0,
    overdraw: 0.5
  })

  plane = new THREE.Mesh(geometry, material)
  scene.add(plane)
}

function onDocumentMouseDown(event) {

  event.preventDefault()

  document.addEventListener("mousemove", onDocumentMouseMove, false)
  document.addEventListener("mouseup", onDocumentMouseUp, false)
  document.addEventListener("mouseout", onDocumentMouseOut, false)

  mouseXOnMouseDown = event.clientX - windowHalfX
  targetRotationOnMouseDown = targetRotation

}

function onDocumentMouseMove(event) {

  mouseX = event.clientX - windowHalfX

  targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02

}

function onDocumentMouseUp(event) {

  document.removeEventListener("mousemove", onDocumentMouseMove, false)
  document.removeEventListener("mouseup", onDocumentMouseUp, false)
  document.removeEventListener("mouseout", onDocumentMouseOut, false)

}

function onDocumentMouseOut(event) {

  document.removeEventListener("mousemove", onDocumentMouseMove, false)
  document.removeEventListener("mouseup", onDocumentMouseUp, false)
  document.removeEventListener("mouseout", onDocumentMouseOut, false)

}

function onDocumentTouchStart(event) {

  if (event.touches.length === 1) {

    event.preventDefault()

    mouseXOnMouseDown = event.touches[0].pageX - windowHalfX
    targetRotationOnMouseDown = targetRotation

  }

}

function onDocumentTouchMove(event) {

  if (event.touches.length === 1) {

    event.preventDefault()

    mouseX = event.touches[0].pageX - windowHalfX
    targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05

  }

}