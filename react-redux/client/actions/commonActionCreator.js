// Every Action Creator must be registered in client/module/App.js so these functions in this file will
// be recognize by all components

import { push } from 'react-router-redux'
import request from 'superagent';
import constants from '../constants';
import dateFormat from 'dateformat'

// This Action Creator is for creating actions that are commonly used 
export function handleChangeProperty(propName,value){		
	return {
		type:constants.PROP_CHANGE,
		payload:{
			propName,value
		}
	}
}

export function handleResetProperty(){		
	return {
		type:constants.PROP_RESET,
	
	}
}


export function handleCloseSnackBar(){		
	return {
		type:constants.CLOSE_SNACKBAR_ACTION,
	
	}
}
