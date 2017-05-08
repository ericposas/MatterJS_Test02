//var GameObjects = {
//  boxes : [],
//  bricks : []
//};

//GAME CLASS
function Game(engine, render, props){
  // METHODS //
  // optional properties
  
  // engine passed to 'Game' object
  this.engine = engine;
  this.render = render;
  // initialize World 
  this.start = function(){
    // run the engine
    Matter.Engine.run(engine);
    // run the renderer
    Matter.Render.run(render);
    // run game loop
    gameLoop();
    function gameLoop(){
      scroll();
      Matter.Engine.update(engine, 1000/60, 1);
      requestAnimationFrame(gameLoop);
    }
  }
  function scroll(){
    if(KEYSTATES.leftarrow == 'down'){
      // some code to scroll everything to the left
      
    }
    if(KEYSTATES.rightarrow == 'down'){
      // some code to scroll right 
    }
  }
  
  // INITIALIZATION //
  this.start();
}

Game.prototype.addBody = function(body){
  Matter.World.add(this.engine.world, body);
}

Game.prototype.removeBody = function(body){
  Matter.World.remove(this.engine.world, body);
}

Game.prototype.addLevel = function(lvl){
  Matter.World.add(this.engine.world, lvl);
}

Game.prototype.removeLevel = function(lvl){
  Matter.World.remove(this.engine.world, lvl);
}

Object.defineProperty(Game.prototype, "name", {
  set: function(val){
    this._name = val;
  },
  get: function(){
    return this._name;
  }
});

Object.defineProperties(Game.prototype, {
  "boxes" : {
    get: function(){
      if(!this._boxes){
        this._boxes = [];
      }
      return this._boxes;
    }
  },
  "bricks" : {
    get: function(){
      if(!this._bricks){
        this._bricks = [];
      }
      return this._bricks;
    }
  }
});


//Object.defineProperty(Game.prototype, "boxes", {
//  set: function(val){
//    if(!this._boxes){
//      this._boxes = [];
//    }
//    this._boxes = val;
//  },
//  get: function(){
//    if(!this._boxes){
//      this._boxes = [];   
//    }
//    return this._boxes;
//  }
//});
