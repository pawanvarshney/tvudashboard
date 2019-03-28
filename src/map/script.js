import {
  drawQuadratic
} from "./arrowScript";
import markerImage from "../images/map-marker.png";
// B(t) = (1 - t)^2P0 + 2(1 - t)tP1 + t^2P2
//var map = ;
var curvature = 0.2; // how curvy to make the arc
var image = markerImage;
//'../images/map-marker.png';
var curveMarker = [];
var infoWindow = [];
var objectMap = {};
let defaultColor = 'green';
let modifyColor = 'yellow';

let defaultzIndex = 0;
let modifyzindex = 99;

function dashBoardMap(id, objectLongLititue) {
  this.id = id;
  this.objectLongLititue = objectLongLititue;
  var Map = google.maps.Map;
  this.LatLngBounds = google.maps.LatLngBounds;
  const zoom = Math.ceil(Math.log2(window.innerWidth)) - 8
  var mapOptions = {
    center: new google.maps.LatLng(0, 0),
    zoom: zoom,
    maxZoom: zoom + 4
  };
  this.map = new Map(document.getElementById(id), mapOptions);
  this.markers = [];
  this.arrowMarker =[];
  this.curveMarker = [];
  this.infoWindow = [];

}
dashBoardMap.prototype.showMarker = function(id){
  var markerToShow = this.markers.find(item=>item.id == id);
  var arrowToShow = this.arrowMarker.find(item=>item['id'] == id);
  var curveToShow = curveMarker.find(item=>item['id'] == id)

  if(markerToShow.length > 0){
    if(markerToShow.length > 1){
      markerToShow[0].setMap(this.map);
      markerToShow[1].setMap(this.map);
    }else{
      markerToShow[0].setMap(this.map);
    }
  }

  if(arrowToShow > 0){
    if(arrowToShow.length > 1){
      arrowToShow[0].setMap(this.map);
      arrowToShow[1].setMap(this.map);
    }else{
      arrowToShow[0].setMap(this.map);
    }
  }

  if(curveToShow){
    curveToShow.setMap(this.map);
  }
}
dashBoardMap.prototype.removeAllMarker =  function(){
  //this.markers.length
  curveMarker.forEach((item)=>{
    if(item){
      item.setMap(null);
    }
  });

  this.arrowMarker.forEach((arrowToremove)=>{
    if(arrowToremove.length > 1){
      arrowToremove[0].setMap(null);
      arrowToremove[1].setMap(null);
    }else{
      arrowToremove[0].setMap(null);
    }
  });
  this.markers.forEach((markerToRemove)=>{
    if(markerToRemove){
      if(markerToRemove.length > 1){
        markerToRemove[0].setMap(null);
        markerToRemove[1].setMap(null);
      }else{
        markerToRemove[0].setMap(null);
      }
    }
  })

  this.markers = [];
  this.arrowMarker =[];
  curveMarker = [];

}
dashBoardMap.prototype.hideMarker = function(id){
  var markerToRemove = this.markers.find(item=>item['id'] == id);
  var arrowToremove = this.arrowMarker.find(item=>item['id'] == id);
  var curveToRemove = curveMarker.find(item=>item['id'] == id)
  if(markerToRemove){
    if(markerToRemove.length > 1){
      markerToRemove[0].setMap(null);
      markerToRemove[1].setMap(null);
    }else{
      markerToRemove[0].setMap(null);
    }
  }

  if(arrowToremove){
    if(arrowToremove.length > 1){
      arrowToremove[0].setMap(null);
      arrowToremove[1].setMap(null);
    }else{
      arrowToremove[0].setMap(null);
    }
  }

  if(curveToRemove){
    curveToRemove.setMap(null);
  }
}

