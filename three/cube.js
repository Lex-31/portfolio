import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const element = document.getElementById('cube');

const width = element.clientWidth;
const height = element.clientHeight;

// init
const camera = new THREE.PerspectiveCamera(40, width / height, 0.01, 10);
camera.position.z = 1;

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// create and add axes helper
const axesHelper = new THREE.AxesHelper(0.5);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setAnimationLoop(animate); // новый вариант запуска цикла анимации, является альтернативой использования requestAnimationFrame
element.appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);

// animation
function animate(time) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;
  renderer.render(scene, camera);
}