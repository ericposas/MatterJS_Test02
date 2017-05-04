//BUILD UTILITY FUNCTION
function Build(x, y, id, type){
  var bod;
  switch(type){
    case 'platform-a':
      bod = Matter.Bodies.rectangle(x, y, 140, 40, {
        id: id,
        isStatic: true
      });
      return bod;
      break;
    case 'box-a':
      bod = Matter.Bodies.rectangle(x, y, 40, 40, {
      id: id
      });
      return bod;
      break;
    default :
      bod = Matter.Bodies.rectangle(x, y, 140, 40, {
        id: id,
        isStatic: true
      });
      return bod;
  }
}
