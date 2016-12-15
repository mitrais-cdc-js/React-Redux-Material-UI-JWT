import constants from '../../../constants';

let initialState={
	username:'aris',
	password:'password',
	message:''	
}

function login(state = initialState,action){		
	switch (action.type) {

		case constants.LOGIN_FAILED:
			var newState={};
			Object.assign(newState,state);
			newState.message = action.message;
			return newState;

		case constants.LOGOUT_ACTION:		
			localStorage.removeItem(constants.CREDENTIAL);
			return {};			

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

export default login;