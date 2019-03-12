var data = {
    summaryData:[
      { id: 1, country: 'China', totalLive: 23 ,incoming:33,outcoming:66,averageBitrate:92},
      { id: 2, country: 'India', totalLive: 24 ,incoming:36,outcoming:67,averageBitrate:93},
      { id: 3, country: 'Russia', totalLive: 25 ,incoming:37,outcoming:68,averageBitrate:94},
      { id: 4, country: 'USA', totalLive: 23 ,incoming:33,outcoming:66,averageBitrate:92},
      { id: 5, country: 'Srilanka', totalLive: 24 ,incoming:36,outcoming:67,averageBitrate:93},
      { id: 6, country: 'England', totalLive: 25 ,incoming:37,outcoming:68,averageBitrate:94},
      { id: 7, country: 'France', totalLive: 23 ,incoming:33,outcoming:66,averageBitrate:92},
      { id: 8, country: 'Iran', totalLive: 24 ,incoming:36,outcoming:67,averageBitrate:93},
      { id: 9, country: 'UAE', totalLive: 25 ,incoming:37,outcoming:68,averageBitrate:94},
      { id: 10, country: 'Australia', totalLive: 25 ,incoming:37,outcoming:68,averageBitrate:94}

    ],
    summaryItems:[
      { id: 1, text: 'Live Connection', class: 'active' },
      { id: 2, text: 'Average Bitrate', class: 'active' },
      { id: 3, text: 'Live Time', class: 'active' },
      { id: 4, text: 'Error Count', class: 'active' }

     ],
    markerInfo:{
      "1":{
        mapLocation : [{
          lat: 23.634501,
          long: -102.552783
        },
        {
          lat: 17.987557,
          long: 77.1389453
        },
      ],
        arrowInfo: {doubleArrow: true},

      },
     "2":{
      mapLocation:[{
        lat: 55.5807482,
        long: 36.8251493
      },
      {
        lat: 25.6080208,
        long: 85.0730031
      }],
      arrowInfo: { singleArrow: true,start: 0},
     },
     "3":{
          mapLocation:[{
            lat: 33.6160373,
            long: 72.9460249,
          },
          {
            lat: 27.8003577,
            long: -7.3439053
          }
         ],
         arrowInfo: {doubleArrow: true,}
     },
     "4":{
      mapLocation:[{
        lat: 15.9198982,
        long: 0.1549666
      }]
     }
    }
};
//47.6548323,57.9389738   -  ---- 60.1322882,-176.4466818
export default data;
