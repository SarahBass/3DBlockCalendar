import * as THREE from './libs/three.module.js';
import { OBJLoader } from './libs/OBJLoader.js';

// Scene and Camera setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('calendarCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set background color of the scene
renderer.setClearColor(0x222222);  // dark gray background

// Lighting setup
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Optional ambient light to brighten the scene
scene.add(new THREE.AmbientLight(0xffffff, 0.5));  // Soft ambient light

// Load the Calendar model
const loader = new OBJLoader();
loader.load('models/Calendarset.obj', function (object) {
  // Apply color to all meshes in the loaded object
  object.traverse(child => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: 0x6699ff,  // A soft blue color for the blocks
        roughness: 0.5,
        metalness: 0.1
      });
    }
  });
  
  // Add the loaded object to the scene
  scene.add(object);
  
  // Position the object (optional adjustment for visibility)
  object.position.y = 0;  // Temporarily center it
}, undefined, function (error) {
  console.error('An error happened', error);
});

// Add axes helper to visualize the scene's axes (optional)
scene.add(new THREE.AxesHelper(2));  // Visualize X, Y, Z axes

// Camera position (ensure it's far enough to see the objects)
camera.position.set(0, 0, 5);

// Render function to animate the scene
function animate() {
  requestAnimationFrame(animate);
  
  // Optional: add controls for rotation with mouse or touch (uncomment the next two lines if you want)
  // controls.update();  // for OrbitControls (if you use them)

  renderer.render(scene, camera);
}

// Call the animate function
animate();
