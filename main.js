// Create the scene
const scene = new THREE.Scene();

// Create a camera, which determines what we'll see when we render the scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer and add it to the DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(700, 600);
document.body.appendChild(renderer.domElement);

// Create a geometry and a material, then combine them into a mesh for the cube
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Add the cube to the scene
scene.add(cube);

// Move the camera away from the origin, behind the cube
camera.position.z = 7;
camera.position.y = 2;

// Create the ground
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate the ground to be horizontal
scene.add(ground);

// Create a light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Function to create a simple tree
function createTree(x, z) {
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1);
    const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, 0.5, z);

    const foliageGeometry = new THREE.ConeGeometry(0.5, 1);
    const foliageMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.set(x, 1.5, z);

    scene.add(trunk);
    scene.add(foliage);
}

// Create some trees
createTree(5, 5);
createTree(-5, -5);
createTree(-5, 5);
createTree(5, -5);

// Variables to keep track of the cube's movement
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
const moveSpeed = 0.1;

// Event listeners for keydown and keyup events
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            moveForward = true;
            break;
        case 'ArrowDown':
        case 's':
            moveBackward = true;
            break;
        case 'ArrowLeft':
        case 'a':
            moveLeft = true;
            break;
        case 'ArrowRight':
        case 'd':
            moveRight = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            moveForward = false;
            break;
        case 'ArrowDown':
        case 's':
            moveBackward = false;
            break;
        case 'ArrowLeft':
        case 'a':
            moveLeft = false;
            break;
        case 'ArrowRight':
        case 'd':
            moveRight = false;
            break;
    }
});

// Function to update the camera position based on the cube's position
function updateCamera() {
    camera.position.x = cube.position.x;
    camera.position.y = cube.position.y + 2;
    camera.position.z = cube.position.z + 5;
    camera.lookAt(cube.position);
}

// Create an animation loop to render the scene
function animate() {
    requestAnimationFrame(animate);

    // Move the cube based on the direction flags
    if (moveForward) cube.position.z -= moveSpeed;
    if (moveBackward) cube.position.z += moveSpeed;
    if (moveLeft) cube.position.x -= moveSpeed;
    if (moveRight) cube.position.x += moveSpeed;

    // Update the camera position
    updateCamera();

    renderer.render(scene, camera);
}

// Start the animation loop
animate();
