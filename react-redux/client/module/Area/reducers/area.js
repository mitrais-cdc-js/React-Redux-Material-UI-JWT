import constants from '../../../constants';

// Every reducer must be registered in client/reducer/index.js

let initialState = {}
function area(state = initialState,action){		
	switch (action.type) {
		case constants.AREA_LOADED:
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

export default area;