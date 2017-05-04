// DEFINE LVL 1 HERE 

function Level1(props){
  var boxA = Matter.Bodies.rectangle(280, 200, 40, 40);
  var boxB = Matter.Bodies.rectangle(300, 50, 20, 20);
  var ground = Matter.Bodies.rectangle(400, props.h, 810, 60, { isStatic: true });
  var platA = Build(220, 280, 'A');
  var platA2 = Build(60, 440, 'A');
  var bodies = [boxA, boxB, ground, platA, platA2];
  return bodies;
}

