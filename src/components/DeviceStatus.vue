<template>
  <div class="table-wrapper">
    <table class="fl-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Room</th>
          <th>Battery percentage</th>
          <th>Voltage</th>
          <th>Linkquality</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sensorData" :key="item.name">
          <td>{{item.name}}</td>
          <td>{{item.type}}</td>
          <td>{{item.room_name}}</td>
          <td>{{item.battery}}%</td>
          <td>{{item.voltage}}v</td>
          <td>{{item.linkquality}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from "axios";
  import json from '../../api.json'

  export default {
    name: 'DeviceStatus',
    data() {
      return {
        sensorData: null
      }
    },
    mounted(){
      this.fillData();
    },
    methods: {
      getData: function(){
        return new Promise(resolve => {
          let access_token =  localStorage.getItem('access_token');

          axios({ method: "GET", "url": json.api_root + "deviceStatus", "headers": { "content-type": "application/json", 'Authorization': 'Bearer ' + access_token} }).then(result => {
            resolve(result.data);
          }, error => {
            console.error(error);
          });
        });
      },

      fillData: async function(){
        this.sensorData = await this.getData();
      }
    }
  }
</script>

<style>
/* Table Styles */

.table-wrapper{
    margin: 10px 70px 70px;
    box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
}

.fl-table {
    border-radius: 5px;
    font-size: 12px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    background-color: white;
}

.fl-table td, .fl-table th {
    text-align: center;
    padding: 8px;
}

.fl-table td {
    border-right: 1px solid #f8f8f8;
    font-size: 12px;
}

.fl-table thead th {
    color: #ffffff;
    background: #4FC3A1;
}


.fl-table thead th:nth-child(odd) {
    color: #ffffff;
    background: #324960;
}

.fl-table tr:nth-child(even) {
    background: #F8F8F8;
}

/* Responsive */

@media (max-width: 767px) {
  tbody>tr{
    width: 100%;
  }
  .fl-table {
      display: block;
      width: 100%;
  }
  .table-wrapper:before{
      content: "Scroll horizontally >";
      display: block;
      text-align: right;
      font-size: 11px;
      color: white;
      padding: 0 0 10px;
  }
  .fl-table thead, .fl-table tbody, .fl-table thead th {
      display: block;
  }
  .fl-table thead th:last-child{
      border-bottom: none;
  }
  .fl-table thead {
      float: left;
  }
  .fl-table tbody {
      width: auto;
      position: relative;
      overflow-x: auto;
  }
  .fl-table td, .fl-table th {
      padding: 20px .625em .625em .625em;
      height: 60px;
      vertical-align: middle;
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: auto;
      font-size: 13px;
      text-overflow: ellipsis;
  }
  .fl-table thead th {
      text-align: left;
      border-bottom: 1px solid #f7f7f9;
  }
  .fl-table tbody tr {
      display: table-cell;
  }
  .fl-table tbody tr:nth-child(odd) {
      background: none;
  }
  .fl-table tr:nth-child(even) {
      background: transparent;
  }
  .fl-table tr td:nth-child(odd) {
      background: #F8F8F8;
      border-right: 1px solid #E6E4E4;
  }
  .fl-table tr td:nth-child(even) {
      border-right: 1px solid #E6E4E4;
  }
  .fl-table tbody td {
      display: block;
      text-align: center;
  }
}
</style>