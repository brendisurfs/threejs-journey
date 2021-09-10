const THREE = require("three");

const scene = new THREE.Scene();

// Goal: create a red box mesh

const size = {
    width: 800,
    height: 600,
};

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: "black",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// add camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
scene.add(camera);

// RENDERER
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(size.width, size.height);

renderer.render(scene, camera);
