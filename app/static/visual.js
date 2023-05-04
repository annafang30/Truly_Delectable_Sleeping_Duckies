var c = document.getElementById("can");
var ctx = c.getContext("2d"); 

var map = new Image();
  map.src = "Happiness Score.png";


function drawMap() {
    ctx.canvas.width = window.innerWidth; 
    ctx.canvas.height = window.innerHeight; 
}