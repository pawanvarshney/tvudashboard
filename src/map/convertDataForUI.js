var listMarkerInfo =  {"markerInfo" : {} }
var listMapLocation;
var arrowInfo;
var structLanLong;

//
let objIncoming = {};
let objOutgoing = {};


function init(){
	reset();
}

function resetIncomingOutgoing(){
	//
	objIncoming = {};
	objOutgoing = {};
}

function reset(){
	listMapLocation = [];
	arrowInfo = {"doubleArrow": ""};
	structLanLong = {"lat": "", "long": "", "stationID":"", "inComing":0, "outComing":0, "totalLiveLink":0, "totalLiveTime":0};
}

function pushLanLong(_lat, _long, _stationID, _inComing, _outComing, _totalLiveLink, _totalLiveTime){
	setStructLanLong(_lat, _long, _stationID, _inComing, _outComing, _totalLiveLink, _totalLiveTime);
	listMapLocation.push(getStructLanLong());
}

function getListMapLocation(){
	return listMapLocation;
}

function setStructLanLong(_lat, _long, _stationID, _inComing, _outComing, _totalLiveLink, _totalLiveTime){
	structLanLong = {"lat": _lat, "long": _long, "stationID":_stationID, "inComing":_inComing, "outComing":_outComing, "totalLiveLink":_totalLiveLink, "totalLiveTime":_totalLiveTime };
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

/*
// Make list of peer id and livepeer id
*/		
function makeIdCollection(_data){
	for(var i = 0;i < _data.length;i++){
	  var peer = _data[i]["peerID"];
	  var Livepeer = _data[i]["livePeerID"];
	  var peerLat = _data[i]["peerLat"];
	  var peerLng = _data[i]["peerLng"];
	  var livePeerLat = _data[i]["livePeerLat"];
	  var livePeerLng = _data[i]["livePeerLng"];
  
	  if(! objIncoming[peer]){
		  if(peerLat != 'undefine' && peerLng != 'undefine'){
			 objIncoming[peer] = 1;
		  }
		  else{
			  objIncoming[peer] = 0;
		  }
		  //id[peer] = {'peerID':peer, 'livePeerID':Livepeer};
	  }else{
		  if(peerLat != null && peerLng != null){
			  objIncoming[peer] = objIncoming[peer] +1;
		  }
	  }
  
	  if(! objOutgoing[Livepeer]){
		  if(livePeerLat != null && livePeerLng != null){
			  objOutgoing[Livepeer] = 1;
		  }
		  else{
			  objOutgoing[Livepeer] = 0;
		  }
		  //idLive[Livepeer] = {'peerID':peer, 'livePeerID':Livepeer};
	  }else{
		  if(livePeerLat != null && livePeerLng != null){
			  objOutgoing[Livepeer] = objOutgoing[Livepeer] +1;
		  }
	  }
  
	}
  }


export function setStructMapLocationArrowInfo(listData){
	let data;
	let stationID;
	let inComing = 0;
	let outComing = 0;
	let totalLiveLink = 0;
	let totalLiveTime = 0;

	resetIncomingOutgoing();
	makeIdCollection(listData);

	////console.log("objIncoming-->", objIncoming);
	////console.log("objOutgoing-->", objOutgoing);

	for(var index=0; index<listData.length; index++){
		data = listData[index];
		let curverFlag=0;
		inComing = objIncoming[data["peerID"]] != 'undefine' ? objIncoming[data["peerID"]] : 0; 
		outComing = objOutgoing[data["livePeerID"]] != 'undefine' ? objOutgoing[data["livePeerID"]] : 0; 
		totalLiveLink = inComing +  outComing;
		totalLiveTime = data["liveTime"];

		if(data["peerLat"] && data["peerLng"]){
			stationID =  data["livePeerID"] ? data["livePeerID"] : data["peerID"];
			pushLanLong( data["peerLat"],  data["peerLng"], stationID, inComing, outComing, totalLiveLink, totalLiveTime);
			curverFlag++;
		}
		if(data["livePeerLat"] &&  data["livePeerLng"]){
			stationID =  data["peerID"] ? data["peerID"] : data["livePeerID"];
			pushLanLong( data["livePeerLat"],  data["livePeerLng"], stationID, inComing, outComing, totalLiveLink, totalLiveTime);
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
////console.log(getListMarkerInfo());
