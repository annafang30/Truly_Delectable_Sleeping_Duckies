var c = document.getElementById("can");
var map = document.getElementById("map");
var ctx = c.getContext("2d"); 

  // map.src = "Happiness Score.png";


var drawMap = (e) => {
    ctx.canvas.width = window.innerWidth; 
    ctx.canvas.height = window.innerHeight; 
    
    drawState(ctx.canvas.width/2, ctx.canvas.height/2);
}

function drawState(x,y) {
  ctx.beginPath(); 
  ctx.arc(x, y, 10, 0, 2*Math.PI);
  ctx.fillStyle = "green";
  ctx.fill(); 
}

map.addEventListener("click", drawMap);