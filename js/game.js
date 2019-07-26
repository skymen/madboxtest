class Game {
  constructor() {
    //Init scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(window.innerWidth / -100, window.innerWidth / 100, window.innerHeight / 100, window.innerHeight / -100, -500, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    //move camera a bit further so objects can stay at z 0
    this.camera.position.z = 6;

    //Animation update
    this.animate = this.update.bind(this)
    this.updateList = []
    this.update()
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
    init(this) //call init
    this.scene.add(object) //add the object to the scene
  }

  setUpdateFunction(fn) {
    //Add function to the update list
    this.game.updateList.push(fn.bind(this, this))
  }
}