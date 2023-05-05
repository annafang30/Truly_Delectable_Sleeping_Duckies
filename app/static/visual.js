var c = document.getElementById("can");
var map = document.getElementById("map");
var ctx = c.getContext("2d"); 
var spacing =  65;
// map.src = "Happiness Score.png";
width = ctx.canvas.width = window.innerWidth; 
height = ctx.canvas.height = window.innerHeight; 

let Kentucky = new Path2D(); 
Kentucky.arc(width/2, height/2, 30,0,2*Math.PI); 
ctx.stroke(Kentucky);
ctx.fillStyle = "red"; 
ctx.fill(States); 

c.addEventListener("mousemove", (event) => {
  const isPointInPath = ctx.isPointInPath(Kentucky, event.offsetX, event.offsetY);
  if(isPointInPath) {
    ctx.fillStyle = "green";
  }
  else {
    ctx.fillStyle = "red";
  }
  ctx.fill(Kentucky);
});


function drawState(x,y) {
  ctx.beginPath(); 
  ctx.arc(x, y, 30, 0, 2*Math.PI);
  ctx.fillStyle = "red";
  ctx.fill(); 
}