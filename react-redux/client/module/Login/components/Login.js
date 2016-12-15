import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import queryString from 'query-string';
import CircularProgress from 'material-ui/CircularProgress';

const Login = React.createClass({     
    
	handleTextField(event){
        // change the state property
        this.props.handleChangeProperty(event.target.name,event.target.value);		        	
	},
    
	// Reset the state to the initial state when the route changes
	componentWillUnmount(){
		this.props.handleResetProperty();
	},

    handleSave(e){
        e.preventDefault();        
        // Check the url from the path        
        var path = this.props.params.path;
        const parsed = queryString.parse(path);
        this.props.LoginAction(
            this.props.login ,
            this.props.params.path == null? "/" : parsed.path
        );        
    },        
    handleKeyPress(e) {
        if(e.charCode==13){
              this.handleSave(e);              
        }
    },  
    render() {             
        return (
             <div>                                 
                <Card  style={{width:"30%",margin:"auto",marginTop:"100px"}}>                            
                    <CardText >
                        <h1 style={{
                        fontFamily:getMuiTheme(baseTheme).fontFamily,
                        paddingBottom:".3em",					
                        fontWeight:"400"}}>Login</h1><br />                    
                        <TextField onKeyPress={this.handleKeyPress} floatingLabelText="Username" name="username" value={this.props.login.username}   onChange={this.handleTextField} fullWidth={true} style={{marginTop:"-30px"}}	 /><br />
                        <TextField onKeyPress={this.handleKeyPress} floatingLabelText="Password" name="password" type="password"  onChange={this.handleTextField} value={this.props.login.password} fullWidth={true}   /><br />
                        <span style={{fontFamily:getMuiTheme(baseTheme).fontFamily , color:"red"}}> <b>{this.props.login.message}</b> </span>
                    </CardText>
                    <CardActions>                    
                        <RaisedButton label="Sign In" primary={true} onClick={this.loadMap} id="RefreshButton" style={{width:"100%"}} onClick={this.handleSave} />
                                                                
                    </CardActions>
                    
                    {this.props.loadingBar ?
                        <div style={{margin:"10px auto",width:"10%"}}>
                            <CircularProgress />                                       
                        </div> : '' }
                </Card>                  
            </div>
        );
    }
});

Login.contextTypes = {
    router: React.PropTypes.object	
};

export default Login;
