var c = document.getElementById("myChart");
var ctx = c.getContext("2d"); 

STATES = { 'AK': 'Alaska',  'AL': 'Alabama', 'AR': 'Arkansas', 'AZ': 'Arizona', 'CA': 'California', 'CO': 'Colorado',  'CT': 'Connecticut', 'DE': 'Delaware','FL': 'Florida',  'GA': 'Georgia', 'HI': 'Hawaii', 'IA': 'Iowa', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'KS': 'Kansas','KY': 'Kentucky', 'LA': 'Louisiana', 'MA': 'Massachusetts', 'MD': 'Maryland', 'ME': 'Maine', 'MI': 'Michigan', 'MN': 'Minnesota', 'MO': 'Missouri', 'MS': 'Mississippi', 'MT': 'Montana', 'NC': 'North Carolina', 'ND': 'North Dakota', 'NE': 'Nebraska','NH': 'New Hampshire','NJ': 'New Jersey','NM': 'New Mexico','NV': 'Nevada','NY': 'New York','OH': 'Ohio','OK': 'Oklahoma','OR': 'Oregon','PA': 'Pennsylvania','RI': 'Rhode Island','SC': 'South Carolina','SD': 'South Dakota','TN': 'Tennessee','TX': 'Texas','UT': 'Utah','VA': 'Virginia','VT': 'Vermont','WA': 'Washington','WI': 'Wisconsin','WV': 'West Virginia','WY': 'Wyoming'}
const keys = Object.keys(STATES);  

const happiness = []; 
const brokenness = []; 
const wages = [];
const coordinates = []; 
const coordinates2 = []; 
const coordinates3 = []; 

for(let i = 0; i<50; i++){
  happiness[i] = stats[keys[i]]["happiness"]
}

for(let r = 0; r<50; r++){
  brokenness[r] = parseFloat(stats[keys[r]]["broken_ratio"].replace("%", "")); 
}

for(let k = 0; k<50; k++){
  wages[k] = parseFloat(stats[keys[k]]["min_wage"].replace("$", "")); 
}

for(let h = 0; h<50; h++){
  coordinates[h] = {x: brokenness[h], y: happiness[h]};
}

for(let j = 0; j<50; j++){
  coordinates2[j] = {x: wages[j], y: happiness[j]}; 
}

for(let b = 0; b<50; b++){
  coordinates3[b] = {x: brokenness[b], y: wages[b]}; 
}
  
// single axes

const data = {
  labels: keys,
  datasets: [
  {
    label: "Happiness",
    data: happiness,
    fill: false,
    borderColor: 'blue',
    tension: 0.1
  },
  {
    label: 'Brokenness', 
    data: brokenness,
    fill:false, 
    borderColor: "red", 
    tension: 0.1 
  }
]
}

var drawChart1 = function(e){
  return new Chart(c, {
    type: "line",
    data: data,
    options: {
      responsive: true, 
      maintainAspectRatio: false, 
      title:{
        display: true, 
        text: "Happiness vs. Brokenness :("
      },
      scales:{
        yAxes:[{
          scaleLabel:{
            display: true, 
            labelString: "happiness OR brokenness",
          },
        },],
        xAxes:[{
          scaleLabel:{
            display: true, 
            labelString: "state",
          },
        },],
      },
      },
})
}

drawChart1(); // => shows as the default graph 

// dual axes
const data2 = {
  labels: keys,
  datasets: [
  {
    label: "Happiness",
    data: happiness,
    fill: false,
    borderColor: 'blue',
    tension: 0.1,
    yAxisID: 'y'
  },
  {
    label: 'Brokenness', 
    // yAxisID: "right",
    data: brokenness,
    fill:false, 
    borderColor: "red", 
    tension: 0.1,
    yAxisID: 'y2'
  }
]
}

