var c = document.getElementById("main");
var ctx = c.getContext("2d");
var hover_box = document.getElementById("hoverbox");

ctx.canvas.width = window.innerWidth; 
ctx.canvas.height = window.innerHeight;
const width = ctx.canvas.width;
const height = ctx.canvas.height;


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

function draw_state(x, y, state_name) {
  let RADIUS = 30;
  
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

const states = [];

// create staggered grid of states
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    if (r % 2 == 1) {
      states[r * COLS + c] = draw_state(70 + (width/12.308) * c, 35 + (height/10) * r, VALID_STATES[r * COLS + c]);
    }
    else {
      states[r * COLS + c] = draw_state(35 + (width/12.308) * c, 35 + (height/10) * r, VALID_STATES[r * COLS + c]);
    }
  }
}

// draws everything once first
for (let i = 0; i < ROWS * COLS; i++) {
  if (VALID_STATES[i] != '') {
    ctx.fillStyle = "red";
    states[i].is_hovered = false;
    ctx.fill(states[i].path);
    ctx.fillStyle = "white";
    ctx.fillText(states[i].name, states[i].x - 6, states[i].y + 2);
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
    hover_box.style.transform = 'translateY(' + (e.clientY - 280) + 'px)';
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
      children[5].textContent = "BROKEN: " + stats[states[i].name]["broken_ratio"];
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
        ctx.fillStyle = "red";
        states[i].is_hovered = false;
      }
      ctx.fill(states[i].path);
      ctx.fillStyle = "white";
      ctx.fillText(states[i].name, states[i].x - 6, states[i].y + 2);
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
})

// removes hover when out of canvas
c.addEventListener("mouseout", (e) => {
  for (let i = 0; i < ROWS * COLS; i++) {
    states[i].is_hovered = false;
  }
})