window.onload = function(){
  
  page.properties.title = 'Matter.js Test 02';
  page.setup_gamepage();
  
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
    element: document.body,
    engine: engine,
    options: {
      wireframes: false,
      width: 480,
      height: 800
    }
  });
  
  var game = new Game(engine, render);
  var lvl1 = new Level1({w:480,h:800});
  game.addLevel(lvl1);
  
}

