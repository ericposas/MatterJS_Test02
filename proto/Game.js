// GAME CLASS //
function Game(){
  // Constructor
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
}

// METHODS AND PROPERTIES OF THE GAME CLASS 

// Initialization of Game 
Game.prototype.start = function(){
  // run the engine
  Matter.Engine.run(this.engine);
  // run the renderer
  Matter.Render.run(this.render);
  // run game loop
  this.gameLoop();
}

// Testing game boundaries 
Game.prototype.testBounds = function (){
  // stage stop-scroll bounds 
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
  // character bounds 
  if(this.currentChar && this.currentChar.position.x > Globals.stage.charlimit.begin){
    this.charLeftBounds = false;
  }else{
    this.charLeftBounds = true;
  }
  if(this.currentChar && this.currentChar.position.x < Globals.stage.charlimit.end){
    this.charRightBounds = false;
  }else{
    this.charRightBounds = true;
  }
}

// Game loop 
Game.prototype.gameLoop = function(){
  var _self = this;
  if(this.currentChar){
    this.currentChar.inertia = Infinity;
  }
  this.testBounds();
  this.scroll();
  Matter.Engine.update(this.engine, 1000/60, 1);
  window.requestAnimationFrame(function(){
    _self.gameLoop();
  });
}

// Scrolling game 
Game.prototype.scroll = function (){
  if(KEYSTATES.leftarrow == 'down'){
    if(this.leftBounds == false){
      this.move('right');
    }
    if(this.charLeftBounds == false){
      this.movechar('left');
    }
  }
  if(KEYSTATES.rightarrow == 'down'){
    if(this.rightBounds == false){
      this.move('left');
    }
    if(this.charRightBounds == false){
      this.movechar('right');
    }
  }
}


// Move stage bodies (bricks/boxes/etc.) 
Game.prototype.move = function (direction){
  this.increaseSpeed();
  for(var i = 0; i < this.currentLevel.layout.length; i++){
    Matter.Body.translate(this.currentLevel.layout[i], {x:(direction == 'right' ? Globals.char.accel.speed : (Globals.char.accel.speed*-1)), y:0});
  }
}

// Move character 
Game.prototype.movechar = function(direction){
  this.increaseSpeed();
  Matter.Body.translate(this.currentChar, {x:(direction == 'right' ? Globals.char.accel.speed : (Globals.char.accel.speed*-1)), y:0});
  //Matter.Body.applyForce(this.currentChar, this.currentChar.position, {x:(direction == 'right' ? (Globals.char.accel.speed*0.001) : ((Globals.char.accel.speed*0.001)*-1)), y:0});
}

// Increase speed 
Game.prototype.increaseSpeed = function(){
  if(Globals.char.accel.speed < Globals.char.accel.max){
    Globals.char.accel.speed+=Globals.char.accel.rate; 
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
  Matter.World.add(this.engine.world, lvl.char);
  this.currentChar = lvl.char;
}

// Remove a level layout 
Game.prototype.removeLevel = function(lvl){
  Matter.World.remove(this.engine.world, lvl);
}

// Decelerate the bodies via a 'keyup' event 
Game.prototype.decelerate = function(direction){
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
Game.prototype.jump = function(){
  Matter.Body.applyForce(this.currentChar, this.currentChar.position, {x:0,y:(Globals.char.jumpAmt*-1)});
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
  currentChar: {
    set: function(val){
      this._currentChar = val;
    },
    get: function(){
      return this._currentChar;
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
  },
  charLeftBounds: {
    set: function(val){
      this._charLeftBounds = val;
    },
    get: function(){
      return this._charLeftBounds;
    }
  },
  charRightBounds: {
    set: function(val){
      this._charRightBounds = val;
    },
    get: function(){
      return this._charRightBounds;
    }
  },
  jumpState: {
    set: function(val){
      this._jumpState = val;
    },
    get: function(){
      return this._jumpState;
    }
  }
});



