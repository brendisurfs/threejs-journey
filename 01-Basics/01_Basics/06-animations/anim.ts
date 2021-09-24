import * as THREE from "three";
import "../06-animations/style.css";
const canvas = document.querySelector("canvas.webgl");

const sizes = {
    height: window.innerHeight,
    width: window.innerWidth,
};

window.addEventListener("resize", () => {
    // update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // we put renderer.setSize here and with our renderer
    renderer.setSize(sizes.width, sizes.height);
});

//CURSOR
//	|
//	v HOW to get the coordinates of the mouse
const cursorLocation = {
    x: 0,
    y: 0,
};

window.addEventListener("mousemove", (event: any) => {
    // clientX and clientY
    // usually we want a range from -1 to 1

    cursorLocation.x = event.clientX / sizes.width - 0.5;
    cursorLocation.y = -(event.clientY / sizes.height - 0.5);
});

const scene = new THREE.Scene();

//OBJ
//	|
//	v
const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const mats = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geo, mats);

scene.add(mesh);

//CAMERA/RENDER
//	|
//	v

const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100
);
// update camera

camera.position.z = -5;
scene.add(camera);

// ORTHO CAMERA
const aspectRatio = sizes.width / sizes.height;

const orthoCamera = new THREE.OrthographicCamera(
    -1 * aspectRatio,
    1 * aspectRatio,
    1,
    -1,
    0.1,
    100
);

// creating controls
// const controls = new OrbitControls(camera, canvas);

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
});

renderer.setSize(sizes.width, sizes.height);
// use this for performance balancing.
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//GSAP ANIMATION
//	|
//	v
// moving with gsap
// gsap.to(mesh.position, {
// duration: 1, delay: 1, x: 2
// })

// ANIMATIONS
(function tick() {
    // update objects
    let current = Date.now();

    camera.position.x = Math.sin(cursorLocation.x * Math.PI);
    camera.position.y = Math.cos(cursorLocation.y * Math.PI);
    camera.lookAt(mesh.position);

    //render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
})();