dashBoardMap.prototype.createMarker = function (objectLongLititue, isArrow, arrowInfo,id) {

  var LatLng = google.maps.LatLng;
  var Marker = google.maps.Marker;
  this.pos = objectLongLititue.map((item) => {
    return new LatLng(item.lat, item.long);
  });

  let stationId;
  let inComing=0; 
	let outComing=0;
  let totalLiveLink=0;
  let totalLiveTime=0;
  var info = [];
  var self=this;
  var buildMarker = this.pos.map((item, i) => {
    stationId = objectLongLititue[i].stationID;
    inComing = objectLongLititue[i].inComing;
    outComing = objectLongLititue[i].outComing;
    totalLiveLink = objectLongLititue[i].totalLiveLink;
    totalLiveTime = objectLongLititue[i].totalLiveTime;
    info[i] = new google.maps.InfoWindow({
      content: "<b>Total Live Link Id : </b>" + totalLiveLink + "<br><b>Incoming : </b>" + inComing + "<br><b>Outgoing : </b>" + outComing + "<br><b>Total Live Time : </b>" + totalLiveTime ,
      maxWidth: 250
    });

    return new Marker({
      position: item,
      draggable: false,
      clickable: true,
      map: this.map,
      //icon: image,
      icon: this.pinSymbol(defaultColor),
      label: ""
    });
  });

  infoWindow.push(info); //used for info popup

  buildMarker.arrowInfo = {
    isArrow: isArrow || false,
    arrowInfo: arrowInfo || false
  };
  buildMarker.id = id;
  this.markers.push(buildMarker);
  
  if(buildMarker[0]){
    buildMarker[0].addListener('click', function () {
      self.changeColor(buildMarker, id);
      info[0].open(this.map, buildMarker[0]);
    });
  }

  if(buildMarker.length > 1 ){
    buildMarker[1].addListener('click', function () {
      self.changeColor(buildMarker, id);
      info[1].open(this.map, buildMarker[1]);
    });
  };
};

dashBoardMap.prototype.createArrow = function (Marker, pos, rotation, direction) {
 return  new Marker({
    position: pos,
    clickable: false,
    icon: {
      path: direction,
      strokeWeight: 2,
      strokeColor: 'green',
      strokeOpacity: 1,
      fillColor: "green",
      fillOpacity: 1,
      anchor: new google.maps.Point(0, 0),
      scale: 2.8,
      rotation: rotation
    },
    zIndex: 1, // behind the other markers,
    map: this.map,
  });
};



dashBoardMap.prototype.updateCurveMarker = function () {
  //callBack(dataToSend);

  var markers = this.markers;
  //console.log("markers-->", markers);
  var map = this.map;
  var Point = google.maps.Point;
  var Marker = google.maps.Marker;
  //console.log("Marker-->", Marker);
  markers.forEach((item, i) => {
    if (item.length > 1) {
      var pos1 = item[0].getPosition(), // latlng
        pos2 = item[1].getPosition(),
        projection = map.getProjection(),
        p1 = projection.fromLatLngToPoint(pos1), // xy
        p2 = projection.fromLatLngToPoint(pos2);
      var e = new Point(p2.x - p1.x, p2.y - p1.y), // endpoint (p2 relative to p1)
        m = new Point(e.x / 2, e.y / 2), // midpoint
        o = new Point(e.y, -e.x), // orthogonal
        c = new Point(m.x + curvature * o.x, m.y + curvature * o.y);
      var pathDef = 'M 0,0 ' + 'q ' + c.x + ',' + c.y + ' ' + e.x + ',' + e.y;
      const quadratic = {
        start: [o.x, o.y],
        end: [e.x, e.y],
        control: [c.x, c.y]
      };
      var angles = drawQuadratic(quadratic);
      var angle = angles[0].angle + 10;
      var direction = google.maps.SymbolPath.BACKWARD_CLOSED_ARROW;
      if (item.arrowInfo.isArrow) {
        if (item.arrowInfo.arrowInfo.doubleArrow) {
          var arrowBuilder = [pos1,pos2].map((item,i)=>{
             var iAngle = i === 0 ? angle :-angle
             return this.createArrow(Marker, item,iAngle, direction);
          })
        }
        if (item.arrowInfo.arrowInfo.singleArrow) {
          var posArrow = item.arrowInfo.arrowInfo.start === 0 ? pos1 : pos2;
          var arrowBuilder = [this.createArrow(Marker, posArrow, angle, direction)];
        }
        arrowBuilder.id = item.id;
        //this.arrowMarker.push(arrowBuilder);
        this.arrowMarker[i] = arrowBuilder;
      }
      var zoom = map.getZoom(),
        scale = 1 / (Math.pow(2, -zoom));
      var symbol = {
        path: pathDef,
        scale: scale,
        strokeWeight: 2,
        strokeColor: 'green',
        strokeOpacity: 1,
      };
      if (!curveMarker[i]) {
        curveMarker[i] = new Marker({
          position: pos1,
          clickable: false,
          icon: symbol,
          zIndex: 0, // behind the other markers,
          map: map,
          MarkerLabel: {
            color: "red"
          }
        });
        curveMarker[i].id = item.id;
      } else {
        curveMarker[i].setOptions({
          position: pos1,
          icon: symbol,
        });
      }


    } //condition ends here
  })


  return true;
};

