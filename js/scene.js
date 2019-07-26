let game = new Game(); //Init scene

//Init the two geometries
const boxGeometry = new THREE.BoxGeometry(7, 0.4, 1);
const circleGeometry = new THREE.SphereGeometry(0.5, 32, 32);

//Init material
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff
});

//Init both meshes
const cube = new THREE.Mesh(boxGeometry, material);
const sphere = new THREE.Mesh(circleGeometry, material);

//Add the box mesh to a game object
let rect = new GameObject(game, cube, (self) => {
  //init
  self.object.position.y = -3;
});
rect.setUpdateFunction((self) => {
  //update
  self.object.rotation.z -= 0.02;
})

//Add the circle mesh to a game object
let circle = new GameObject(game, sphere, (self) => {
  //init
  self.object.position.y = 6;
});
circle.setUpdateFunction((self) => {
  //update
})