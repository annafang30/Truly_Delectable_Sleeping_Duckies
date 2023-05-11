var c = document.getElementById("main");
var ctx = c.getContext("2d");
var hover_box = document.getElementById("hoverbox");

const width = ctx.canvas.width = 786;
const height = ctx.canvas.height = 528;

const ROWS = 8;
const COLS = 12;

// using to format the state map
const STATE_POS = ['AK', '', '', '', '', '', '', '', '', '', '', 'ME', '', '', '', '', '', '', '', '', '', 'VT', 'NH', '', '', 'WA', 'MT', 'ND', 'MN', 'WI', '', 'MI', '', 'NY', 'MA', 'RI', '', 'ID', 'WY', 'SD', 'IA', 'IL', 'IN', 'OH', 'PA', 'NJ', 'CT', '', '', 'OR', 'NV', 'CO', 'NE', 'MO', 'KY', 'WV', 'MD', 'DE', '', '', '', 'CA', 'AZ', 'UT', 'KS', 'AR', 'TN', 'VA', 'NC', '', '', '', '', '', '', 'NM', 'OK', 'LA', 'MS', 'AL', 'SC', '', '', '', 'HI', '', '', 'TX', '', '', '', '', 'FL', '', '', ''];

class State {
  x;
  y;
  name;
  path;
  is_hovered;
}

fifty_states_plus_DC = [0, 11, 21, 22, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 69, 68, 67, 66, 65, 64, 63, 62, 76, 77, 78, 79, 80, 84, 88, 93];

function draw_state(x, y, state_name) {
  let RADIUS = 30;
  for (let i = 0; i < ROWS*COLS; i++) {
    if (STATE_POS[i] != '') {
      DEFAULT_COLOR = "red";
      ctx.strokeStyle = "red";
    }
    else {
      DEFAULT_COLOR = "white";
      ctx.strokeStyle = "white";
    }
  }
  let path = new Path2D();
  ctx.fillStyle = DEFAULT_COLOR;
  path.arc(x, y, RADIUS, 0, 2 * Math.PI);
  ctx.stroke(path);
  ctx.fill(path);
  ctx.fillStyle = "white";
  ctx.fillText(state_name, x - 6, y + 2);

  state = new State();
  state.x = x;
  state.y = y;
  state.name = state_name;
  state.path = path;

  return state;
}

const states = [];

for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    if(r%2 == 1){
      states[r*COLS + c] = draw_state(70 + 65 * c, 35 + 65 * r, STATE_POS[r*COLS + c]);
    }
    else{
      states[r*COLS + c] = draw_state(35 + 65 * c, 35 + 65 * r, STATE_POS[r*COLS + c]);
    }
  }
}

document.addEventListener('mousemove', function (e) {
  hover_box.style.transform = 'translateY(' + (e.clientY - 100) + 'px)';
  hover_box.style.transform += 'translateX(' + (e.clientX) + 'px)';
}, false);

function get_state_stats(state_short) {
  for (let i = 0; i < stats.length; i++) {
    if (stats[i]["state_short"] == state_short) {
      return stats[i];
    }
  }
  return {};
}

function is_any_state_hovered() {
  for (let i = 0; i < ROWS*COLS; i++) {
    if (states[i].is_hovered) {
      var children = hover_box.childNodes;
      children[1].textContent = get_state_stats(states[i].name)["state_full"];
      children[3].textContent = "HAPPINESS: " + get_state_stats(states[i].name)["happiness"];
      children[5].textContent = "BROKEN: " + get_state_stats(states[i].name)["broken_ratio"];
      return true;
    }
  }
  return false;
}

c.addEventListener("mousemove", (e) => {
  if (is_any_state_hovered()) {
    hover_box.style.display = "block";
  }
  else {
    hover_box.style.display = "none";
  }

  for (let i = 0; i < ROWS*COLS; i++) {
    if (STATE_POS[i] != '') {
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

c.addEventListener("click", (e) => {
  for (let i = 0; i < ROWS*COLS; i++) {
    if (STATE_POS[i] != '') {
      const isPointInPath = ctx.isPointInPath(states[i].path, event.offsetX, event.offsetY);
      if (isPointInPath) {
        window.location.href = '/state/' + states[i].name;
      }
    }
  }
})