var listMarkerInfo =  {"markerInfo" : {} }
var listMapLocation;
var arrowInfo;
var structLanLong;

function init(){
	reset();
}

function reset(){
	listMapLocation = [];
	arrowInfo = {"doubleArrow": ""};
	structLanLong = {"lat": "", "long": "", stationID:"" };
}

function pushLanLong(_lat, _long, _stationID){
	setStructLanLong(_lat, _long, _stationID);
	listMapLocation.push(getStructLanLong());
}

function getListMapLocation(){
	return listMapLocation;
}

function setStructLanLong(_lat, _long, _stationID){
	structLanLong = {"lat": _lat, "long": _long, "stationID":_stationID };
}

function getStructLanLong(){
	return structLanLong;
}

function setStructArrowInfo(_flag=true){
	var structArrowInfo;
	arrowInfo = {"doubleArrow": _flag};
}

function getStructArrowInfo(){
	return arrowInfo;
}

function getStructMapLocationArrowInfo(){
	var structMapLocationArrowInfo;
	var mapLocation = getListMapLocation();
	var arrowInfo = getStructArrowInfo();
	if(arrowInfo["doubleArrow"] != "")
			structMapLocationArrowInfo = {"mapLocation": mapLocation, "arrowInfo": arrowInfo };
	else
			structMapLocationArrowInfo = {"mapLocation": mapLocation };
	return structMapLocationArrowInfo;
}

export function setStructMapLocationArrowInfo(listData){
	var data;
	var stationID;
	for(var index=0; index<listData.length; index++){
		data = listData[index];
		var curverFlag=0;
		if(data["peerLat"] && data["peerLng"]){
			stationID =  data["livePeerID"] ? data["livePeerID"] : data["peerID"];
			pushLanLong( data["peerLat"],  data["peerLng"],  stationID );
			curverFlag++;
		}
		if(data["livePeerLat"] &&  data["livePeerLng"]){
			stationID =  data["peerID"] ? data["peerID"] : data["livePeerID"];
			pushLanLong( data["livePeerLat"],  data["livePeerLng"], stationID);
			curverFlag++;
		}
		if(curverFlag==2){
			setStructArrowInfo();
		}
		setListMarkerInfo(index+1, getStructMapLocationArrowInfo());
		reset();
	}
}

function setListMarkerInfo(index, data){
	listMarkerInfo["markerInfo"][index] = data;
}

export function getListMarkerInfo(){
	return listMarkerInfo;
}

init();
//setStructMapLocationArrowInfo(arrData);
//console.log(getListMarkerInfo());
