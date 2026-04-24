// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 20;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Texture loader
const loader = new THREE.TextureLoader();

// ------------------ ☀️ SUN ------------------
const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
  color: 0xffcc00
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Light from sun
const sunLight = new THREE.PointLight(0xffffff, 2, 200);
scene.add(sunLight);

// ------------------ 🌍 EARTH ------------------
const earthTexture = loader.load("earth.jpg");

const earthGeometry = new THREE.SphereGeometry(1.2, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

// Orbit pivot
const earthPivot = new THREE.Object3D();
scene.add(earthPivot);

earth.position.x = 10;
earthPivot.add(earth);

// ------------------ 🔴 MARS ------------------
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

const mars = createPlanet(0.8, 0xff3300, 14, 0.008);

// ------------------ 🟠 JUPITER ------------------
const jupiter = createPlanet(2, 0xff9966, 18, 0.004);

// ------------------ 🌌 STARS ------------------
function addStars() {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  for (let i = 0; i < 3000; i++) {
    vertices.push(
      (Math.random() - 0.5) * 300,
      (Math.random() - 0.5) * 300,
      (Math.random() - 0.5) * 300
    );
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  const material = new THREE.PointsMaterial({ color: 0xffffff });
  const stars = new THREE.Points(geometry, material);
  scene.add(stars);
}

addStars();

// ------------------ 🎮 MOUSE INTERACTION ------------------
document.addEventListener("mousemove", (e) => {
  camera.position.x = (e.clientX - window.innerWidth / 2) * 0.002;
  camera.position.y = -(e.clientY - window.innerHeight / 2) * 0.002;
});

// ------------------ 🔄 ANIMATION ------------------
function animate() {
  requestAnimationFrame(animate);

  // Sun rotation
  sun.rotation.y += 0.002;

  // Earth orbit + spin
  earthPivot.rotation.y += 0.01;
  earth.rotation.y += 0.02;

  // Other planets
  mars.pivot.rotation.y += mars.speed;
  mars.planet.rotation.y += 0.01;

  jupiter.pivot.rotation.y += jupiter.speed;
  jupiter.planet.rotation.y += 0.008;

  renderer.render(scene, camera);
}

animate();

// ------------------ 📱 RESPONSIVE ------------------
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
