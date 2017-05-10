// GAME CLASS //
function Game(){}

// METHODS AND PROPERTIES OF THE GAME CLASS 

// Initialization of Game 
Game.prototype.start = function(){
  // create an engine
  this.engine = Matter.Engine.create();
  // create a renderer
  this.render = Matter.Render.create({
    element: document.getElementById('game-container'),
    engine: this.engine,
    options: {
      wireframes: false,
      width: 480,
      height: 800
    }
  });
  // run the engine
  Matter.Engine.run(this.engine);
  // run the renderer
  Matter.Render.run(this.render);
  // run game loop
  this.gameLoop();
}

// Testing game boundaries 
Game.prototype.testBounds = function (){
  if(this.currentLevel && this.currentLevel.bricks[0].position.x < Globals.stage.adjust){
    this.leftBounds = false;
  }else{
    this.leftBounds = true;
  }
  if(this.currentLevel && this.currentLevel.bricks[this.currentLevel.bricks.length-1].position.x > this.w - Globals.stage.adjust){
    this.rightBounds = false;
  }else{
    this.rightBounds = true;
  }
}

// Game loop 
Game.prototype.gameLoop = function(){
  var _self = this;
  this.testBounds();
  this.scroll();
  Matter.Engine.update(this.engine, 1000/60, 1);
  window.requestAnimationFrame(function(){
    _self.gameLoop();
  });
}

// Scrolling game 
Game.prototype.scroll = function (){
  if(KEYSTATES.leftarrow == 'down' && this.leftBounds == false){
    this.move('right');
  }
  if(KEYSTATES.rightarrow == 'down' && this.rightBounds == false){
    this.move('left');
  }
}

// Move bodies 
Game.prototype.move = function (direction){
  if(Globals.char.accel.speed < Globals.char.accel.max){
    Globals.char.accel.speed+=Globals.char.accel.rate; 
  }
  for(var i = 0; i < this.currentLevel.layout.length; i++){
    Matter.Body.translate(this.currentLevel.layout[i], {x:(direction == 'right' ? Globals.char.accel.speed : (Globals.char.accel.speed*-1)), y:0});
  }
}

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
  if(this.leftBounds == false && this.rightBounds == false){
    this.processDecel(direction);
  }else{
    Globals.char.accel.speed = 0;
  }
}
Game.prototype.processDecel = function (direction){
  var _self = this, d = direction;
  // if char speed is still over 0 (the min)
  if( (Globals.char.accel.speed > Globals.char.accel.min) &&
     (KEYSTATES.leftarrow != 'down') &&
     (KEYSTATES.rightarrow != 'down') ){
    // decrease speed and animate the change 
    Globals.char.accel.speed = (Globals.char.accel.speed - Globals.char.accel.rate);
    TweenLite.delayedCall(0.005, function(){
      _self.decel(d);
    });
  }
}
Game.prototype.decel = function (direction){
  if(this.leftBounds == false && this.rightBounds == false){
    for(var i = 0; i < this.currentLevel.layout.length; i++){
      Matter.Body.translate(this.currentLevel.layout[i], {x:(direction == 'right' ? Globals.char.accel.speed : (Globals.char.accel.speed*-1)), y:0});
    }
    // call to make it recursive 
    this.processDecel(direction);
  }else{
    Globals.char.accel.speed = 0;
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
  engine: {
    set: function(val){
      this._engine = val;
    },
    get: function(){
      return this._engine;
    }
  },
  render: {
    set: function(val){
      this._render = val;
    },
    get: function(){
      return this._render;
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



