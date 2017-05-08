// KEYS //

// CONSTANTS 
const KEYCODES = {
  spacebar : 32,
  leftarrow : 37,
  rightarrow : 39,
  uparrow : 38,
  downarrow : 40
}
var KEYSTATES = {
  leftarrow : '',
  rightarrow : ''
}

function Keys(){
  this.construct();
}

Keys.prototype.construct = function(){
  // Add game area click tester
  document.getElementById('game-container').addEventListener('click', this.clicktest);
  // Add key up/down detection and state-setting 
  document.body.addEventListener('keydown', this.keysdown);
  document.body.addEventListener('keyup', this.keysup);
  
}

Keys.prototype.clicktest = function(){
  c.comment('It works!');
}

// ARROW KEYS DOWN //
Keys.prototype.keysdown = function(e){
  if(e.keyCode == KEYCODES.leftarrow){
    KEYSTATES.leftarrow = 'down';
    c.comment('left is ' + KEYSTATES.leftarrow);
  }
  if(e.keyCode == KEYCODES.rightarrow){
    KEYSTATES.rightarrow = 'down';
    c.comment('right is ' + KEYSTATES.rightarrow);
  }
}

// ARROW KEYS UP //
Keys.prototype.keysup = function(e){
  if(e.keyCode == KEYCODES.leftarrow){
    KEYSTATES.leftarrow = 'up';
    c.comment('left is ' + KEYSTATES.leftarrow);
  }
  if(e.keyCode == KEYCODES.rightarrow){
    KEYSTATES.rightarrow = 'up';
    c.comment('right is ' + KEYSTATES.rightarrow);
  }
  
}

