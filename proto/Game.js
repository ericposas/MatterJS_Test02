// GAME CLASS //
function Game(keys){
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
      testBounds();
      scroll();
      Matter.Engine.update(engine, 1000/60, 1);
      requestAnimationFrame(gameLoop);
    }
  }
  function scroll(){
    if(KEYSTATES.leftarrow == 'down' && _self.leftBounds == false){
      move('right');
    }
    if(KEYSTATES.rightarrow == 'down' && _self.rightBounds == false){
      move('left');
    }
  }
  function testBounds(){
    if(_self.currentLevel && _self.currentLevel.bricks[0].position.x < Globals.stage.adjust){
      _self.leftBounds = false;
    }else{
      _self.leftBounds = true;
    }
    if(_self.currentLevel && _self.currentLevel.bricks[_self.currentLevel.bricks.length-1].position.x > _self.w - Globals.stage.adjust){
      _self.rightBounds = false;
    }else{
      _self.rightBounds = true;
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

// Add a body to the world 
Game.prototype.addBody = function(body){
  Matter.World.add(this.engine.world, body);
}

// Remove a body from the world 
Game.prototype.removeBody = function(body){
  Matter.World.remove(this.engine.world, body);
}

// Adds the specified level layout and sets the Game object's currentLevel to the new level in order to access that level's objects (boxes/bricks) -- Level layout is a multi-dimensional array 
Game.prototype.addLevel = function(lvl){
  Matter.World.add(this.engine.world, lvl.layout);
  this.currentLevel = lvl;
}

// Remove a level layout 
Game.prototype.removeLevel = function(lvl){
  Matter.World.remove(this.engine.world, lvl);
}

// Decelerate the bodies via a 'keyup' event 
Game.prototype.decelerateBodies = function(direction){
  var _self = this;
  if(_self.leftBounds == false && _self.rightBounds == false){
    processDecel();
  }else{
    Globals.char.accel.speed = 0;
  }
  function processDecel(){
    // if char speed is still over 0 (the min)
    if( (Globals.char.accel.speed > Globals.char.accel.min) &&
       (KEYSTATES.leftarrow != 'down') &&
       (KEYSTATES.rightarrow != 'down') ){
      // decrease speed and animate the change 
      Globals.char.accel.speed = (Globals.char.accel.speed - Globals.char.accel.rate);
      TweenLite.delayedCall(0.005, function(){
        decel();
      });
    }
  }
  function decel(){
    if(_self.leftBounds == false && _self.rightBounds == false){
      for(var i = 0; i < _self.currentLevel.layout.length; i++){
        Matter.Body.translate(_self.currentLevel.layout[i], {x:(direction == 'right' ? Globals.char.accel.speed : (Globals.char.accel.speed*-1)), y:0});
      }
      // call to make it recursive 
      processDecel();
    }else{
      Globals.char.accel.speed = 0;
    }
  }
}


// GAME CLASS PROPERTIES //

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
  },
  leftBounds: {
    set: function(val){
      this._leftBounds = val;
    },
    get: function(){
      return this._leftBounds;
    }
  },
  rightBounds: {
    set: function(val){
      this._rightBounds = val;
    },
    get: function(){
      return this._rightBounds;
    }
  }
});



