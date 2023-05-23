var c = document.getElementById("main");
var ctx = c.getContext("2d");
var hover_box = document.getElementById("hoverbox");

ctx.canvas.width = window.innerWidth; 
ctx.canvas.height = window.innerHeight;
let width = ctx.canvas.width;
let height = ctx.canvas.height;

let RADIUS = width/33.3333;

const states = [];
const ROWS = 9;
const COLS = 12;

// using to format the state map
const VALID_STATES = ['AK', '', '', '', '', '', '', '', '', '', '', 'ME', '', '', '', '', '', '', '', '', '', 'VT', 'NH', '', '', 'WA', 'MT', 'ND', 'MN', 'WI', '', 'MI', '', 'NY', 'MA', 'RI', '', 'ID', 'WY', 'SD', 'IA', 'IL', 'IN', 'OH', 'PA', 'NJ', 'CT', '', '', 'OR', 'NV', 'CO', 'NE', 'MO', 'KY', 'WV', 'MD', 'DE', '', '', '', 'CA', 'AZ', 'UT', 'KS', 'AR', 'TN', 'VA', 'NC', '', '', '', '', '', '', 'NM', 'OK', 'LA', 'MS', 'AL', 'SC', '', '', '', '', '', '', 'TX', '', '', '', 'GA', '', '', '', '', 'HI', '', '', '', '', '', '', '', 'FL', '', '', ''];

class State {
  x;
  y;
  name;
  path;
  is_hovered;
}

adjust_canvas_size();

window.addEventListener("resize", (e)=>{
  adjust_canvas_size();
})

function adjust_canvas_size(){
  ctx.canvas.width = window.innerWidth/1.25;
  ctx.canvas.height = ctx.canvas.width*10.7/16;
  ctx.font = "bold " + ctx.canvas.width/(76.8/2) + "px Helvetica";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  width = ctx.canvas.width;
  height = ctx.canvas.height;
  diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  RADIUS = diagonal/33.3333;
  create_grid();
  c.dispatchEvent(new Event('mousemove'));

  // console.log("window", window.innerWidth, window.innerHeight);
  // console.log("canvas", c.width, c.height);
  // console.log("ctx", ctx.canvas.width, ctx.canvas.height);
}


function draw_state(x, y, state_name) {  
  let path = new Path2D();
  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";
  path.arc(x, y, RADIUS, 0, 2 * Math.PI);
  ctx.stroke(path);
  ctx.fill(path);
  ctx.fillText(state_name, x - 6, y + 2);

  state = new State();
  state.x = x;
  state.y = y;
  state.name = state_name;
  state.path = path;

  return state;
}


function create_grid(){
  // create staggered grid of states
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (r % 2 == 1) {
        states[r * COLS + c] = draw_state(RADIUS*1.25 + RADIUS + (2*RADIUS+width/100) * c, RADIUS*1.25 + (2*RADIUS) * r, VALID_STATES[r * COLS + c]);
      }
      else {
        states[r * COLS + c] = draw_state(RADIUS*1.25 + (2*RADIUS+width/100) * c, RADIUS*1.25 + (2*RADIUS) * r, VALID_STATES[r * COLS + c]);
      }
    }
  }
}

create_grid();

// draws everything once first
for (let i = 0; i < ROWS * COLS; i++) {
  if (VALID_STATES[i] != '') {
    ctx.fillStyle = determine_color(parseFloat(stats[states[i].name]["broken_ratio"]));
    states[i].is_hovered = false;
    ctx.fill(states[i].path);
    ctx.fillStyle = "black";
    ctx.fillText(states[i].name, states[i].x, states[i].y);
  }
}

// sticks the hoverbox to mouse and enables/disables it if its ontop of state
document.addEventListener('mousemove', function (e) {
  if (is_any_state_hovered()) {
    hover_box.style.display = "block";
  }
  else {
    hover_box.style.display = "none";
  }

  if (e.clientY > window.innerHeight / 2) {
    hover_box.style.transform = 'translateY(' + (e.clientY - 260) + 'px)';
  }
  else {
    hover_box.style.transform = 'translateY(' + (e.clientY - 100) + 'px)';
  }
  if (e.clientX > window.innerWidth / 2) {
    hover_box.style.transform += 'translateX(' + (e.clientX - 170) + 'px)';
  }
  else {
    hover_box.style.transform += 'translateX(' + (e.clientX) + 'px)';
  }
}, false);

// checks if any state is being hovered at all and change hoverbox content to correponding state content
function is_any_state_hovered() {
  for (let i = 0; i < ROWS * COLS; i++) {
    if (states[i].is_hovered) {
      var children = hover_box.childNodes;
      children[1].textContent = stats[states[i].name]["name"];
      children[3].textContent = "HAPPINESS: " + stats[states[i].name]["happiness"];
      children[5].textContent = "MIN WAGE: " + stats[states[i].name]["min_wage"];
      children[7].textContent = "% BROKEN: " + stats[states[i].name]["broken_ratio"];
      return true;
    }
  }
  return false;
}

// changes state color and manages individual state hovers
c.addEventListener("mousemove", (e) => {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < ROWS * COLS; i++) {
    if (VALID_STATES[i] != '') {
      const isPointInPath = ctx.isPointInPath(states[i].path, e.offsetX, e.offsetY);
      if (isPointInPath) {
        ctx.fillStyle = "green";
        states[i].is_hovered = true;
      }
      else {
        ctx.fillStyle = determine_color(parseFloat(stats[states[i].name]["broken_ratio"]));
        states[i].is_hovered = false;
      }
      ctx.fill(states[i].path);
      ctx.fillStyle = "black";
      ctx.fillText(states[i].name, states[i].x, states[i].y);
    }
  }
});

// redirects user to state link upon click
c.addEventListener("click", (e) => {
  for (let i = 0; i < ROWS * COLS; i++) {
    if (VALID_STATES[i] != '') {
      const isPointInPath = ctx.isPointInPath(states[i].path, event.offsetX, event.offsetY);
      if (isPointInPath) {
        window.location.href = '/state/' + states[i].name;
      }
    }
  }
});

// removes hover when out of canvas
c.addEventListener("mouseout", (e) => {
  for (let i = 0; i < ROWS * COLS; i++) {
    states[i].is_hovered = false;
  }
});

function determine_color(ratio){
  color = "#00FF00";
  if(3.5 <= ratio && ratio < 7){
    color = "#8DFF00";
  }
  else if(7 <= ratio && ratio < 10.5){
    color = "#D4FF00";
  }
  else if(10.5 <= ratio && ratio < 14){
    color = "#F7FF00";
  }
  else if(14 <= ratio && ratio < 17.5){
    color = "#FFE400";
  }
  else if(17.5 <= ratio && ratio < 21){
    color = "#FFAF00";
  }
  else if(21 <= ratio && ratio < 24.5){
    color = "#FF8C00";
  }
  else if(24.5 <= ratio && ratio < 27){
    color = "#FF6900";
  }
  else if(27 <= ratio && ratio < 31.5){
    color = "#FF4600";
  }
  else if(31.5 <= ratio && ratio < 35){
    color = "#FF2300";
  }
  else if(35 <= ratio){
    color = "red";
  }
  return color;
}