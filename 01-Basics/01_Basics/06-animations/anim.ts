import * as THREE from 'three'
import '../06-animations/style.css'
import * as dat from 'dat.gui'

//DEBUG INIT
//	|
//	v
const debugGUI = new dat.GUI()

const debugObject = {
    color: 0xff0000,
}

debugGUI.addColor(debugObject, 'color').onChange(() => {
    console.log('change!')
})

const MESH_DEFAULT_VISIBILITY = true

const canvas: Element =
    document.querySelector('canvas.webgl')

const sizes = {
    height: window.innerHeight,
    width: window.innerWidth,
}
/* 
*
*
----------------------WINDOW----------------------
*/
window.addEventListener('resize', () => {
    // update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // we put renderer.setSize here and with our renderer
    renderer.setSize(sizes.width, sizes.height)
})

window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})

//	----------------CURSOR---------------------
//	|
//	v HOW to get the coordinates of the mouse
const cursorLocation = {
    x: 0,
    y: 0,
}

window.addEventListener('mousemove', (event: any) => {
    cursorLocation.x = event.clientX / sizes.width - 0.5
    cursorLocation.y = -(event.clientY / sizes.height - 0.5)
})

const scene = new THREE.Scene()

/*
 *
 *
 * v-------------------TEXTURES----------------------v
 * |
 * |
 * v
 */
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(
    '/06-animations/vefmeccn_4K_Albedo.jpg',
)

//------------------------OBJ----------------------
//	|
//	v
const geo: THREE.BoxGeometry = new THREE.BoxGeometry(
    0.5,
    0.5,
    0.5,
)
const gridGeo = new THREE.PlaneGeometry(2, 2, 2)
// float32 array info
// const positionsArray: Float32Array = new Float32Array([
// 0, 0, 0, 0, 1, 0, 1, 0, 0,
// ])
// const posAttrib = new THREE.BufferAttribute(
// positionsArray,
// 3,
// )
const geometry = new THREE.BufferGeometry()

let count = 50
const posArr = new Float32Array(count * 3 * 3)
for (let i = 0; i < count * 3 * 3; i++) {
    posArr[i] = Math.random() - 0.5
}

const positionAttribute = new THREE.BufferAttribute(
    posArr,
    3,
)

geometry.setAttribute('position', positionAttribute)
geometry.computeVertexNormals()
// geometry.setAttribute('position', posAttrib)

const mats = new THREE.MeshBasicMaterial({
    map: texture,
})
const gridmesh = new THREE.Mesh(gridGeo, mats)
gridmesh.rotation.x = -1.5
gridmesh.position.y = -0.5
const mesh = new THREE.Mesh(geo, mats)
mesh.visible = MESH_DEFAULT_VISIBILITY

/*
 *
 *
 * v-------------------GUI DEBUG ADDITIONS----------------------v
 */
debugGUI.add(mesh, 'visible')
debugGUI
    .add(mesh.position, 'y')
    .min(-1)
    .max(1)
    .step(0.01)
    .name('elevation')

// ============================================================>
// #NOTE: ADD MESH TO SCENE
scene.add(mesh)
scene.add(gridmesh)

/*
 *
 *
 * v-------------------CAMERA + RENDERER----------------------v
 * |
 * |
 * v
 */
const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100,
)
// update camera
camera.position.z = -5
scene.add(camera)

// ORTHO CAMERA
const aspectRatio = sizes.width / sizes.height

const orthoCamera = new THREE.OrthographicCamera(
    -1 * aspectRatio,
    1 * aspectRatio,
    1,
    -1,
    0.1,
    100,
)

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
})

renderer.setSize(sizes.width, sizes.height)
// use this for performance balancing.
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// RENDER LOOP
;(function tick() {
    // update objects
    camera.position.x = Math.sin(cursorLocation.x * Math.PI)
    camera.position.y = Math.cos(cursorLocation.y * Math.PI)
    camera.lookAt(mesh.position)

    //render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
})()
