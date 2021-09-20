import * as THREE from "three";

// NEED TO KNOW QUATERNIONS AND MATRICIES
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let mesh: THREE.Mesh;
let renderer: THREE.WebGLRenderer;
let axisHelper: THREE.AxesHelper;

const canvas = document.querySelector(".webgl");

const size = {
    width: 800,
    height: 600,
};

scene = new THREE.Scene();

const boxGroup = new THREE.Group();
boxGroup.scale.y = 2;
boxGroup.rotation.y = 0.2;
scene.add(boxGroup);

mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({
        color: "orange",
    })
);
// remember axis order
{
    // THIS IS USEFUL
    mesh.rotation.reorder("YXZ");
    mesh.scale.x = 2;
    mesh.position.z = -0.1;
    mesh.rotation.x = Math.PI * 0.35;
    mesh.rotation.y = Math.PI * 0.25;
}
boxGroup.add(mesh);

const cubeTwo = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: "red",
    })
);
cubeTwo.position.x = -0.2;
boxGroup.add(cubeTwo);

const cubeThree = new THREE.Mesh(
    new THREE.BoxGeometry(1, -0.2, 1),
    new THREE.MeshBasicMaterial({
        color: "blue",
    })
);
cubeThree.position.x = 2;
boxGroup.add(cubeThree);

// axisHelper = new THREE.AxesHelper(0.5);
// scene.add(axisHelper);

//CAMERA
//	|
//	v
camera = new THREE.PerspectiveCamera(35, size.width / size.height);
{
    camera.position.z = 5;
    scene.add(camera);
}

//RENDERER
//	|
//	v
renderer = new THREE.WebGLRenderer({
    canvas,
});
{
    renderer.setSize(size.width, size.height);
    renderer.render(scene, camera);
}
