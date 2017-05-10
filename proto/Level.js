// LEVEL CLASS  

function Level(name, rows){
  var layout = this.layout(rows);
  this.name = name;
  return { name:this.name, layout:layout, boxes:this.boxes, bricks:this.bricks};
}

Level.prototype.layout = function(rows){
  var blocks = [];
  var box_count = 0;
  var brick_count = 0;
  // build level layout based on grid passed in 
  for(var i = 0; i < rows.length; i++){ 
    for(var o = 0; o < rows[i].length; o++){
      if(rows[i][o] == 1){
        brick_count+=1;
        var brick = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 40, 40, {
          id: 'brick-'+brick_count,
          isStatic: true,
          render: {
            sprite: {
              xScale:0.2,
              yScale:0.2,
              texture: 'img/brick_200x200.png'
            }
          }
        });
        this.bricks.push(brick);
        blocks.push(brick);
      }
      if(rows[i][o] == 2){
        box_count+=1;
        var box = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 40, 40, {
          id: 'box-'+box_count,
          render: {
            sprite: {
              xScale:0.2,
              yScale:0.2,
              texture: 'img/box_200x200.jpg'
            }
          }
        });
        this.boxes.push(box);
        blocks.push(box);
      }
      if(rows[i][o] == 'c'){
        var char = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 40, 40, {
          id: 'character',
          render: {
            fillStyle: '#FF0000',
            sprite: {
              xScale:0.2,
              yScale:0.2,
              texture: ''
            }
          }
        });
        this.character = char;
        blocks.push(char);
      }
    }
  }
  // return the layout
  return blocks;
}

Object.defineProperties(Level.prototype, {
  name: {
    set: function(val){
      this._name = val;
    },
    get: function(){
      return this._name;
    }
  },
  boxes: {
    get: function(){
      if(!this._boxes){
        this._boxes = [];
      }
      return this._boxes;
    }
  },
  bricks: {
    get: function(){
      if(!this._bricks){
        this._bricks = [];
      }
      return this._bricks;
    }
  },
  character: {
    set: function(val){
      this._character = val;
    },
    get: function(){
      if(!this._character){
        c.comment('No character has been set.');
      }
      return this._character;
    }
  }
});



