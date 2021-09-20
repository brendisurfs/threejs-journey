import * as THREE from "three";

const canvas = document.querySelector("canvas.webgl");
const sizes = {
    height: 800,
    width: 1200,
};

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
    cursorLocation.y = event.clientY / sizes.height - 0.5;
    console.log(cursorLocation);
});

const scene = new THREE.Scene();

//OBJ
//	|
//	v
const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const mats = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geo, mats);
{
    mesh.position.z = -1;
}

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
{
    camera.position.z = 5;
    scene.add(camera);
}

// ORTHO CAMERA
const aspectRatio = sizes.width / sizes.height;
console.log(aspectRatio);

const orthoCamera = new THREE.OrthographicCamera(
    -1 * aspectRatio,
    1 * aspectRatio,
    1,
    -1,
    0.1,
    100
);

const renderer = new THREE.WebGLRenderer({
    canvas,
});
{
    renderer.setSize(sizes.width, sizes.height);
}
let time = Date.now();

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
    let delta = current - time;
    time = current;
    // mesh.rotation.y += 0.001 * delta;
    // mesh.rotation.x += 0.001 * delta;
    camera.lookAt(mesh.position);
    //render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
})();
