let game = new Game(); //Init scene
let click = new ClickManager();
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
  self.speed = -0.02
  self.object.rotation.z = 0
  self.object.geometry.computeBoundingBox();
  self.BBox = self.object.geometry.boundingBox
  self.BBox.translate(self.object.position)
  console.log(self.BBox)
  click.add(()=>{
    self.speed = 0;
  });
});
rect.setUpdateFunction((self) => {
  //update
  self.object.rotation.z += self.speed;
  self.BBox
})

//Add the circle mesh to a game object
let circle = new GameObject(game, sphere, (self) => {
  //init
  self.force = {
    x: 0,
    y: 0
  }
  self.speed = {
    x: 0,
    y: 0
  }
  self.object.position.x = 0;
  self.object.position.y = 5;
  if (!self.BSphere)
    self.object.geometry.computeBoundingSphere()
  self.BSphere = self.object.geometry.boundingSphere
  click.add(() => {
    self.force.y = -20;
  });
});
circle.setUpdateFunction((self) => {
  //update
  self.speed.x += self.force.x / 60;
  self.speed.y += self.force.y / 60;

  self.object.position.x += self.speed.x / 60;
  self.object.position.y += self.speed.y / 60;

  let center = {
    x: 0,
    y: -3
  }
  let angle = -rect.object.rotation.z
  self.BSphere.center = {
    x: Math.cos(angle) * (self.object.position.x - center.x) - Math.sin(angle) * (self.object.position.y - center.y) + center.x,
    y: Math.sin(angle) * (self.object.position.x - center.x) + Math.cos(angle) * (self.object.position.y - center.y) + center.y,
    z: self.object.position.z
  }

  //circle.BSphere.getBoundingBox(circlebbox)
  if(!game.isOnScreen(self.object)){
    game.reset()
  }
  //self.object.geometry.computeBoundingSphere();
  let rectBBox = rect.object.geometry.boundingBox
  if (rectBBox.intersectsSphere(self.BSphere)){
    console.log('interects')
    //if (!self.hasInteracted){
      angle = ((rect.object.rotation.z + Math.PI / 2) % Math.PI)
      let temp = self.speed.x
      // self.speed.x = self.speed.x * self.normal.x
      // self.speed.y = self.speed.y * self.normal.y
      self.speed.x = (Math.cos(angle) * (self.object.position.x) - Math.sin(angle) * (self.object.position.y))*3
      self.speed.y = (Math.sin(angle) * (self.object.position.x) - Math.cos(angle) * (self.object.position.y))*3
      console.log(self.speed)
    //}
    self.hasInteracted = true;
  } else {
    let raycaster = new THREE.Raycaster(self.object.position, new THREE.Vector3(0, -1, 0));
    let intersects = raycaster.intersectObject(rect.object);
    if (intersects[0]) {
      self.normal = intersects[0].face.normal
    }
    self.hasInteracted = false;
  }
})
// let helper = new THREE.Box3Helper(rect.object.geometry.boundingBox, 0xffff00);
// game.scene.add(helper);

// let circlebbox = new THREE.Box3();
// circle.BSphere.getBoundingBox(circlebbox)
// let helper2 = new THREE.Box3Helper(circlebbox, 0xffff00);
// game.scene.add(helper2);