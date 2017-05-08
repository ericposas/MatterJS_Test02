window.onload = function(){
  
  // WEB PAGE SET UP
  page.properties.title = 'Matter.js Test 02';
  page.setup_gamepage();
  
  // DEBUGGING CONSOLE 
  var c = new Console({w:480,h:800});
  window.c = c;
  
  // KEY PRESSES OBJECT 
  var keys = new Keys();
  // GAME SET UP
  var lvl1 = new Level('Level1', Levels.level1);
  var game = new Game();
  game.w = 480;
  game.h = 800;
  game.name = "Super Julio";
  game.addLevel(lvl1);
  
  
  c.comment(game.name);
  //c.comment(game.dimensions);
  //c.comment(game.currentLevel);
  
  
  
}
