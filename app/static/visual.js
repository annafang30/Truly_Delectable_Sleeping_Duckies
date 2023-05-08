var c = document.getElementById("can");
var map = document.getElementById("map");
var ctx = c.getContext("2d"); 

var spacing =  65;
// map.src = "Happiness Score.png";
const width = ctx.canvas.width = window.innerWidth; 
const height = ctx.canvas.height = window.innerHeight; 
const NUM_STATES = 50;
const STATE_NAMES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
const STATE_ABBREVIATIONS = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ];

class State{
  x;
  y;
  name;
  path;
}

function draw_state(x, y, state_name){
  let RADIUS = 30;
  let DEFAULT_COLOR = "red";

  let path = new Path2D(); 
  ctx.fillStyle = DEFAULT_COLOR;
  path.arc(x, y, RADIUS, 0, 2 * Math.PI); 
  ctx.stroke(path);
  ctx.fill(path);
  ctx.fillStyle = "black";
  ctx.fillText(state_name, x-6, y+2);
  
  state = new State();
  state.x = x;
  state.y = y;
  state.name = state_name;
  state.path = path;

  return state;
}

const states = [];

// populate 50 states
for(let i = 0; i < NUM_STATES; i++){
  states[i] = draw_state(50 + 65*(i%10), 50 + 65 * (Math.floor(i/10)), STATE_ABBREVIATIONS[i]);
}

c.addEventListener("mousemove", (event) => {
  for(let i = 0; i < NUM_STATES; i++){
    const isPointInPath = ctx.isPointInPath(states[i].path, event.offsetX, event.offsetY);
    if(isPointInPath) {
      ctx.fillStyle = "green";
      ctx.beginPath();
      ctx.rect(event.offsetX, event.offsetY, 100, 200);
      ctx.stroke();    
    }
    else {
      ctx.fillStyle = "red";
    }
    ctx.fill(states[i].path);
    ctx.fillStyle = "black";
    ctx.fillText(states[i].name, states[i].x-6, states[i].y+2);
  }
});