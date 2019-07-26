class Game {
  constructor() {
    //Init scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(window.innerWidth / -80, window.innerWidth / 80, window.innerHeight / 80, window.innerHeight / -80, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.frustum = new THREE.Frustum();
    let cameraViewProjectionMatrix = new THREE.Matrix4();

    // every time the camera or objects change position (or every frame)

    this.camera.updateMatrixWorld(); // make sure the camera matrix is updated
    this.camera.matrixWorldInverse.getInverse(this.camera.matrixWorld);
    cameraViewProjectionMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    this.frustum.setFromMatrix(cameraViewProjectionMatrix);

    //move camera a bit further so objects can stay at z 0
    this.camera.position.z = 6;

    //Animation update
    this.animate = this.update.bind(this)
    this.updateList = []
    this.update()

    //Object list
    this.objects = []
  }

  isOnScreen(object){
    return this.frustum.intersectsObject(object)
  }

  reset(){
    this.objects.forEach(obj => obj.reset())
  }

  update() {
    //Roll though every object and update it
    this.updateList.forEach(fn => fn())

    //Finish animation loop
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }
}

class GameObject {
  constructor(game, object, init) {
    //set the base params
    this.scene = game.scene;
    this.game = game;
    this.object = object;
    this.reset = init.bind(this, this)
    init(this) //call init
    this.scene.add(object) //add the object to the scene
    this.game.objects.push(this)
  }

  setUpdateFunction(fn) {
    //Add function to the update list
    this.game.updateList.push(fn.bind(this, this))
  }
}

class ClickManager {
  constructor(){
    this.clickFunctions = []
    document.onclick = () => {
      this.clickFunctions.forEach(fn => fn())
    };
  }
  add(fn){
    this.clickFunctions.push(fn)
  }
}