import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500,green500,orange900,red900} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { SketchPicker } from 'react-color';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

const Area = React.createClass({
			
	// Load Area Object from server rather than create manually in reducer for initial state
	// Either for Create New Area or Edit Area
	componentWillMount(){					
		this.props.LoadAreaById(this.props.params.id);									
	},
	
	// Reset the state to the initial state when the route changes
	// Otherwise , if the state is not reseted , the state remains the same	when the user
	// leave the form
	componentWillUnmount(){
		this.props.handleResetProperty();
	},

	//property
	handleTextField(event){
		this.props.handleChangeProperty(event.target.name,event.target.value);	
	},

	handleColor(name, color, event){
		this.props.handleChangeProperty(name,color.hex);		
	},

	//event
	handleSave(){											
		this.props.SaveArea(this.props.area);				
	},
	handleBack(){
		this.context.router.push('/listarea');
	},
    render() {	
        return (           
				<Card style={{width:"40%",margin:"20px auto"}}>
					<CardHeader title="Add Area" subtitle="powered by React Material" />
					<CardActions>		
						<IconButton tooltip="Back" touch={true} tooltipPosition="top-center"  onClick={this.handleBack}   >
							<FontIcon className="material-icons"  color={blue500} >arrow_back</FontIcon>
						</IconButton>						
						<IconButton tooltip="Save" touch={true} tooltipPosition="top-center"  onClick={this.handleSave}   >
							<FontIcon className="material-icons"  color={green500} >save</FontIcon>
						</IconButton>	
						{
							this.props.loadingBar ?
							<CircularProgress size={35} />  : '' 
						}					
					</CardActions>
					<CardText>
						
						<TextField name="NameArea"	floatingLabelText="Area Name" value={this.props.area.NameArea}  onChange={this.handleTextField} fullWidth={true}  /><br />
						<TextField name="Color"	floatingLabelText="Color" value={this.props.area.Color}  fullWidth={true}  /><br />
						<SketchPicker color={this.props.area.Color} onChange={this.handleColor.bind(this,"Color")} />																				
					</CardText>
				
				</Card>
        );
    }
});


Area.contextTypes = {
    router: React.PropTypes.object	
};

export default Area;
