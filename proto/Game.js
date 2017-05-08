//GAME CLASS
function Game(){
  var _self = this;
  
  // MATTER JS MODULES //
  var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Runner = Matter.Runner;
  
  // create an engine
  var engine = Matter.Engine.create();
  
  // create a renderer
  var render = Matter.Render.create({
    element: document.getElementById('game-container'),
    engine: engine,
    options: {
      wireframes: false,
      width: 480,
      height: 800
    }
  });
  // set our engine and renderer as properties of the Game object
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
    if(KEYSTATES.leftarrow == 'down' && _self.currentLevel.bricks[0].position.x < Globals.stage.adjust){
      move('right');
    }
    if(KEYSTATES.rightarrow == 'down' && _self.currentLevel.bricks[_self.currentLevel.bricks.length-1].position.x > _self.w - Globals.stage.adjust){
      move('left');
    }
    if(KEYSTATES.leftarrow == 'up' && KEYSTATES.rightarrow == 'up'){
      Globals.char.accel.speed = 0;
    }
  }
  function move(direction){
    if(Globals.char.accel.speed < Globals.char.accel.max){
      Globals.char.accel.speed+=Globals.char.accel.rate; 
    }
    for(var i = 0; i < _self.currentLevel.layout.length; i++){
      Matter.Body.translate(_self.currentLevel.layout[i], {x:(direction == 'right' ? Globals.char.accel.speed : (Globals.char.accel.speed*-1)), y:0});
    }
  }
  // INITIALIZATION //
  this.start();
}

// METHODS AND PROPERTIES OF THE GAME CLASS 
Game.prototype.addBody = function(body){
  Matter.World.add(this.engine.world, body);
}

Game.prototype.removeBody = function(body){
  Matter.World.remove(this.engine.world, body);
}

// adds the specified level layout and sets the Game object's currentLevel to the new level in order to access that level's objects (boxes/bricks) 
Game.prototype.addLevel = function(lvl){
  Matter.World.add(this.engine.world, lvl.layout);
  this.currentLevel = lvl;
}

Game.prototype.removeLevel = function(lvl){
  Matter.World.remove(this.engine.world, lvl);
}

Object.defineProperties(Game.prototype, {
  name: {
    set: function(val){
      this._name = val;
    },
    get: function(){
      return this._name;
    }
  },
  w: {
    set: function(val){
      this._w = val;
    },
    get: function(){
      return this._w;
    }
  },
  h: {
    set: function(val){
      this._h = val;
    },
    get: function(){
      return this._h;
    }
  },
  dimensions: {
    get: function(){
      return 'Game dimensions: ' + this._w + ', ' + this._h;
    }
  },
  currentLevel: {
    set: function(val){
      this._currentLevel = val;
    },
    get: function(){
      return this._currentLevel;
    }
  }
});


