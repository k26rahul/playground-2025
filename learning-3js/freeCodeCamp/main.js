import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
// import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

// python.autocomplete.addBrackets
// javascript.suggest.completeFunctionCall

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas'),
  antialias: true,
});
renderer.setSize(w, h);
renderer.setPixelRatio(window.devicePixelRatio);

const camera = new THREE.PerspectiveCamera(75, w / h, 1, 10000);

// const camera = new THREE.OrthographicCamera(
//   -1 * (w / h), // left
//   1 * (w / h), // right
//   1, // top
//   -1, // bottom
//   0.1, // near
//   10000 // far
// );

// const camera = new THREE.OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 1, 1000);

camera.position.z = 2;

const scene = new THREE.Scene();

const geo = new THREE.IcosahedronGeometry(1, 2);
const mat = new THREE.MeshStandardMaterial({
  // color: 0xccff,
  color: 0xffffff,
  flatShading: true,
  // wireframe: true,
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const wireMash = new THREE.Mesh(geo, wireMat);
wireMash.scale.setScalar(1.001);
mesh.add(wireMash);

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

scene.add(new THREE.AxesHelper(3));

const controls = new OrbitControls(camera, renderer.domElement);
// const controls = new MapControls(camera, renderer.domElement);
// const controls = new FlyControls(camera, renderer.domElement);
// const controls = new TransformControls(camera, renderer.domElement);

// https://threejs.org/docs/#examples/en/controls/MapControls

controls.enableDamping = true;
controls.autoRotate = true;

// controls.dragToLook = true;
// controls.enablePan = false;
// controls.screenSpacePanning = false;

function animate(t = 0) {
  requestAnimationFrame(animate);

  // mesh.scale.setScalar(Math.cos(t * 0.0005) + 0.1);
  // mesh.rotation.y += 0.001;

  controls.update();
  renderer.render(scene, camera);
}

animate();
