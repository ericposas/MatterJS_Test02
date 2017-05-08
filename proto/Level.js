// LEVEL CLASS  

function Level(props, rows){
  this.props = props;
  var layout = this.layout(rows);
  return layout;
}

Level.prototype.layout = function(rows){
  var blocks = [];
  var box_count = 0;
  var brick_count = 0;
  // build level layout based on above grid 
  for(var i = 0; i < rows.length; i++){ 
    for(var o = 0; o < rows[i].length; o++){
      if(rows[i][o] == 1){
        brick_count+=1;
        var brick = Build((o*40)+20, (i*40)+20, 'brick-'+brick_count, 'brick-a');
        //GameObjects.bricks.push(brick);
        if(this.props.game){
          this.props.game.bricks.push(brick);
        }else{
          console.error('You need to pass in the main Game object');
        }
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
        //GameObjects.boxes.push(box);
        if(this.props.game){
          this.props.game.boxes.push(box);
        }else{
          console.error('You need to pass in the main Game object');
        }
        blocks.push(box);
      }
    }
  }
  c.comment(this.props.game.boxes);
  // return the layout
  return blocks;
}

Level.prototype.getBricks = function(){
  return this.bricks;
}
