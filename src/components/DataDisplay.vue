<template>
  <div>
    <div>
      <h2>{{componentTitle}} {{componentData}} {{componentSign}}</h2>
    </div>
    <div>
      <h3>was recorded in {{componentRoom}} at {{componentTime}}</h3>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DataDisplay',
    props: {
    lastData: {
      data: Object,
      default: {}
    },
  },
    data() {
      return {
        componentTitle: this.lastData.title,
        componentData: this.lastData.dataToUse,
        componentRoom: this.lastData.room_name,
        componentTime: this.lastData.time,
        componentSign: this.lastData.sign
      }
    },
    mounted(){
    },
    methods: {}
  }
</script>

<style>
</style>