/*
//dynamic pinSymbol based on color
*/
dashBoardMap.prototype.pinSymbol = function(color) {
  return {
    path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
    fillColor: color,
    fillOpacity: 1,
    strokeColor: '#154000',
    strokeWeight: 1,
    scale: 1,
   };
}

dashBoardMap.prototype.changeColor = function(buildMarker, id ) {

  //console.log("buildMarker.length-->", buildMarker.length)
  //console.log("buildMarker-->", buildMarker)
  let changeColor = this.pinSymbol(modifyColor);
  
  //Modify the color for marker
  for(let index=0; index<buildMarker.length; index++){
    buildMarker[index].setOptions({icon: changeColor, zIndex: modifyzindex});
  }
  // buildMarker[0].setOptions({icon: changeColor});
  // if(buildMarker.length > 1 ){
  //   buildMarker[1].setOptions({icon: changeColor});
  // }

  //console.log(id)
  //console.log(curveMarker)
  //console.log(curveMarker[id])
  let updateId = id-1;

  //Modify the color for curve 
  if(curveMarker[updateId]){
    var symbol = {...curveMarker[updateId].icon, strokeColor: modifyColor};
    curveMarker[updateId].setOptions({icon: symbol});
  }

  //console.log("this.arrowMarker[updateId]---->", this.arrowMarker[updateId]);

  //Modify the color for arrrow
  if(this.arrowMarker[updateId].length){

    for(let index=0; index<this.arrowMarker[updateId].length; index++ ){
      if(this.arrowMarker[updateId][index])
      {
        var symbol = {...this.arrowMarker[updateId][index].icon, strokeColor: modifyColor, fillColor: modifyColor};
        this.arrowMarker[updateId][index].setOptions({icon: symbol});
      }
    }
    
    // if(this.arrowMarker[updateId][0])
    // {
    //   var symbol0 = {...this.arrowMarker[updateId][0].icon, strokeColor: modifyColor, fillColor: modifyColor};
    //   this.arrowMarker[updateId][0].setOptions({icon: symbol0});   
    // } 
    // if(this.arrowMarker[updateId][1]){
    //   var symbol1 = {...this.arrowMarker[updateId][1].icon, strokeColor: modifyColor, fillColor: modifyColor};
    //   this.arrowMarker[updateId][1].setOptions({icon: symbol1});
    // }
  }

}

function init() {
  // var styledMap = new google.maps.StyledMapType(styles, {
  //   name: "Styled Map"
  // });
  objectMap = new dashBoardMap('map-canvas');
  return objectMap;

}
export default init;



