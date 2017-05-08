window.onload = function(){
  
  page.properties.title = 'Matter.js Test 02';
  page.setup_gamepage();
  var c = new Console({w:480,h:800});
  window.c = c;
  var keys = new Keys();
  
  // MODULES //

  // module aliases
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
  
  var game = new Game(engine, render);
  
  var lvl1 = new Level({game:game,w:480,h:800}, Levels.lvl1);
  game.addLevel(lvl1);
  game.name = "Super Julio";
  c.comment(game.name);
  
  
  
}
