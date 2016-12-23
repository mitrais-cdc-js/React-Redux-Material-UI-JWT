
import constants from '../../constants';

let initialState = {
        pageIndex:0,
        pageSize:5,        
        condition:"",
        countPageItem:1   
}

function table(state = initialState,action){		
	switch (action.type) {			
		case constants.LIST_LOADED:
            var newState={};
			Object.assign(newState,state);
			newState.countPageItem = action.data.count;            
			return newState;		
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

export default table;