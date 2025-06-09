import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'dat.gui';

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

// const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

const camera = new THREE.OrthographicCamera(
  width / -20,
  width / 20,
  height / 20,
  height / -20,
  -1000,
  1000
);

const settings = {
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 10,
  animateTorus: true,
  resetRotation: function () {
    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;
    torus.rotation.set(0, 0, 0);
  },
  resetPosition: function () {
    this.cameraX = 0;
    this.cameraY = 0;
    this.cameraZ = 10;
    camera.position.set(0, 0, 10);
    controls.target.set(0, 0, 0); // Reset the orbit controls target
    controls.update(); // Update controls after changing target
    camera.updateProjectionMatrix();
  },
};

camera.position.x = settings.cameraX;
camera.position.y = settings.cameraY;
camera.position.z = settings.cameraZ;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas'),
  antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
  side: THREE.DoubleSide, // Ensure both sides of the geometry are rendered
  // wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);

torus.rotation.x = settings.rotationX;
torus.rotation.y = settings.rotationY;
torus.rotation.z = settings.rotationZ;

scene.add(torus);

const gui = new GUI();
const torusFolder = gui.addFolder('Torus Rotation');
torusFolder
  .add(settings, 'rotationX', -Math.PI, Math.PI)
  .onChange(value => (torus.rotation.x = value));
torusFolder
  .add(settings, 'rotationY', -Math.PI, Math.PI)
  .onChange(value => (torus.rotation.y = value));
torusFolder
  .add(settings, 'rotationZ', -Math.PI, Math.PI)
  .onChange(value => (torus.rotation.z = value));
torusFolder.add(settings, 'resetRotation').name('Reset Rotation');
torusFolder.add(settings, 'animateTorus').name('Animate');
torusFolder.open();

const cameraFolder = gui.addFolder('Camera Position');
cameraFolder.add(settings, 'cameraX', -50, 50).onChange(value => (camera.position.x = value));
cameraFolder.add(settings, 'cameraY', -50, 50).onChange(value => (camera.position.y = value));
cameraFolder.add(settings, 'cameraZ', -50, 50).onChange(value => (camera.position.z = value));
cameraFolder.add(settings, 'resetPosition').name('Reset Position');
cameraFolder
  .add({ fitCamera: () => adjustCameraToFitObject(torus, camera) }, 'fitCamera')
  .name('Fit to Torus');
cameraFolder.open();

const pointLight = new THREE.PointLight(0xffffff, 2, 0, 0);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
pointLight.position.set(20, 0, 0);
scene.add(pointLight, ambientLight);

// const cameraHelper = new THREE.CameraHelper(camera);
scene.add(
  // cameraHelper,
  new THREE.AxesHelper(10),
  // new THREE.GridHelper(200),
  new THREE.PointLightHelper(pointLight)
);

const controls = new OrbitControls(camera, renderer.domElement);

function addSpheres() {
  const geometry = new THREE.SphereGeometry(1, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(50));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(30).fill().map(addSpheres);

const spaceTexture = new THREE.TextureLoader().load('./assets/space.jpg');
scene.background = spaceTexture;

const jeffTexture = new THREE.TextureLoader().load('./assets/jeff.png');
const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: jeffTexture })
);
scene.add(jeff);
jeff.position.x = -20;

const moonTexture = new THREE.TextureLoader().load('./assets/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./assets/normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
scene.add(moon);

const moonPointLight = new THREE.PointLight(0x00ff00, 2, 10, 0);
moonPointLight.position.set(-5, 0, 0);
scene.add(moonPointLight, new THREE.PointLightHelper(moonPointLight));

function adjustCameraToFitObject(object, camera) {
  if (!object.geometry.boundingSphere) {
    object.geometry.computeBoundingSphere(); // Compute if not already available
  }
  const radius = object.geometry.boundingSphere.radius;
  const viewHeight = camera.top - camera.bottom;
  const viewWidth = camera.right - camera.left;
  const aspect = viewWidth / viewHeight;

  if (aspect > 1.0) {
    // Fit based on height
    camera.zoom = viewHeight / (2 * radius);
  } else {
    // Fit based on width
    camera.zoom = viewWidth / (2 * radius);
  }

  camera.updateProjectionMatrix();
}

// Adjust the camera to fit the torus
adjustCameraToFitObject(torus, camera);

function animate() {
  requestAnimationFrame(animate);

  if (settings.animateTorus) {
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();
