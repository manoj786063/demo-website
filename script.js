// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 15;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Lights
const sunLight = new THREE.PointLight(0xffffff, 2, 100);
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Sun
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Planet function
function createPlanet(size, color, distance, speed) {
  const geometry = new THREE.SphereGeometry(size, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color });
  const planet = new THREE.Mesh(geometry, material);

  const pivot = new THREE.Object3D();
  scene.add(pivot);

  planet.position.x = distance;
  pivot.add(planet);

  return { planet, pivot, speed };
}

// Planets
const planet1 = createPlanet(0.5, 0x3399ff, 5, 0.02);
const planet2 = createPlanet(0.7, 0xff6633, 8, 0.015);
const planet3 = createPlanet(1, 0x66ff66, 11, 0.01);

// Animation
function animate() {
  requestAnimationFrame(animate);

  // Sun rotation
  sun.rotation.y += 0.005;

  // Planet orbits
  planet1.pivot.rotation.y += planet1.speed;
  planet2.pivot.rotation.y += planet2.speed;
  planet3.pivot.rotation.y += planet3.speed;

  // Planet spin
  planet1.planet.rotation.y += 0.02;
  planet2.planet.rotation.y += 0.018;
  planet3.planet.rotation.y += 0.015;

  renderer.render(scene, camera);
}

animate();

// Resize fix
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
