// This state is for showing the Snack Bar when successfully Save , Edit , Delete the data ( its like toast in Android )
// See client/utils.js how to dispacth it
// see client/module/Area/components/ListArea.js how to use it in UI

import constants from '../../constants';

let initialState = {
    openSnackBar:false,
    messageSnackBar:'',
	duration:3000
}

function snackBar(state = false,action){		
	switch (action.type) {			
		case constants.SHOW_SNACKBAR_ACTION:
            var newState={};
			Object.assign(newState,state);
			newState.openSnackBar = true;
            newState.messageSnackBar = action.data.message;
			return newState;			
		case constants.CLOSE_SNACKBAR_ACTION:
			return initialState;
		default:
			break;
	}
	return state;	    
}

export default snackBar;