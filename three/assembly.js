import * as THREE from 'three';

const element = document.getElementById('assembly');

const width = element.clientWidth; // 80% от ширины окна
const height = width / (16 / 9); // сохраняем соотношение сторон 16:9

// Создаем сцену
const scene = new THREE.Scene();
// Создаем камеру
const fov = 75; // угол камеры по вертикали
const aspect = width / height;  // отношение ширины к высоте холста
const near = 0.1; // граница видимого пространства перед камерой
const far = 20; // дальняя граница от камеры после которой не будет видно объектов
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10; // отодвигаем камеру от начала кординат чтобы чтото видеть (должно быть z > near)

// create and add axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Создаем рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true }); // создаем объект - рендер. antialias: true - включаем сглаживание краев
renderer.setSize(width, height); // устанавливаем размер рендера
// Создаем групповой объект
const group = new THREE.Group();

element.appendChild(renderer.domElement); // добавляем html элемент canvas в div

// Создаем плоскость
const planeGeometry = new THREE.PlaneGeometry(5, 5); // создание плоскости с шириной и высотой 
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }); // выбираем цвет материала и что видна будет плоскость с 2х сторон
const plane = new THREE.Mesh(planeGeometry, planeMaterial); // создаем объект
plane.position.set(0, 0, 0); // позиция плоскости в координатной системе
group.add(plane); // добавляем плоскость в группу

// Создаем прямоугольник
const boxGeometry = new THREE.BoxGeometry(2, 2, 1); // ширина, высота, глубина
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // материал для непрозрачных плоскостей
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // материал для линий контуров
const box = new THREE.Mesh(boxGeometry, boxMaterial); // непрозрачный объект
const edgeGeometry = new THREE.EdgesGeometry(boxGeometry); // создает геометрию контура прямоугольника, используя геометрию прямоугольника, которая была создана ранее
const edgeMesh = new THREE.LineSegments(edgeGeometry, edgeMaterial); // объект контура прямоугольника
box.add(edgeMesh); // Добавляем контурный объект в непрозрачный объект
box.position.set(0, 1, 0.5);
group.add(box); // Добавляем непрозрачный объект в группу

// Создаем геометрию пирамиды
const pyramidGeometry = new THREE.BufferGeometry(); // создание геометрию фигуры из массива данных
const vertices = new Float32Array([ // создаем вершины пирамиды
  // Основание пирамиды (квадрат)
  -1, 0, -1, // x, y, z каждой вершины пирамиды
  1, 0, -1,
  1, 0, 1,
  -1, 0, 1,
  // Вершина пирамиды
  0, 2, 0
]);
pyramidGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3)); // устанавливаем позиции вершин пирамиды в геометрии используя массив vertices и что каждая вершина состоит из 3х координат. position - определяет позиции вершин объекта в трехмерном пространстве.
const indices = new Uint16Array([ // Устанавливаем грани пирамиды. Массив содержит индексы вершин, которые образуют каждую грань пирамиды
  // Основание пирамиды
  0, 1, 2,
  0, 2, 3,
  // Боковые грани пирамиды
  0, 4, 1,
  1, 4, 2,
  2, 4, 3,
  3, 4, 0
]);
pyramidGeometry.setIndex(new THREE.BufferAttribute(indices, 1)); // устанавливает индексы граней объекта в геометрии. Индексы граней определяют, какие вершины объекта соединяются между собой, образуя грань. используя массив indices и определяя, что каждый индекс состоит из одного элемента массива
const pyramidMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // материал для непрозрачных плоскостей пирамиды
const edgePyramidMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // материал для контуров пирамиды
const pyramidMesh = new THREE.Mesh(pyramidGeometry, pyramidMaterial); // непрозрачный объект пирамиды
const edgePyramidGeometry = new THREE.EdgesGeometry(pyramidGeometry); // создает геометрию контура пирамиды
const edgePyramidMesh = new THREE.LineSegments(edgePyramidGeometry, edgePyramidMaterial); //создает объект контура пирамиды, используя геометрию и материал контура, которые были созданы ранее
pyramidMesh.add(edgePyramidMesh); // Добавляем контурный объект в непрозрачный объект пирамиды
pyramidMesh.position.set(0, 1, 1); // устанавливает позицию объекта пирамиды в группе
pyramidMesh.rotateX(Math.PI / 2); // поворачиваем пирамиду относит оси х на 90град
group.add(pyramidMesh); // Добавляем непрозрачный объект пирамиды в группу

scene.add(group); // Добавляем групповой объект на сцену

// Создаем освещение
const light = new THREE.PointLight(0xffffff, 1, 1000); // создает объект точечного источника света. цвет света, 1 - макс интенсивность света, 1000 - расстояние на которое светит источник
light.position.set(0, 0, 5); // позиция источника света
scene.add(light); // добавляем источник света на сцену

