import constants from '../../../constants';

function listarea(state = [],action){		
	switch (action.type) {
		case constants.EMPLOYEE_LIST_LOADED:
			return action.data;					
		default:
			break;
	}	
	return state;	    
}

export default listarea;