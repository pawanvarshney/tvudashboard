<template>
  <div id="map-container" class="container">
    <GoogleMap />
    <Summary  />
  </div>
</template>

<script>
import Summary from  './components/Summary';
import GoogleMap from  './components/GoogleMap';


export default {
  name: 'App',
  components: {
    Summary,
    GoogleMap
  }
}
</script>

<style>
 html,
        body,
        #map-canvas {
            height: 100%;
            width: 100%;
            margin: 0px;
            padding: 0px;
            position: inherit !important;
        }
        .path {
            stroke-dasharray: 2;
        }
        .line {
            stroke-dasharray: 2;
        }

        .gm-style-iw-d{
          overflow: auto !important;
        }

        /*style the box*/
        .gm-style .gm-style-iw {
            background-color: #3C61AD !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            /*height: 200px !important;*/
            min-height: 35px !important;
            padding-top: 10px;
            display: block !important;
         }

         /*style the p tag*/
         .gm-style .gm-style-iw #google-popup p{
            padding: 10px;
         }


        /*style the arrow*/
        .gm-style div div div div div div div div {
            background-color: #3C61AD !important;
            padding: 0;
            margin: 0;
            padding-bottom: 4px;
            top: 0;
            color: #fff;
            font-size: 13px;
        }

        /*style the link*/
        .gm-style div div div div div div div div a {
            color: #f1f1f1;
            font-weight: bold;
        }
</style>