// Создаем переменную для режима вращения/перемещения
let mode = 'rotate'; // по умолчанию режим вращения

// Создаем кнопки для переключения режима вращения/перемещения
const rotateButton = document.createElement('button'); // кнопка вращения
rotateButton.textContent = 'Rotate';
rotateButton.classList.add('active'); // по умолчанию активна кнопка вращения
rotateButton.addEventListener('click', () => {
  mode = 'rotate';
  rotateButton.classList.add('active');
  moveButton.classList.remove('active');
});
const moveButton = document.createElement('button'); // кнопка перемещения
moveButton.textContent = 'Move';
moveButton.addEventListener('click', () => {
  mode = 'move';
  rotateButton.classList.remove('active');
  moveButton.classList.add('active');
});
const resetButton = document.createElement('button'); // кнопка сброса
resetButton.textContent = 'Reset';
resetButton.addEventListener('click', () => {
  mode = 'rotate';
  rotateButton.classList.add('active');
  moveButton.classList.remove('active');
  unmount.classList.remove('active');
  scene.position.set(0, 0, 0); // возвращаем сцену на исходное место
  scene.rotation.set(0, 0, 0); // вращение тоже в исходный вид
  box.position.z = 0.5; // отменяем разъединение
  pyramidMesh.position.z = 1;
})
const unmount = document.createElement('button'); // разъединение элементов
unmount.textContent = 'Unmount';
unmount.addEventListener('click', () => {
  unmount.classList.toggle('active');
  if (unmount.classList.contains('active')) {
    box.position.z = 1.5; // размеры при разъединении
    pyramidMesh.position.z = 3; // размеры при разъединении
  } else {
    box.position.z = 0.5; // исходные размеры
    pyramidMesh.position.z = 1; // исходные размеры
  }
})

// Добавляем кнопки в DOM
const controls = document.createElement('div');
controls.classList.add('controls');
controls.appendChild(rotateButton);
controls.appendChild(moveButton);
controls.appendChild(resetButton);
controls.appendChild(unmount);
element.appendChild(controls);

// Создаем переменные для перемещения сцены
let isMouseDown = false;
let mouseX = 0;
let mouseY = 0;

// Добавляем обработчики событий мыши для перемещения сцены
element.addEventListener('pointerdown', (event) => { // происходит, когда пользователь нажимает любую кнопку мыши
  if (event.button === 0) { // левая кнопка мыши
    isMouseDown = true;
    mouseX = event.clientX; // возвращает горизонтальную координату курсора мыши относительно левого верхнего угла окна браузера
    mouseY = event.clientY; // возвращает вертикальную координату курсора мыши относительно левого верхнего угла окна браузера
  }
});
element.addEventListener('pointermove', (event) => {
  if (isMouseDown) {
    if (mode === 'rotate') { // вращаем сцену
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      scene.rotation.y += deltaX * 0.005;
      scene.rotation.x += deltaY * 0.005;
      mouseX = event.clientX; // горизонтальная координата мыши
      mouseY = event.clientY;
    } else if (mode === 'move') { // перемещаем сцену
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      // Перемещение сцены по горизонтали и вертикали
      scene.position.x += deltaX * 0.01;
      scene.position.y -= deltaY * 0.01;

      mouseX = event.clientX; // для предскажуемого перемещения
      mouseY = event.clientY;
    }
  }
});
element.addEventListener('pointerup', (event) => { // происходит, когда пользователь отпускает кнопку мыши
  if (event.button === 0) { // левая кнопка мыши
    isMouseDown = false;
  }
});

// Добавляем обработчик события колесика мыши для масштабирования сцены
let scale = 1; // начальный масштаб
element.addEventListener('wheel', (event) => {
  event.preventDefault(); // предотвращаем всплытие события и прокрутку сайта
  const delta = Math.sign(event.deltaY); // определяем направление прокрутки: -1 для прокрутки вверх, 1 для прокрутки вниз
  const scaleFactor = 0.1; // задаем шаг изменения масштаба
  const newScale = scale + delta * scaleFactor; // вычисляем новый масштаб
  const clampedScale = Math.max(0.1, Math.min(2, newScale));   // ограничиваем масштаб диапазоном от 0.1 до 2
  scene.scale.set(clampedScale, clampedScale, clampedScale); // применяем масштабирование к сцене
  scale = clampedScale; // обновляем значение масштаба
});

// Добавляем функцию moveScene в цикл анимации
function animate() {
  renderer.render(scene, camera); // обновление сцены Three.js с помощью рендерера, созданного ранее
  requestAnimationFrame(animate); // вызов следующего кадра анимации
}
requestAnimationFrame(animate); // Запуск анимации