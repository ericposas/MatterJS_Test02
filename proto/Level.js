// LEVEL CLASS  

function Level(props, rows){
  this.props = props;
  var layout = this.layout(rows);
  return layout;
}

Level.prototype.layout = function(rows){
  var blocks = [];
  // build level layout based on above grid 
  for(var i = 0; i < rows.length; i++){ 
    for(var o = 0; o < rows[i].length; o++){
      if(rows[i][o] == 1){
        var brick = Build((o*40)+20, (i*40)+20, 'brick-'+'row'+i+'-num'+o, 'brick-a');
        blocks.push(brick);
      }
      if(rows[i][o] == 2){
        var box = Matter.Bodies.rectangle((o*40)+20, (i*40)+20, 40, 40, {
          id: 'box-'+'row'+i+'-num'+o,
          render: {
            sprite: {
              xScale:0.2,
              yScale:0.2,
              texture: 'img/box_200x200.jpg'
            }
          }
        });
        blocks.push(box);
      }
    }
  }
  // return the layout
  return blocks;
}

Level.prototype.getBricks = function(){
  return this.bricks;
}
