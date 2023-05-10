var c = document.getElementById("main");
var map = document.getElementById("map");
var ctx = c.getContext("2d");

// // making a "new" layer for popup display 
var d = document.getElementById("layer1"); 
var layer = document.getElementById("map"); 
var layerctx = d.getContext("2d");


const width = ctx.canvas.width = window.innerWidth;
const height = ctx.canvas.height = window.innerHeight;

// using to format the state map
const TESTER = ['AK', '', '', '', '', '', '', '', '', '', '', 'ME', '', '', '', '', '', '', '', '', '', '', 'VT', 'NH', '', 'WA', 'ID', 'MT', 'ND', 'MN', 'IL', 'WI', 'MI', 'NY', 'RI', 'MA', '', 'OR', 'NV', 'WY', 'SD', 'IA', 'IN', 'OH', 'PA', 'NJ', 'CT', '', '', 'CA', 'UT', 'CO', 'NE', 'MO', 'KY', 'WV', 'VA', 'MD', 'DE', '', '', '', 'AZ', 'NM', 'KS', 'AR', 'TN', 'NC', 'SC', 'DC', '', '', '', '', '', '', 'OK', 'LA', 'MS', 'AL', 'GA', '', '', '', 'HI', '', '', '', 'TX', '', '', '', '', 'FL', '', ''];

// testing context layering technique 
layerctx.fillStyle = "blue"; 
layerctx.rect(0,0,500,400); 
layerctx.fill(); 

class State {
  x;
  y;
  name;
  path;
  containsHover; 
}

class Box {
  x;
  y;
  path;
}

fifty_states_plus_DC = [0, 11, 22, 23, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 69, 68, 67, 66, 65, 64, 63, 62, 76, 77, 78, 79, 80, 84, 88, 93];
function draw_state(x, y, state_name) {
  let RADIUS = 30;
  console.log(x);
  console.log(y);
  for (let i = 0; i < 96; i++) {
    const xcoor = 35 + 65 * (i % 12);
    const ycoor = 35 + 65 * (Math.floor(i / 12));
    if (x == xcoor & y == ycoor) {
      if (fifty_states_plus_DC.includes(i)) {
        DEFAULT_COLOR = "red";
        ctx.strokeStyle = "red"
      }
      else {
        DEFAULT_COLOR = "white";
        ctx.strokeStyle = "white"
      }
    }
  }
  let path = new Path2D();
  ctx.fillStyle = DEFAULT_COLOR;
  path.arc(x, y, RADIUS, 0, 2 * Math.PI);
  ctx.stroke(path);
  ctx.fill(path);
  ctx.fillStyle = "black";
  ctx.fillText(state_name, x - 6, y + 2);

  state = new State();
  state.x = x;
  state.y = y;
  state.name = state_name;
  state.path = path;

  return state;
}

const states = [];
// const popups = []; 
const boxes = []; 

// populate map with 96 circles INCLUDING 50 states and DC
for (let i = 0; i < 96; i++) {
  states[i] = draw_state(35 + 65 * (i % 12), 35 + 65 * (Math.floor(i / 12)), TESTER[i]);
  // popups[i] = draw_hover(35 + 65 * (i % 12), 35 + 65 * (Math.floor(i / 12))); 
}

// new method to draw the rectangle -> maybe make it into its own class? 
// function draw_hover(x,y){
//   for (let i = 0; i < 96; i++) {
//     const xcoor = 35 + 65 * (i % 12);
//     const ycoor = 35 + 65 * (Math.floor(i / 12));
//     if (x == xcoor & y == ycoor) {
//       if (fifty_states_plus_DC.includes(i)) {
//         DEFAULT_COLOR = "green";
//         ctx.strokeStyle = "green"
//       }
//       else {
//         DEFAULT_COLOR = "white";
//         ctx.strokeStyle = "white"
//       }
//     }
//   }
//   let tester = new Path2D();
//   layerctx.fillStyle = DEFAULT_COLOR;
//   tester.rect(x, y, 100, 200); 
//   layerctx.stroke(path2);
//   layerctx.fill(path2);

//   hover = new Box();
//   hover.x = x;
//   hover.y = y;
//   hover.path = path2;

//   return hover; 
// }
function draw_hover(x,y){
  let path = new Path2D();
  ctx.fillStyle = DEFAULT_COLOR;
  path.rect(x, y, 100, 200); 
  ctx.stroke(path);
  ctx.fill(path);
  ctx.fillStyle = "black";

  hover = new Box();
  hover.x = x;
  hover.y = y;
  hover.path = path;

  return hover; 
}

function clear_hover(box) {
  let path = box.path; 
  path.remove(); 
}
c.addEventListener("mousemove", (event) => {
  for (let i = 0; i < 96; i++) {
    var hover; 
    if (fifty_states_plus_DC.includes(i)) {
      const isPointInPath = ctx.isPointInPath(states[i].path, event.offsetX, event.offsetY);
      if (isPointInPath) {
        ctx.fillStyle = "green";
        ctx.beginPath();
        x = event.offsetX; 
        y = event.offsetY;
        if (!states[i].containsHover) { 
          hover = draw_hover(event.offsetX, event.offsetY); 
          states[i].containsHover = True; 
        }
        
        // // hovering text box -> have to figure out how to move to the front and hovering effect 
        // ctx.strokeStyle = "#D3D3D3";
        // ctx.rect(states[i].x, states[i].y, 100, 200);
        // ctx.stroke();    
      }
      else {
        ctx.fillStyle = "red";
        if (states[i].containsHover) {
            clear_hover(hover); 
            states[i].containsHover = false;
        }
      }
      ctx.fill(states[i].path);
      ctx.fillStyle = "black";
      ctx.fillText(states[i].name, states[i].x - 6, states[i].y + 2);
    }
  }
});

c.addEventListener("click", (e) => {
  for (let i = 0; i < 96; i++) {
    // var hover; 
     if (fifty_states_plus_DC.includes(i)) {
       const isPointInPath = ctx.isPointInPath(states[i].path, event.offsetX, event.offsetY);
       if (isPointInPath) {
        console.log(states[i]);
        window.location.href = '/state/' + states[i].name;
       }  
     }
   }
})