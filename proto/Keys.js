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


function Keys(game){
  this.construct();
  this.game = game;
  c.comment(this.game);
}

Keys.prototype.construct = function(){
  // Add game area click tester
  document.getElementById('game-container').addEventListener('click', this.clicktest);
  // Add key up/down detection and state-setting 
  document.body.addEventListener('keydown', this.keysdown.bind(this));
  document.body.addEventListener('keyup', this.keysup.bind(this));
  
}

Keys.prototype.clicktest = function(){
  c.comment('It works!');
}

// ARROW KEYS DOWN //
Keys.prototype.keysdown = function(e){
  if(e.keyCode == KEYCODES.leftarrow){
    KEYSTATES.leftarrow = 'down';
  }
  if(e.keyCode == KEYCODES.rightarrow){
    KEYSTATES.rightarrow = 'down';
  }
}

// ARROW KEYS UP //
Keys.prototype.keysup = function(e){
  if(e.keyCode == KEYCODES.leftarrow){
    KEYSTATES.leftarrow = 'up';
    this.game.decelerateBodies('right');
  }
  if(e.keyCode == KEYCODES.rightarrow){
    KEYSTATES.rightarrow = 'up';
    this.game.decelerateBodies('left');
  }
}

Object.defineProperties(Keys.prototype, {
  game: {
    set: function(val){
      this._game = val;
    },
    get: function(){
      return this._game;
    }
  }
});

