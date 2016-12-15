import React from 'react';
import { Link } from 'react-router';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { RouteTransition } from 'react-router-transition';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

// This is the smart component that wraps all 
const Main = React.createClass({
	getInitialState () {		
		return {open: false , AppName : "Redux Framework"};
	},
	getChildContext() {
        return { 
			muiTheme: getMuiTheme(baseTheme) 
		};
    },
	handleToggle(){
		this.setState({open: !this.state.open});
	},
	handleClose(){
		 this.setState({open: false});
	},
	handleLogout(){
		this.handleClose();
		this.props.Logout();
	},
	handleChangeRoute(route){
		this.handleClose();
		this.context.router.push(route);
		console.log('test');
	},
	render(){		
		
		return(
			<div>
				<AppBar title={this.state.AppName}  style={{position:"fixed"}} 
				onLeftIconButtonTouchTap={this.handleToggle}
				 />
			
				<Drawer
					docked={false}
					width={200}
					open={this.state.open}
					onRequestChange={(open) => this.setState({open})}
					>
					<List>
						<ListItem
							disabled={true}
							leftAvatar={<Avatar>A</Avatar>}
							>
							Greetings Aris
							</ListItem>
					</List>
					
					<MenuItem onTouchTap={this.handleLogout}>Logout</MenuItem>
					<MenuItem onTouchTap={this.handleChangeRoute.bind(this,'/')}>Map</MenuItem>
					<MenuItem onTouchTap={this.handleChangeRoute.bind(this,'/listarea')}>List Area</MenuItem>
					<MenuItem onTouchTap={this.handleChangeRoute.bind(this,'/listemployee')}>List Employee</MenuItem>
				</Drawer>
				<div style={{paddingTop:"65px"}}>							 
					{React.cloneElement(this.props.children,this.props)}					
				</div>
				
			</div>
		)
	}
});
Main.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,	
};

Main.contextTypes = {
  router: React.PropTypes.object
};

export default Main;