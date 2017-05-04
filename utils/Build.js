//BUILD UTILITY FUNCTION
function Build(x, y, id, type){
  var bod;
  switch(type){
    case 'A':
      bod = Matter.Bodies.rectangle(x, y, 140, 40, {
        id: id,
        isStatic: true
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
