import axios from "axios";
import json from '../../../../api.json'

function getData () {
  return new Promise(resolve => {
    axios({ method: "GET", "url": json.api_root + "avgDayData", "headers": { "content-type": "application/json" } }).then(result => {
      resolve(result.data);
    }, error => {
      console.error(error);
    });
  });
}

async function prepareData () {
  let data = await getData();
  return new Promise(resolve => {
    let mainObject = {};
    mainObject.data = {};

    let labels = [];
    let temp = [];
    let hum = [];
    let press = [];

    data.forEach(function(element){
      labels.push(element.hour);
      temp.push(element.temperature);
      hum.push(element.humidity);
      press.push(element.pressure);
    });

    mainObject.data.temp = {};
    mainObject.data.temp.labels = labels;
    mainObject.data.temp.datasets = [{
      label: 'Temperature',
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      pointBackgroundColor: 'rgba(255, 0, 0, 1)',
      data: temp
    }];

    mainObject.data.hum = {};
    mainObject.data.hum.labels = labels;
    mainObject.data.hum.datasets = [{
        label: 'Humidity',
        backgroundColor: 'rgba(0, 107, 255, 0.2)',
        pointBackgroundColor: 'rgba(0, 107, 255, 1)',
        data: hum
    }];

    mainObject.data.press = {};
    mainObject.data.press.labels = labels;
    mainObject.data.press.datasets = [{
        label: 'Pressure',
        backgroundColor: 'rgba(0, 150, 136, 0.2)',
        pointBackgroundColor: 'rgba(0, 150, 136, 1)',
        data: press
    }];

    resolve(mainObject);
  });
}

async function fillData () {
  let thermomether = new Image();
  thermomether.src = 'src/assets/img/1.png';

  let mainObject = {};
  mainObject = await prepareData();
  mainObject.options = {};
  mainObject.options.temp = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Average temperature in the last 24h'
    },
    elements: {
      point: {
        radius: 5
      }
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      enabled: true,
      callbacks: {
          label: function(tooltipItems) {
              return parseInt(tooltipItems.yLabel) + ' °C';
          },
          title: function(tooltipItems) {
              return 'Hour: ' +  tooltipItems[0].xLabel;
          },
      },

    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Hour'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Temp C'
        }
      }]
    }
  }

  mainObject.options.hum = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Average humidity in the last 24h'
    },
    elements: {
      point: {
        radius: 5
      }
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      enabled: true,
      callbacks: {
          label: function(tooltipItems) {
              return parseInt(tooltipItems.yLabel) + '% RH';
          },
          title: function(tooltipItems) {
              return 'Hour: ' +  tooltipItems[0].xLabel;
          },
      },

    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Hour'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: '%RH'
        }
      }]
    }
  }

  mainObject.options.press = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Average pressure in the last 24h'
    },
    elements: {
      point: {
        radius: 5
      }
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      enabled: true,
      callbacks: {
          label: function(tooltipItems) {
              return parseInt(tooltipItems.yLabel) + 'hPa';
          },
          title: function(tooltipItems) {
              return 'Hour: ' +  tooltipItems[0].xLabel;
          },
      },

    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Hour'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'hPa'
        }
      }]
    }
  }

  return mainObject;
}

export default {
  name: 'AvgDataChart',
  data: fillData()
};