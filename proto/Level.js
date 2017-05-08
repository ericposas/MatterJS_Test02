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
        var brick = Build((o*40)+20, (i*40)+20, 'brick-'+brick_count, 'brick-a');
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
  }
});
