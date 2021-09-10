import * as THREE from "three";

// NEED TO KNOW QUATERNIONS AND MATRICIES
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let mesh: THREE.Mesh;
let renderer: THREE.WebGLRenderer;

const canvas = document.querySelector(".webgl");

const size = {
    width: 800,
    height: 600,
};

scene = new THREE.Scene();

const geo = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});
mesh = new THREE.Mesh(geo, material);
mesh.position.x = 0;
scene.add(mesh);

//CAMERA
//	|
//	v
camera = new THREE.PerspectiveCamera(35, size.width / size.height);
camera.position.z = 3;
scene.add(camera);

//RENDERER
//	|
//	v
renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);
