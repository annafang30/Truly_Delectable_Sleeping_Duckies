// import Chart from 'chart.js/auto';
//var c = document.getElementById("myChart");
var d = document.getElementById("myChart2"); 
d.style.display = "none"; 
var e = document.getElementById("myChart3"); 
var f = document.getElementById("myChart4"); 
var g = document.getElementById("myChart5"); 

var mixButton = document.getElementById("mixed"); 
console.log(d.style.display);

STATES = { 'AK': 'Alaska',  'AL': 'Alabama', 'AR': 'Arkansas', 'AZ': 'Arizona', 'CA': 'California', 'CO': 'Colorado',  'CT': 'Connecticut', 'DE': 'Delaware','FL': 'Florida',  'GA': 'Georgia', 'HI': 'Hawaii', 'IA': 'Iowa', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'KS': 'Kansas','KY': 'Kentucky', 'LA': 'Louisiana', 'MA': 'Massachusetts', 'MD': 'Maryland', 'ME': 'Maine', 'MI': 'Michigan', 'MN': 'Minnesota', 'MO': 'Missouri', 'MS': 'Mississippi', 'MT': 'Montana', 'NC': 'North Carolina', 'ND': 'North Dakota', 'NE': 'Nebraska','NH': 'New Hampshire','NJ': 'New Jersey','NM': 'New Mexico','NV': 'Nevada','NY': 'New York','OH': 'Ohio','OK': 'Oklahoma','OR': 'Oregon','PA': 'Pennsylvania','RI': 'Rhode Island','SC': 'South Carolina','SD': 'South Dakota','TN': 'Tennessee','TX': 'Texas','UT': 'Utah','VA': 'Virginia','VT': 'Vermont','WA': 'Washington','WI': 'Wisconsin','WV': 'West Virginia','WY': 'Wyoming'}
const keys = Object.keys(STATES);  
// console.log(keys); 
const happiness = []; 
const brokenness = []; 
const wages = [];
const coordinates = []; 
const coordinates2 = []; 
const coordinates3 = []; 

console.log(wages); 
console.log(coordinates2);

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
 console.log(coordinates);
// console.log(brokenness);
  
// single axes
// const data = {
//   labels: keys,
//   datasets: [
//   {
//     label: "Happiness",
//     data: happiness,
//     fill: false,
//     borderColor: 'blue',
//     tension: 0.1
//   },
//   {
//     label: 'Brokenness', 
//     data: brokenness,
//     fill:false, 
//     borderColor: "red", 
//     tension: 0.1 
//   }
// ]
// }

// new Chart(c, {
//     type: "line",
//     data: data,
//     options: {
//       responsive: true, 
//       maintainAspectRatio: false, 
//       title:{
//         display: true, 
//         text: "Happiness vs. Brokenness :("
//       },
//       scales:{
//         yAxes:[{
//           scaleLabel:{
//             display: true, 
//             labelString: "happiness OR brokenness",
//           },
//         },],
//         xAxes:[{
//           scaleLabel:{
//             display: true, 
//             labelString: "state",
//           },
//         },],
//       },
//       },
//
//}); 

function mixedLine(){
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
};

const scatterData = {
  datasets: [{
    label: '',
    data: coordinates,
    backgroundColor: 'red'
  }],
}

// scatter of happiness v brokenness
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

// scattergraph - min wage vs happiness 

const scatterData2 = {
  datasets: [{
    label: '',
    data: coordinates2,
    backgroundColor: 'red'
  }],
}

new Chart(f, {
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
});

// wages as compared to rate of broken ice cream machines
const scatterData3 = {
  datasets: [{
    label: '',
    data: coordinates3,
    backgroundColor: 'red'
  }],
}

new Chart(g, {
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
});

function toggleDisplay(canv) {
  if (canv.style.display == "none") {
    canv.style.display = "block";
  }
  else {
    canv.style.display = "none";
  }
};

mixButton.addEventListener("click", toggleDisplay(d));
mixButton.addEventListener("click", mixedLine());
