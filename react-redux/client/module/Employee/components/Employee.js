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

const Employee = React.createClass({
			
	// Load Employee Object from server rather than create manually for initial state
	// Either for Create New Employee or Edit Employee
	componentWillMount(){					
		this.props.LoadEmployeeById(this.props.params.id);									
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

	//event
	handleSave(){											
		this.props.SaveEmployee(this.props.employee);				
	},
	handleBack(){
		this.context.router.push('/listemployee');
	},
    render() {	
        return (           
				<Card style={{width:"40%",margin:"20px auto"}}>
					<CardHeader title="Employee" subtitle="powered by React Material" />
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
						<TextField name="FirstName"	floatingLabelText="First Name" value={this.props.employee.FirstName}  onChange={this.handleTextField} fullWidth={true}  /><br />
						<TextField name="LastName"	floatingLabelText="Last Name" value={this.props.employee.LastName}  onChange={this.handleTextField} fullWidth={true}  /><br />
						<TextField name="Address"	floatingLabelText="Address" value={this.props.employee.Address}  onChange={this.handleTextField} fullWidth={true}  /><br />
						<TextField name="PhoneNumber"	floatingLabelText="PhoneNumber" value={this.props.employee.PhoneNumber}  onChange={this.handleTextField} fullWidth={true}  /><br />
						<TextField name="CityOfBorn"	floatingLabelText="City Of Born" value={this.props.employee.CityOfBorn}  onChange={this.handleTextField} fullWidth={true}  /><br />
						<TextField name="EmployeeStatus"	floatingLabelText="Employee Status" value={this.props.employee.EmployeeStatus}  onChange={this.handleTextField} fullWidth={true}  /><br />																				
						<TextField name="SpouseName"	floatingLabelText="Spouse Name" value={this.props.employee.SpouseName}  onChange={this.handleTextField} fullWidth={true}  /><br />
						<TextField name="TotalChildren"	floatingLabelText="Total Children" value={this.props.employee.TotalChildren}  onChange={this.handleTextField} fullWidth={true}  /><br />
						<TextField name="Hobby"	floatingLabelText="Hobby" value={this.props.employee.Hobby}  onChange={this.handleTextField} fullWidth={true}  /><br />
						<TextField name="CareerPreference"	floatingLabelText="Career Preference" value={this.props.employee.CareerPreference}  onChange={this.handleTextField} fullWidth={true}  /><br />
						<TextField name="LastEmployment"	floatingLabelText="Last Employment" value={this.props.employee.LastEmployment}  onChange={this.handleTextField} fullWidth={true}  /><br />
					</CardText>				
				</Card>
        );
    }
});

Employee.contextTypes = {
    router: React.PropTypes.object	
};

export default Employee;
