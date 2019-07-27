/*----------INITIALISATIONS----------*/
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

/*----------RECTANGLE----------*/
//Add the box mesh to a game object
let rect = new GameObject(game, cube, (self) => {
  //init
  self.object.position.y = -3;
  self.speed = -0.02
  self.object.rotation.z = 0
  self.object.geometry.computeBoundingBox();
  self.BBox = self.object.geometry.boundingBox
  self.BBox.translate(self.object.position)
  click.add(()=>{
    self.speed = 0;
  });
});
rect.setUpdateFunction((self) => {
  //update
  self.object.rotation.z += self.speed;
})

/*----------CIRCLE----------*/
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

  //Since bounding box can't rotate, I rotate the sphere around it instead to simulate the collision
  let angle = -rect.object.rotation.z
  self.BSphere.center = {
    x: Math.cos(angle) * (self.object.position.x - center.x) - Math.sin(angle) * (self.object.position.y - center.y) + center.x,
    y: Math.sin(angle) * (self.object.position.x - center.x) + Math.cos(angle) * (self.object.position.y - center.y) + center.y,
    z: self.object.position.z
  }

  //This is some debug helper code. This updates the sphere collider helper
  //circle.BSphere.getBoundingBox(circlebbox)

  //If outside of screen, reset the game
  if(!game.isOnScreen(self.object)){
    game.reset()
  }


  //Simple collision system
  let rectBBox = rect.object.geometry.boundingBox
  if (rectBBox.intersectsSphere(self.BSphere)){
    //Set angle back between 0 and 2PI
    let rectAngle = Math.abs((rect.object.rotation.z) % (2 * Math.PI))

    //Calculate the normal angle
    let normalAngle
    if (rectAngle > Math.PI/2 + 0.1 && rectAngle <  3 * Math.PI / 2 - 0.1)
      normalAngle = -rectAngle - Math.PI / 2
    else if (rectAngle < Math.PI / 2 + 0.1 && rectAngle >  Math.PI / 2 - 0.1)
      normalAngle = -rectAngle 
    else if (rectAngle > 3 * Math.PI / 2 - 0.1 && rectAngle < 3 * Math.PI / 2 + 0.1)
      normalAngle = -rectAngle - Math.PI
    else
      normalAngle = -rectAngle + Math.PI / 2

    //Calculate incident angle
    let incidentAngle = normalAngle - Math.PI / 2

    //Get reflected angle
    angle = normalAngle + incidentAngle

    //Set speed
    let totSpeed = Math.sqrt(Math.pow(self.speed.x, 2) + Math.pow(self.speed.y, 2))
    self.speed.x = totSpeed * Math.cos(angle)
    self.speed.y = totSpeed * Math.sin(angle)
  }
})


/*----------DEBUG HELPERS----------*/

//Uncomment to see the helpers I setup 

/*

//This helper prints the rect BBox
let helper = new THREE.Box3Helper(rect.object.geometry.boundingBox, 0xffff00);
game.scene.add(helper);

// This helper prints the sphere BBox
let circlebbox = new THREE.Box3();
circle.BSphere.getBoundingBox(circlebbox)
let helper2 = new THREE.Box3Helper(circlebbox, 0xffff00);
game.scene.add(helper2);

//This helper prints the "normals" for the rectangle. It's actually just the same rect but rotated 90 degrees
const material2 = new THREE.MeshBasicMaterial({
  color: 0xffff00
});
const cube2 = new THREE.Mesh(boxGeometry, material2);

let rect2 = new GameObject(game, cube2, (self) => {
  //init
  self.object.position.y = -3;
  self.speed = -0.02
  self.object.rotation.z = Math.PI / 2
  self.object.geometry.computeBoundingBox();
  self.BBox = self.object.geometry.boundingBox
  self.BBox.translate(self.object.position)
  click.add(() => {
    self.speed = 0;
  });
});
rect2.setUpdateFunction((self) => {
  //update
  self.object.rotation.z += self.speed;
  self.BBox
})
*/