// import Chart from 'chart.js/auto';
var c = document.getElementById("myChart");
var d = document.getElementById("myChart2"); 
var e = document.getElementById("myChart3"); 
STATES = { 'AK': 'Alaska',  'AL': 'Alabama', 'AR': 'Arkansas', 'AZ': 'Arizona', 'CA': 'California', 'CO': 'Colorado',  'CT': 'Connecticut', 'DE': 'Delaware','FL': 'Florida',  'GA': 'Georgia', 'HI': 'Hawaii', 'IA': 'Iowa', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'KS': 'Kansas','KY': 'Kentucky', 'LA': 'Louisiana', 'MA': 'Massachusetts', 'MD': 'Maryland', 'ME': 'Maine', 'MI': 'Michigan', 'MN': 'Minnesota', 'MO': 'Missouri', 'MS': 'Mississippi', 'MT': 'Montana', 'NC': 'North Carolina', 'ND': 'North Dakota', 'NE': 'Nebraska','NH': 'New Hampshire','NJ': 'New Jersey','NM': 'New Mexico','NV': 'Nevada','NY': 'New York','OH': 'Ohio','OK': 'Oklahoma','OR': 'Oregon','PA': 'Pennsylvania','RI': 'Rhode Island','SC': 'South Carolina','SD': 'South Dakota','TN': 'Tennessee','TX': 'Texas','UT': 'Utah','VA': 'Virginia','VT': 'Vermont','WA': 'Washington','WI': 'Wisconsin','WV': 'West Virginia','WY': 'Wyoming'}
const keys = Object.keys(STATES);  
// console.log(keys); 
const happiness = []; 
const brokenness = []; 
const coordinates = []; 

for(let i = 0; i<50; i++){
  happiness[i] = stats[keys[i]]["happiness"]
}

for(let r = 0; r<50; r++){
  brokenness[r] = parseFloat(stats[keys[r]]["broken_ratio"].replace("%", "")); 
}

for(let h = 0; h<50; h++){
  coordinates[h] = {x: brokenness[h], y: happiness[h]};
}

 console.log(coordinates);
// console.log(brokenness);
  
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

new Chart(c, {
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

}); 

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

new Chart(d, {
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
});

// scattergraph - single data set 

const scatterData = {
  datasets: [{
    label: '',
    data: coordinates,
    backgroundColor: 'red'
  }],
}

new Chart(e, {
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
});
