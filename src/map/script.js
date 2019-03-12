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

var styles = [{
  "featureType": "administrative",
  "elementType": "labels.text.fill",
  "stylers": [{
    "color": "#444444"
  }]
}, {
  "featureType": "landscape",
  "elementType": "all",
  "stylers": [{
    "color": "#f2f2f2"
  }]
}, {
  "featureType": "poi",
  "elementType": "all",
  "stylers": [{
    "visibility": "on"
  }]
}, {
  "featureType": "poi",
  "elementType": "geometry.fill",
  "stylers": [{
    "saturation": "-100"
  }, {
    "lightness": "57"
  }]
}, {
  "featureType": "poi",
  "elementType": "geometry.stroke",
  "stylers": [{
    "lightness": "1"
  }]
}, {
  "featureType": "poi",
  "elementType": "labels",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "road",
  "elementType": "all",
  "stylers": [{
    "saturation": -100
  }, {
    "lightness": 45
  }]
}, {
  "featureType": "road.highway",
  "elementType": "all",
  "stylers": [{
    "visibility": "simplified"
  }]
}, {
  "featureType": "road.arterial",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit",
  "elementType": "all",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "transit.station.bus",
  "elementType": "all",
  "stylers": [{
    "visibility": "on"
  }]
}, {
  "featureType": "transit.station.bus",
  "elementType": "labels.text.fill",
  "stylers": [{
    "saturation": "0"
  }, {
    "lightness": "0"
  }, {
    "gamma": "1.00"
  }, {
    "weight": "1"
  }]
}, {
  "featureType": "transit.station.bus",
  "elementType": "labels.icon",
  "stylers": [{
    "saturation": "-100"
  }, {
    "weight": "1"
  }, {
    "lightness": "0"
  }]
}, {
  "featureType": "transit.station.rail",
  "elementType": "all",
  "stylers": [{
    "visibility": "on"
  }]
}, {
  "featureType": "transit.station.rail",
  "elementType": "labels.text.fill",
  "stylers": [{
    "gamma": "1"
  }, {
    "lightness": "40"
  }]
}, {
  "featureType": "transit.station.rail",
  "elementType": "labels.icon",
  "stylers": [{
    "saturation": "-100"
  }, {
    "lightness": "30"
  }]
}, {
  "featureType": "water",
  "elementType": "all",
  "stylers": [{
    "color": "#d2d2d2"
  }, {
    "visibility": "on"
  }]
}];
var contentString = '<div id="google-popup">' +
  '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry \'s standard dummy text ever since the 1500s, when an unknown printer took a galley </p>' +
  '</div>';

function dashBoardMap(id, objectLongLititue) {
  this.id = id;
  this.objectLongLititue = objectLongLititue;
  var Map = google.maps.Map;
  this.LatLngBounds = google.maps.LatLngBounds;

  var mapOptions = {
    center: new google.maps.LatLng(0, 0),
    zoom: Math.ceil(Math.log2(window.innerWidth)) - 8,
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
  var info = []
  var buildMarker = this.pos.map((item, i) => {
    stationId = objectLongLititue[i].stationID;
     info[i] = new google.maps.InfoWindow({
      content: "<b>Station Caller Id: </b>"+stationId,
      maxWidth: 250
    });

    return new Marker({
      position: item,
      draggable: false,
      clickable: true,
      map: this.map,
      icon: image,
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

  buildMarker[0].addListener('click', function () {
    info[0].open(this.map, buildMarker[0]);
  });

  if(buildMarker.length > 1 ){
    buildMarker[1].addListener('click', function () {
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
  var map = this.map;
  var Point = google.maps.Point;
  var Marker = google.maps.Marker;
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
        this.arrowMarker.push(arrowBuilder);
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
function init() {
  // var styledMap = new google.maps.StyledMapType(styles, {
  //   name: "Styled Map"
  // });
  objectMap = new dashBoardMap('map-canvas');
  return objectMap;

}
export default init;



