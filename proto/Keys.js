function Keys(game){
  
  // define keys 
  this.spacebar = 32;
  this.leftarrow = 37;
  this.rightarrow = 39;
  this.uparrow = 38;
  this.downarrow = 40;
  // keys pressed 
  this.keyspressed = {
    leftarrow : false,
    rightarrow : false
  }
  
  document.body.addEventListener('keypress', function(e){
    if(e.keyCode == this.spacebar){
      alert();
      // jump
      game.Body.applyForce(game.boxA, game.boxA.position, { x:0, y:-0.075 });
    }
  });
  
  this.keydowns = function(e){
    // right
    if(e.keyCode == this.rightarrow){
      this.keyspressed.rightarrow = true;
      alert();
    }
    // left
    if(e.keyCode == this.leftarrow){
      this.keyspressed.leftarrow = true;
    }
  }

  this.keyups = function(e){
    // right
    if(e.keyCode == this.rightarrow){
      this.keyspressed.rightarrow = false;
    }
    // left
    if(e.keyCode == this.leftarrow){
      this.keyspressed.leftarrow = false;
    }
  }

  this.addKeys = function(){
    document.body.addEventListener('keydown', this.keydowns);
    document.body.addEventListener('keyup', this.keyups);
  }
  
  this.addKeys();

}
