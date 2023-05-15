// import Chart from 'chart.js/auto';
var c = document.getElementById("myChart");
var d = document.getElementById("myChart2"); 
// example data to get this working ^^
STATES = { 'AK': 'Alaska',  'AL': 'Alabama', 'AR': 'Arkansas', 'AZ': 'Arizona', 'CA': 'California', 'CO': 'Colorado',  'CT': 'Connecticut', 'DE': 'Delaware','FL': 'Florida',  'GA': 'Georgia', 'HI': 'Hawaii', 'IA': 'Iowa', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'KS': 'Kansas','KY': 'Kentucky', 'LA': 'Louisiana', 'MA': 'Massachusetts', 'MD': 'Maryland', 'ME': 'Maine', 'MI': 'Michigan', 'MN': 'Minnesota', 'MO': 'Missouri', 'MS': 'Mississippi', 'MT': 'Montana', 'NC': 'North Carolina', 'ND': 'North Dakota', 'NE': 'Nebraska','NH': 'New Hampshire','NJ': 'New Jersey','NM': 'New Mexico','NV': 'Nevada','NY': 'New York','OH': 'Ohio','OK': 'Oklahoma','OR': 'Oregon','PA': 'Pennsylvania','RI': 'Rhode Island','SC': 'South Carolina','SD': 'South Dakota','TN': 'Tennessee','TX': 'Texas','UT': 'Utah','VA': 'Virginia','VT': 'Vermont','WA': 'Washington','WI': 'Wisconsin','WV': 'West Virginia','WY': 'Wyoming'}
const keys = Object.keys(STATES);  
console.log(keys); 
const happiness = []; 
const brokenness = []; 

for(let i = 0; i<50; i++){
  happiness[i] = stats[keys[i]]["happiness"]
}

for(let r = 0; r<50; r++){
  brokenness[r] = parseFloat(stats[keys[r]]["broken_ratio"].replace("%", "")); 
}
console.log(happiness);
console.log(brokenness);
  

const data = {
  labels: keys,
  datasets: [
  {
    label: "Happiness",
    data: happiness,
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
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
// might have to change to a scatterplot to make the correlation factor more apparent? 

new Chart(c, {
    type: "line",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false, 
    //   ticks: {
    //     stepSize: 0.5
    // }
      }

}); 

// new Chart(c, {
//   type: "scatter",
//   data: data,
//   options: {
//     responsive: true, 
//     maintainAspectRatio:false,
//   }
// });

const scatterData = {
  datasets: [{
    label: 'Scatter Dataset',
    data: [{
      x: -10,
      y: 0
    }, {
      x: 0,
      y: 10
    }, {
      x: 10,
      y: 5
    }, {
      x: 0.5,
      y: 5.5
    }],
    backgroundColor: 'rgb(255, 99, 132)'
  }],
}


new Chart(d, {
  labels: keys,
  type: 'scatter',
  data: scatterData,
  options: {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom'
      }
    }
  }
});





