import constants from '../../../constants';

let initialState = {}

function employee(state = initialState,action){		
	switch (action.type) {
		case constants.EMPLOYEE_LOADED:
			return action.data;		
		case constants.PROP_CHANGE:
			var newState={};
			Object.assign(newState,state);
			newState[action.payload.propName] = action.payload.value;
			return newState;
		case constants.PROP_RESET:
			return initialState;				
		default:	
			break;	
	}	
	return state;	    
}

export default employee;