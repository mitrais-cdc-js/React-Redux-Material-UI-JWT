import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500,green500,orange900,red900} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// this component is used for delete Confirmation Modal
// see client/module/Area/components/ListArea.js for the example how to use it

const ConfirmationDeleteDialog = React.createClass({       
    
    render() {
        const actions = [
			<FlatButton
				label="No"
				primary={true}
				onTouchTap={this.props.handleCloseModal}
			/>,
			<FlatButton
				label="Yes"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.props.handleDelete}
			/>,
		];             
        return (
            <Dialog
					title="Confirmation"
					actions={actions}
					modal={false}
					open={this.props.openConfirmationDelete}
					onRequestClose={this.props.handleCloseModal} >
					Are you sure that you want to delete the item?
				</Dialog>
        );
    }
});


export default ConfirmationDeleteDialog;
