import axios from "axios";
import json from '../../../../api.json'

function getData () {
  return new Promise(resolve => {
    axios({ method: "GET", "url": json.api_root + "lastData", "headers": { "content-type": "application/json" } }).then(result => {
      resolve(result.data[0]);
    }, error => {
      console.error(error);
    });
  });
}


export default {
  name: 'LastData',
  data: getData()
};