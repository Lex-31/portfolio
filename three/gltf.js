import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const element = document.getElementById('gltf');

const width = element.clientWidth; // 50% от ширины окна
const height = width / 1; // сохраняем соотношение сторон 1:1

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 3;

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
element.appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();
loader.load('Xbot.glb', (gltf) => {
  scene.add(gltf.scene);
}, undefined, function (error) {
  console.error(error);
});

// Создаем освещение
const light = new THREE.PointLight(0xffffff, 500, 100); // создает объект точечного источника света. цвет света, 500 - макс интенсивность света, 100 - расстояние на которое светит источник
light.position.set(0, 0, 20); // позиция источника света
scene.add(light); // добавляем источник света на сцену

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();