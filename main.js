import * as THREE from './libs/three.module.js';
import { OBJLoader } from './libs/OBJLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('calendarCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Load OBJ
const loader = new OBJLoader();
loader.load('models/Calendarset.obj', function (object) {
  object.traverse(child => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({ color: 0x6699ff });
    }
  });
  scene.add(object);
  object.position.y = -1;
}, undefined, function (error) {
  console.error('An error happened', error);
});

camera.position.z = 5;

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
