var c = document.getElementById("can");
var map = document.getElementById("map");
var ctx = c.getContext("2d"); 

var spacing =  65;
// map.src = "Happiness Score.png";
const width = ctx.canvas.width = window.innerWidth; 
const height = ctx.canvas.height = window.innerHeight; 
const NUM_STATES = 50;
const STATE_NAMES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

function draw_state(x, y){
  let RADIUS = 30;
  let DEFAULT_COLOR = "red";

  let path = new Path2D(); 
  ctx.fillStyle = DEFAULT_COLOR;
  path.arc(x, y, RADIUS, 0, 2 * Math.PI); 
  ctx.stroke(path);
  ctx.fill(path);
  
  return path;
}

const states = [];

// populate 50 states
for(let i = 0; i < NUM_STATES; i++){
  states[i] = draw_state(50 + 65*(i%10), 50 + 65 * (Math.floor(i/10)));
}

c.addEventListener("mousemove", (event) => {
  for(let i = 0; i < NUM_STATES; i++){    
    const isPointInPath = ctx.isPointInPath(states[i], event.offsetX, event.offsetY);
    if(isPointInPath) {
      ctx.fillStyle = "green";
      console.log(STATE_NAMES[i]);
    }
    else {
      ctx.fillStyle = "red";
    }
    ctx.fill(states[i]);
  }
});