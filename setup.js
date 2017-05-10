window.onload = function(){
  
  // WEB PAGE SET UP
  page.properties.title = 'Matter.js Test 02';
  page.setup_gamepage();
  
  // DEBUGGING CONSOLE 
  var c = new Console({w:480,h:800});
  window.c = c;
  
  // GAME SET UP
  var lvl1 = new Level('Level1', Levels.level1);
  var game = new Game();
  game.addLevel(lvl1);
  game.start();
  game.w = 480;
  game.h = 800;
  game.name = "Super Julio";
  
  
  // KEY PRESSES OBJECT 
  var keys = new Keys(game);
  
  
  c.comment(game.name);
  //for(var i = 0; i < game.currentLevel.layout.length; i++){
  //  c.comment(game.currentLevel.layout[i].id);
  //}
  
}
