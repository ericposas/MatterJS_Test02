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
      //Matter.Runner.tick(runner, engine, 1000/60);
      Matter.Engine.update(engine, 1000/60, 1);
      requestAnimationFrame(gameLoop);
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

