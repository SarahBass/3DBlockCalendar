import * as THREE from './libs/three.module.js';
import { OBJLoader } from './libs/OBJLoader.js';

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222); // Dark gray background

const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Axes helper
scene.add(new THREE.AxesHelper(2));

// Load dayblock.obj
const loader = new OBJLoader();
loader.load(
  'models/dayblock.obj',
  (object) => {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0x6699ff,
          roughness: 0.5,
          metalness: 0.1
        });
      }
    });

    object.position.set(0, 0, 0);
    scene.add(object);
  },
  undefined,
  (err) => {
    console.error('Could not load model:', err);
  }
);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
