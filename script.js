const textureLoader = new THREE.TextureLoader();

// Load Earth texture
const earthTexture = textureLoader.load("earth.jpg");

const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture
});

const earth = new THREE.Mesh(earthGeometry, earthMaterial);

// Orbit pivot
const earthPivot = new THREE.Object3D();
scene.add(earthPivot);

earth.position.x = 8;
earthPivot.add(earth);
