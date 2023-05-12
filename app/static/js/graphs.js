// import Chart from 'chart.js/auto';
var c = document.getElementById("myChart");

new Chart(c, {
    type: "line",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false, 
      }

});

// example data to get this working ^^
const data = {
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
}




