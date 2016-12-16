import constants from '../../../constants';

// Every reducer must be registered in client/reducer/index.js

function listarea(state = [],action){		
	switch (action.type) {
		case constants.LIST_AREA_LOADED:
			return action.data;					
		default:
			break;
	}	
	return state;	    
}

export default listarea;