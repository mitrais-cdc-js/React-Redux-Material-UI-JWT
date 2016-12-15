// This state is for showing the loading Bar while accessing to the server ( GET , POST , PUT , DEL )
// See client/utils.js for the use

import constants from '../../constants';

function loadingBar(state = false,action){	
	
	switch (action.type) {			
		case constants.FETCHING_DATA:
			return true;
		case constants.FETCHING_DONE:
			return false;
		default:
			break;
	}
	return state;	    
}

export default loadingBar;