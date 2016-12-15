
// !!!!!!!! ========  ATTENTION ========= !!!!!!!!!!
// THIS AREA HAS NOT BEEN REFACTORED
// PLEASE SEE ANOTHER MODULE  ( Area or Employee )  :) :) :)

import { push } from 'react-router-redux'
import request from 'superagent';
import constants from '../../../constants';
import dateFormat from 'dateformat'

export function loadMap(map,context){
	return (dispatch, state) => {
        request
        .get(constants.GET_MAP_MARKER)	
        .set({Authorization:"Bearer "+getToken()})			
        .end((err, res) => {						
            if (err) {
                unAurthorizeCheck(err,dispatch,state)
            }
            else{
                const data = JSON.parse(res.text);
                refreshMap(data,map,context);
            }                    
        });		
	}
}

export function saveMap(object,map,context){		
	return (dispatch, state) => {
        request
        .post(constants.SAVE_MAP_API)		
        .set({Authorization:"Bearer "+getToken()})
        .send(object)		
        .end((err, res) => {
            if (err) {
                unAurthorizeCheck(err,dispatch,state)
            }
            const data = JSON.parse(res.text);
            var obj={};
            for(var i=0;i<data.length;i++){
                if(data[i].latitude == object.Latitude){
                    obj = data[i];
                    break;
                }
            }
            for(var i=0;i<area.length;i++){
                if(area[i].id==obj.area){
                    area[i].map.push(obj);
                }
            }
            refreshMap(data,map,context);						
            context.handleClear();
            context.handleTouchTap("Data has been saved");
        });
	}
}

export function editMap(object,map,context){		
	return (dispatch, state) => {
		request
        .put(constants.EDIT_MAP_API+object.Id)
        .set({Authorization:"Bearer "+getToken()})		
        .send(object)		
        .end((err, res) => {
            if (err) {
                unAurthorizeCheck(err,dispatch,state)
            }
            const data = JSON.parse(res.text);
            var obj={};
            for(var i=0;i<data.length;i++){
                if(data[i].id == object.Id){
                    obj = data[i];
                    break;
                }
            }
            for(var i=0;i<area.length;i++){
                
                for(var j=0;j<area[i].map.length;j++){
                    if(area[i].map[j].id ==obj.id){
                        area[i].map.splice(j,1);
                    }
                }	
                if(area[i].id == obj.area){
                    area[i].map.push(obj);
                }						
            }
            refreshMap(data,map,context);
            context.handleClear();
            context.handleTouchTap("Data has been saved");
        });
			
	}
}

export function deleteMap(object,map,context){		
	return (dispatch, state) => {
		request
			.del(constants.DELETE_MAP_API+object.Id)			
			.set({Authorization:"Bearer "+getToken()})			
			.end((err, res) => {
						if (err) {
							unAurthorizeCheck(err,dispatch,state)
						}
						const data = JSON.parse(res.text);
						for(var i=0;i<area.length;i++){							
							for(var j=0;j<area[i].map.length;j++){
								if(area[i].map[j].id == object.Id){
									area[i].map.splice(j,1);
								}
							}														
						}
						refreshMap(data,map,context);
						context.handleClear();
						context.handleTouchTap("Data has been deleted");
					});
		
		
	}
}

export function loadArea(context){	
	return (dispatch, state) => {
		request
				.get(constants.GET_ALL_AREA)
				.set({Authorization:"Bearer "+getToken()})
				.end((err, res) => {
					if (err) {
							unAurthorizeCheck(err,dispatch,state)
					}
					const data = JSON.parse(res.text);
					window.area=data;
					context.handleLoadArea(data);
					context.initMap();				
					if(data.length>0){
						context.handleAreaChange(null,null,data[0].id);
					}		
				})
	
	}
}


function getToken(){
	var cred =localStorage.getItem(constants.CREDENTIAL);
	if(cred!=null){
		var credObj= JSON.parse(cred);
		return credObj.access_token;
	}	
	return null;
}

function unAurthorizeCheck(err,dispatch,state){
	if(err.status == 401){
		dispatch(push('/Login'+state().routing.locationBeforeTransitions.pathname));
		return;
	}
}


function refreshMap(data,map,context){	
	var indonesia =  {lat: -1.6490947745002846, lng: 121.552734375};
	map.setZoom(5);
	map.setCenter(indonesia);
	var infowindow = new google.maps.InfoWindow();	
	var image = 'https://maps.google.com/mapfiles/kml/shapes/buildings.png';
	var arrayArea=[];
	
	if(window.arrayPolygon == null){
		window.arrayPolygon=[];			
	}
	else{
		for(var i=0;i<arrayPolygon.length;i++){
			arrayPolygon[i].setMap(null);
		}
		window.arrayPolygon=[];
	}
	
	for (var i = 0; i < markersArray.length; i++) {
		markersArray[i].setMap(null);
	}
	markersArray=[];
	for (var i = 0; i < markersSearchArray.length; i++) {
		markersSearchArray[i].setMap(null);
	}
	markersSearchArray=[];

	for (var i = 0; i < data.length; i++) {      
	
		var latLng = new google.maps.LatLng(data[i].latitude,data[i].longitude);
		var marker = new google.maps.Marker({
			position: latLng,
			map: map,
			icon:image
		});	
		markersArray.push(marker);

		google.maps.event.addListener(marker, 'click', (function (marker, i) {								
			return function () {
				context.objectToControl(data[i]);
				map.setZoom(16);
				map.setCenter(marker.getPosition());
				
				request
				.get(constants.WEATHER_API)
				.query({ 
						lat: data[i].latitude,
						lon:  data[i].longitude,
						cnt: 10,
						appid: constants.APP_ID
					})
				.end((err, res) => {
					if (err) {
						var a= err;
					}
					var now = new Date();
					const weatherdata = JSON.parse(res.text);
					var details="";				
					for(var i=0;i<weatherdata.list.length;i++){
						var img=constants.WEATHER_IMAGE_URL+ weatherdata.list[i].weather[0].icon;
						details+= (i+1) +" <img src='"+(constants.WEATHER_IMAGE_URL+ weatherdata.list[i].weather[0].icon) +".png' alt='Image' >" + dateFormat(now, "dddd dd mmmm yyyy")+" : "+ weatherdata.list[i].weather[0].description+"<br/>"
						now.setDate(now.getDate() + 1);
					}
					infowindow.setContent("<b>"+data[i].placeName+"</b><br/>"
					+ "Phone Number   : "+ data[i].phoneNumber+" <br/>"
					+ "Total Employee : "+ data[i].totalEmployee+" <br/>"					
					+ "Address 		  : "+ data[i].address+" <br/>"+
					details
					);
					infowindow.open(map, marker);																		
				});
			}
		})(marker, i)); 
	}
	for(var i=0;i<area.length;i++){
		if(area[i].map.length>0){
			var array = {};
			array.data=[];			
			for(var j=0;j<area[i].map.length;j++){
				array.data.push({lat: area[i].map[j].latitude, lng :area[i].map[j].longitude});
			}
			array.color=area[i].color;
			arrayArea.push(array);
		}
	}
	
	for(var i=0;i<arrayArea.length;i++){		
		var newPolygon = new google.maps.Polygon({
          paths: arrayArea[i].data,
          strokeColor:  arrayArea[i].color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor:  arrayArea[i].color,
          fillOpacity: 0.35
        });
		newPolygon.setMap(map);
		arrayPolygon.push(newPolygon);
	}	
}