var drawChart2 = function(e){
  return new Chart(c, {
    type: 'line',
    data: data2,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [ // I literally tried to do this the normal way and IT DOESN'T WORK so this is my workaround TT 
        {
          id: 'y',
          type: 'linear',
          display: true,
          position: 'left',
          scaleLabel:{
            display: true, 
            labelString: "happiness",
          },
          gridLines:{
            display: false, 
          },
        },
        {
          id: 'y2',
          type: 'linear',
          display: true,
          position: 'right',
          scaleLabel:{
            display: true, 
            labelString: "brokenness",
          },
        },
      ],
      xAxes:[{
        scaleLabel:{
          display: true, 
          labelString: "state",
        },
      },],
      },
      title:{
        display: true, 
        text: "Happiness vs. Brokenness :("
      },
    },
  })
};


// scatter of happiness v brokenness

const scatterData = {
  datasets: [{
    label: '',
    data: coordinates,
    backgroundColor: 'red'
  }],
}

var drawChart3 = function(e){
  return new Chart(c, {
    labels: keys,
    type: 'scatter',
    data: scatterData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales:{
        yAxes:[{
          scaleLabel:{
            display: true, 
            labelString: "happiness",
          },
        },],
        xAxes:[{
          scaleLabel:{
            display: true, 
            labelString: "brokenness",
          },
        },],
      },
      title:{
        display: true, 
        text: "Happiness vs. Brokenness :("
      },
    },
  })
}; 

// // scattergraph - min wage vs happiness 

const scatterData2 = {
  datasets: [{
    label: '',
    data: coordinates2,
    backgroundColor: 'red'
  }],
}

var drawChart4 = function(e){
  return new Chart(c, {
    labels: keys,
    type: 'scatter',
    data: scatterData2,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales:{
        yAxes:[{
          scaleLabel:{
            display: true, 
            labelString: "happiness",
          },
        },],
        xAxes:[{
          scaleLabel:{
            display: true, 
            labelString: "wages",
          },
        },],
      },
      title:{
        display: true, 
        text: "Happiness vs. Wages :("
      },
    },
  })
};

// scatter of wages versus brokenness 
const scatterData3 = {
  datasets: [{
    label: '',
    data: coordinates3,
    backgroundColor: 'red'
  }],
}

var drawChart5 = function(e) {
  return new Chart(c, {
    labels: keys,
    type: 'scatter',
    data: scatterData3,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales:{
        yAxes:[{
          scaleLabel:{
            display: true, 
            labelString: "wages",
          },
        },],
        xAxes:[{
          scaleLabel:{
            display: true, 
            labelString: "brokenness",
          },
        },],
      },
      title:{
        display: true, 
        text: "Wages vs. Broken Ice Cream Machines :("
      },
    },
  })  
}; 

// all event listeners 

var singleAxis = () =>{
  console.log("single"); 
  ctx.clearRect(0, 0, c.width, c.height);
  drawChart1(); 
};

var dualAxis = () => {
  console.log("dual"); 
  ctx.clearRect(0, 0, c.width, c.height);
  drawChart2(); 
};

var drawscatter1 = () => {
  console.log("scatter1");
  ctx.clearRect(0, 0, c.width, c.height);
  drawChart3(); 
}

var drawscatter2 = () => {
  console.log("scatter2"); 
  ctx.clearRect(0, 0, c.width, c.height);
  drawChart4(); 
}

var drawscatter3 = () => {
  console.log("scatter3"); 
  ctx.clearRect(0, 0, c.width, c.height);
  drawChart5(); 
}


var singleButton = document.getElementById("singleline"); 
var dualButton = document.getElementById("dualline"); 
var scatter1 = document.getElementById("scatter"); 
var scatter2 = document.getElementById("scatter2"); 
var scatter3 = document.getElementById("scatter3"); 


singleButton.addEventListener("click", singleAxis); 
dualButton.addEventListener("click", dualAxis); 
scatter1.addEventListener("click", drawscatter1);  
scatter2.addEventListener("click", drawscatter2); 
scatter3.addEventListener("click", drawscatter3); 