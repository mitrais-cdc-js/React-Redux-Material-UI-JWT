import constants from '../../../constants';

// Every reducer must be registered in client/reducer/index.js

let initialState = {};

function listEmployee(state = initialState,action){		
	switch (action.type) {
		case constants.EMPLOYEE_LIST_LOADED:
			return action.data;			
		case constants.PROP_RESET:
			return initialState;			
		default:
			break;
	}	
	return state;	    
}

export default listEmployee;