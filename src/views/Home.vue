<template>
  <div class="home">
    <!-- <navigation/> -->
    <div class="main_div">
      <div style="height: 25%; width: 70%;">
        <line-chart
          v-if="loaded"
          :chartdata="tempData"
          :options="tempOptions"/>
      </div>
      <div>
        <data-display
        v-if="loaded"
        :lastData="tempDisplayData"
        />
      </div>
    </div>
    <div class="main_div">
      <div style="height: 25%; width: 70%;">
        <line-chart
          v-if="loaded"
          :chartdata="humData"
          :options="humOptions"/>
      </div>
      <div>
        <data-display
        v-if="loaded"
        :lastData="humDisplayData"
        />
      </div>
    </div>
    <div class="main_div">
      <div style="height: 25%; width: 70%;">
        <line-chart
          v-if="loaded"
          :chartdata="pressData"
          :options="pressOptions"/>
      </div>
      <div>
        <data-display
        v-if="loaded"
        :lastData="pressDisplayData"
        />
      </div>
    </div>
  </div>
</template>

<script>

import LineChart from '@/components/LineChart.vue'
import AvgDataChart from'@/components/js/charts/AvgDataChart.js'
import LastData from'@/components/js/charts/LastData.js'
import DataDisplay from '../components/DataDisplay.vue'

export default {
  name: 'Home',
  components: {
    LineChart,
    DataDisplay,
  },
  data: () => ({
    loaded: false,
    appName: process.env.VUE_APP_NAME
  }),
  async mounted () {
    // Get main data from JS functions
    let data = await AvgDataChart.data;
    this.displayData = await LastData.data;

    // Temperature data
    this.tempData = await data.data.temp;
    this.tempOptions = await data.options.temp;

    this.tempDisplayData={};
    this.tempDisplayData.dataToUse = this.displayData.temperature;
    this.tempDisplayData.room_name = this.displayData.room_name;
    this.tempDisplayData.time = this.displayData.time;
    this.tempDisplayData.title = 'Temperature ';
    this.tempDisplayData.sign = '°C';

    // Humidity data
    this.humData = await data.data.hum;
    this.humOptions = await data.options.hum;

    this.humDisplayData = {};
    this.humDisplayData.dataToUse = this.displayData.humidity;
    this.humDisplayData.room_name = this.displayData.room_name;
    this.humDisplayData.time = this.displayData.time;
    this.humDisplayData.title = 'Humidity ';
    this.humDisplayData.sign = '%RH';

    // Humidity data
    this.pressData = await data.data.press;
    this.pressOptions = await data.options.press;

    this.pressDisplayData = {};
    this.pressDisplayData.dataToUse = this.displayData.pressure;
    this.pressDisplayData.room_name = this.displayData.room_name;
    this.pressDisplayData.time = this.displayData.time;
    this.pressDisplayData.title = 'Pressure ';
    this.pressDisplayData.sign = 'hPa';

    // Set loaded to true so charts can be displayed
    this.loaded = true;
  },
  methods:{}
}
</script>
<style>
  .main_div{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .home{
    background: linear-gradient(90deg, rgba(222,222,222,1) 0%, rgba(241,241,241,1) 50%, rgba(222,222,222,1) 100%);
  }

  @media(max-width: 980px){
    .main_div{
    flex-direction: column-reverse;
  }
  }
</style>
