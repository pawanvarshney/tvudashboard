<template id="app-3">
	<div class="summary-container" id="setting">
		<div class="summary-details">
			<a href="#" class="link-btn map"></a>
			<a href="#" class="link-btn menu"> </a>
			<div class="summary">Summary: Live Connection <span>500</span> Average Bitrate <span>3.6 Mbps</span> Live Time <span>50:26:39</span></div>
        <div class="summary-panel" v-show="isShow" id="hide">
             <div class="summary-label">Summary Item</div>
             <div class="summary-item">
               <ul >
                  <li v-for="item in summaryCheckboxes" :key="item.id" :class="item.class" @click="summaryItem(item.id)">
                            {{ item.text }}
                  </li>
               </ul>
             </div>
        </div>
		 	  <a  href="#" class="link-btn settings"  @click="add"></a>
		</div>
		<div class="country-details">
			<div class="country-scroll">
				<ul>
					<li>{{summaryData.country}}: Total Live <span>{{summaryData.totalLive}} </span> Incoming <span>{{summaryData.incoming}}</span> Outcoming <span>{{summaryData.outcoming}}</span> Average Bitrate <span>{{summaryData.averageBitrate}} Mbps</span> </li>
				</ul>
			</div>
			<a href="#" class="link-btn up-arrow" @click="changeSummaryData"></a>
			<a href="#" class="link-btn down-arrow" @click="changeSummaryData"></a>
		</div>
	</div>
</template>


<script>
import summaryItems from "../Constant/constant.data.js";
import { testActions } from "../actions/test.action";
import {getListMarkerInfo,setStructMapLocationArrowInfo} from "../map/convertDataForUI.js"

import init from '../map/script.js';
export default {
  mounted() {
    // var bounds = this.mapsOp.map.getBounds();
    var that =  this;
    that.mapsOp = init();
    that.xyz = 10;
    
    
    // google.maps.event.addListener(that.mapsOp.map, 'projection_changed', that.mapsOp.updateCurveMarker.bind(that.mapsOp,function(data){

    // }));
    // google.maps.event.addListener(that.mapsOp.map, 'zoom_changed', that.mapsOp.updateCurveMarker.bind(that.mapsOp,function(data){
    //    that.getData();
    // }));
    // var _objMapsInfo = summaryItems.markerInfo;

    // for (const key in _objMapsInfo) {
    //   if (_objMapsInfo.hasOwnProperty(key)) {
    //     let element = _objMapsInfo[key];
    //     this.mapsOp.createMarker(summaryItems.markerInfo[key].mapLocation, true, summaryItems.markerInfo[key].arrowInfo,key);
    //   }
    // }
    //this.getData();

  /*
   // function(){
     that.getData();
   }
*/

google.maps.event.addListener(that.mapsOp.map, 'projection_changed', function(){
  const toSendData = that.getCornerData(that.mapsOp.map);
  that.getData(toSendData).then(function(data){
      that.successHandle(data);
      that.mapsOp.updateCurveMarker.call(that.mapsOp);
  });
 
});

 google.maps.event.addListener(that.mapsOp.map, 'zoom_changed',function(){
       console.log("ddd")
      that.mapsOp.removeAllMarker();
      const toSendData = that.getCornerData(that.mapsOp.map);
      that.getData(toSendData).then(function(data){
          that.successHandle(data);
          that.mapsOp.updateCurveMarker.call(that.mapsOp);
      });

 });

    //this.createMarker(_objMapsInfo);
    // google.maps.event.addListener(that.mapsOp.map, 'projection_changed', that.mapsOp.updateCurveMarker.bind(that.mapsOp,function(data){
    //       that.getData();
    //       console.log("Projection");
    // }));
    // google.maps.event.addListener(that.mapsOp.map, 'zoom_changed', that.mapsOp.updateCurveMarker.bind(that.mapsOp,function(data){
    //     console.log(data);
    // }));

  },
  name: 'Summary',
  created () {
	    this.startInterval()
   },
  methods: {
      summaryItem:function(e){
      let selectedLi = this.$data.summaryCheckboxes.find(item=>item.id === e);
      let activeClass = selectedLi.class;
      selectedLi.class  =  activeClass ==="active"? "":"active" ;
      if(summaryItems.markerInfo[e]){
        if(activeClass ==="active"){
          this.mapsOp.hideMarker(e);
        }else{
          this.mapsOp.showMarker(e);
        }
      }

    },
    add: function (e) {
      e.preventDefault();
      this.$data.isShow = !this.$data.isShow
    },
    changeSummaryData:function(e){
        e.preventDefault();
        let index = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
        this.$data.summaryData = summaryItems.summaryData[index];
    },
    startInterval: function () {
                   var self = this;
                   return setInterval(function() {
                        let index = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
                        self.$data.summaryData = summaryItems.summaryData[index]
                   }, 10000);
    },
    getData(data) {
      // testActions
      //   .getData()
      //   .then(this.successHandle)
      //   .catch(this.errorHandle);
      return testActions.getData(data)
    },
    getCornerData(_obj){
      var bounds  =  _obj.getBounds();
      var NECorner = bounds.getNorthEast(); //right top
      var SWCorner = bounds.getSouthWest(); //left bottom
      var NWCorner = new google.maps.LatLng({lat: NECorner.lat(), lng: SWCorner.lng()}); //left top
      var SECorner = new google.maps.LatLng({lat: SWCorner.lat(), lng: NECorner.lng()}); //right bottom
      var dataToSend = {
        leftTop:NWCorner.lat() +"," + NWCorner.lng(),
        leftBottom:SWCorner.lat()+"," +SWCorner.lng(),
        rightTop:NECorner.lat()+"," +NECorner.lng(),
        rightBottom:SECorner.lat()+"," +SECorner.lng(),
      }
      return dataToSend;
  },
    createMarker(_objMapsInfo){

    for (const key in _objMapsInfo) {
      if (_objMapsInfo.hasOwnProperty(key)) {


        let element = _objMapsInfo[key];
        this.mapsOp.createMarker(element.mapLocation, true, element.arrowInfo,key);


      }
     }
    },
    successHandle(data) {
      setStructMapLocationArrowInfo(data.data);

      var _objMapsInfo = getListMarkerInfo().markerInfo;
      this.createMarker(_objMapsInfo);
      return data;
    },
    errorHandle(error) {
      console.log(error);
    }
  },data() {
    return {
      isShow: false,
      errors: {},
      summaryCheckboxes:summaryItems.summaryItems,
      summaryData:summaryItems.summaryData[0],
      data: {}
    };
  },
}


</script>
