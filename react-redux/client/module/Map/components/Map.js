
// !!!!!!!! ========  ATTENTION ========= !!!!!!!!!!
// THIS AREA HAS NOT BEEN REFACTORED
// PLEASE SEE ANOTHER MODULE  ( Area or Employee )  :) :) :)

import React from 'react';
import { Link } from 'react-router';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionSave from    'material-ui/svg-icons/content/save';
import ActionClear from    'material-ui/svg-icons/content/clear';
import ActionRefresh from    'material-ui/svg-icons/Navigation/refresh';
import ActionAdd from    'material-ui/svg-icons/Image/control-point';
import ActionEdit from    'material-ui/svg-icons/editor/border-color';

import {fullWhite} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { SketchPicker } from 'react-color';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500,green500,orange900,red900} from 'material-ui/styles/colors';

const Map = React.createClass({
	getInitialState () {		
		return this.getInitialValue();
	},
	getInitialValue(){
		return {
			//property map
			Id:0,
			Latitude:"",
			Longitude:"",
			PlaceName:"",
			Address:"",
			TotalEmployee:"",
			PhoneNumber:"",	
			Area:1,	

			//UI			
			open: false,
			openSnackBar:false,
			messageSnackBar:"",
			showArea:true,
			ArrayArea:[]			
		};
	},
	clearObjectMap(){
		return {
			//property map
			Id:0,
			Latitude:"",
			Longitude:"",
			PlaceName:"",
			Address:"",
			TotalEmployee:"",
			PhoneNumber:"",					
		};
	},

	objectToControl(object){
		this.setState({
			Id:object.id,
			Latitude:object.latitude,
			Longitude:object.longitude,
			PlaceName:object.placeName,
			Address:object.address,
			TotalEmployee:object.totalEmployee,
			PhoneNumber:object.phoneNumber,	
			Area:object.area			
		});
	},
	controlToObject(){
		return{
			Id:this.state.Id,				
			Latitude:this.state.Latitude,
			Longitude:this.state.Longitude,
			PlaceName:this.state.PlaceName,
			Address:this.state.Address,
			TotalEmployee:this.state.TotalEmployee,
			PhoneNumber:this.state.PhoneNumber,
			Area:this.state.Area
		}
	},

	componentDidMount(){		
		this.props.loadArea(this);					
	},
	
	loadMap(){		
		this.props.loadMap(map,this);		
	},
	
	initMap(){
		var that = this;

		//set Initial Map to Indonesia
		var indonesia = {lat: -1.6490947745002846, lng: 121.552734375};
		window.map = new google.maps.Map(document.getElementById('map'), {
			zoom: 5,
			center: indonesia
		});

		//add Refresh Button to Map
		var centerControlDiv = document.createElement('div');
        var centerControl = new CenterControl(centerControlDiv, map);
        centerControlDiv.index = 1;		
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

		window.markersArray = [];	
		window.markersSearchArray = [];	
	
		//Add Event when user click the Map
		map.addListener('click', function(event) {     
			for (var i = 0; i < markersSearchArray.length; i++) {
				markersSearchArray[i].setMap(null);
			}
			markersSearchArray=[];
			var marker = new google.maps.Marker({
					position: event.latLng,
					map: map
			});
			that.handleTextField({
				target:{
					id:"Latitude",
					value:event.latLng.lat()
				}
			});
			that.handleTextField({
				target:{
					id:"Longitude",
					value:event.latLng.lng()
				}
			});
			markersSearchArray.push(marker);
        });

		// Search from google API
		var input = (document.getElementById('SearchPlace'));	
		var autocomplete = new google.maps.places.Autocomplete(input);
		autocomplete.bindTo('bounds', map);	    
		autocomplete.addListener('place_changed', function() {		
			var place = autocomplete.getPlace();
			that.handleTextField({
				target:{
					id:"Latitude",
					value:place.geometry.location.lat()
				}
			});
			that.handleTextField({
				target:{
					id:"Longitude",
					value:place.geometry.location.lng()
				}
			});
			if (!place.geometry) {
				// User entered the name of a Place that was not suggested and
				// pressed the Enter key, or the Place Details request failed.
				window.alert("No details available for input: '" + place.name + "'");
				return;
			}

			// If the place has a geometry, then present it on a map.
			if (place.geometry.viewport) {
				map.fitBounds(place.geometry.viewport);				
			} else {
				map.setCenter(place.geometry.location);
				map.setZoom(17);  // Why 17? Because it looks good.
			}

			for (var i = 0; i < markersSearchArray.length; i++) {
				markersSearchArray[i].setMap(null);
			}
			markersSearchArray=[];

			var marker = new google.maps.Marker({
				map: map,
				anchorPoint: new google.maps.Point(0, -29)
			});
			marker.setIcon(/** @type {google.maps.Icon} */({
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(35, 35)
			}));
			marker.setPosition(place.geometry.location);
			marker.setVisible(true);
			markersSearchArray.push(marker);

		});     
		//load from database
		this.props.loadMap(map,this); 
	},
	
	//handle Property 
	handleTextField(event){
		this.setState({
			[event.target.id]: event.target.value
		});	
	},

	handleAreaChange(event, index, value){
		this.setState({Area:value});
	},

	// Action Map 
	handleSave(e){
		e.preventDefault();				
		if(this.state.Id==0){
			this.props.saveMap(this.controlToObject(),map,this);
		}
		else{
			this.props.editMap(this.controlToObject(),map,this);
		}		
	},
	handleDelete(){
		this.handleClose();
		this.props.deleteMap(this.controlToObject(),map,this);
	},
	handleClear(){		
		this.setState(this.clearObjectMap());
		document.getElementById('SearchPlace').value="";
	},

	// Modal
	handleOpen() { // Delete Confirm
    	this.setState({open: true});
  	},
  	handleClose() {
    	this.setState({open: false});
  	},
	
	// Snackbar
	handleTouchTap(message)  {
		this.setState({
			openSnackBar: true,
			messageSnackBar:message
		});
	},
	handleRequestClose () {
		this.setState({
			openSnackBar: false,
			messageSnackBar:""
		});
	},
	// Toggle show area on the map
	handleToggle (event, toggled) {
		this.setState({
			showArea: toggled,
		});
		if(!toggled){
			if(arrayPolygon != null){
				for(var i=0;i<arrayPolygon.length;i++){
					arrayPolygon[i].setMap(null);
				}					
			}
		}
		else{
			for(var i=0;i<arrayPolygon.length;i++){
					arrayPolygon[i].setMap(map);
				}			
		}
	},
	// Load Area
	
	handleLoadArea(arrayArea){
		this.setState({ArrayArea:arrayArea});
	},

	render(){
		
		// Button Delete Confirmation		  
		const actions = [
			<FlatButton
				label="No"
				primary={true}
				onTouchTap={this.handleClose}
			/>,
			<FlatButton
				label="Yes"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleDelete}
			/>,
		];
	
		let menuitem= this.state.ArrayArea.map(function(area, index){                    
				return <MenuItem key={ index } value={area.id} primaryText={area.nameArea} />;
            })
		return(
			<div>				
				<h1 style={{
					fontFamily:getMuiTheme(baseTheme).fontFamily,
					paddingBottom:".3em",
					borderBottom:"1px solid #eee",
					fontWeight:"400",
					marginLeft:"40px",
					marginRight:"100px"
				}}>Office List</h1>				
				<RaisedButton label="Refresh" icon={<ActionRefresh color={fullWhite} />} primary={true} onClick={this.loadMap} id="RefreshButton" style={{width:"100px"}} />				 
				<br/>
				<Toggle
					label="Show Area"
					toggled={this.state.showArea}
					onToggle={this.handleToggle}
					style={{paddingBottom:".3em",marginLeft:"40px",width:"200px"}}/>
				<br/>
				<div id="map"  style={{marginBottom:"20px"}}></div>	
				<Card style={{width:"40%",margin:"auto"}}>
					<CardHeader title="Add Area" subtitle="powered by React Material" />
					<CardActions>							
						<IconButton tooltip="Save" touch={true} tooltipPosition="top-center"  onClick={this.handleSave}   >
							<FontIcon className="material-icons"  color={green500}  >save</FontIcon>
						</IconButton>	
						<IconButton tooltip="Clear" touch={true} tooltipPosition="top-center"  onClick={this.handleClear} >
							<FontIcon className="material-icons"  color={blue500}>clear</FontIcon>
						</IconButton>	
						{this.state.Id !=0 ?
						<IconButton tooltip="Delete" touch={true} tooltipPosition="top-center"  onTouchTap={this.handleOpen} >
							<FontIcon className="material-icons"  color={red900}>delete</FontIcon>
						</IconButton> : ''}
					</CardActions>
					<CardText>
						<TextField id="SearchPlace"  fullWidth={true} /><br />
						<TextField	floatingLabelText="Latitude" id="Latitude" value={this.state.Latitude}  onChange={this.handleTextField} fullWidth={true}  /><br />
						<TextField	floatingLabelText="Longitude" id="Longitude" value={this.state.Longitude}  onChange={this.handleTextField} fullWidth={true}   /><br />
						<TextField	floatingLabelText="Place Name" id="PlaceName"  value={this.state.PlaceName} onChange={this.handleTextField}  fullWidth={true}  /><br />
						<TextField	floatingLabelText="Address" id="Address" value={this.state.Address}  onChange={this.handleTextField}  fullWidth={true}  /><br />
						<TextField	floatingLabelText="Total Employee" id="TotalEmployee"  value={this.state.TotalEmployee} onChange={this.handleTextField} fullWidth={true}   /><br />
						<TextField id="PhoneNumber"	floatingLabelText="Phone Number" id="PhoneNumber" value={this.state.PhoneNumber} onChange={this.handleTextField}  fullWidth={true}   /><br />
						<span>Area : </span>
						<DropDownMenu value={this.state.Area} onChange={this.handleAreaChange}  >
							{menuitem}
						</DropDownMenu>			
					</CardText>
				</Card>
				
				<Dialog
					title="Confirmation"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose} >
					Are you sure that you want to delete the area?
				</Dialog>
				
				<Snackbar
						open={this.state.openSnackBar}
						message={this.state.messageSnackBar}
						autoHideDuration={2000}
						onRequestClose={this.handleRequestClose}
					/>
			</div>
		)
	}
});

 function CenterControl(controlDiv, map) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.getElementById('RefreshButton');        
        controlUI.appendChild(controlText);
}

Map.contextTypes = {
    router: React.PropTypes.object	
};


export default Map;