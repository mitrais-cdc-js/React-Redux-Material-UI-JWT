// Every Action Creator must be registered in client/module/App.js so these functions in this file will
// be recognize by all components

import { push } from 'react-router-redux';
import request from 'superagent';
import constants from '../../../constants';
import * as utils from '../../../utils';

export function LoadEmployee(){		
	return (dispatch, state) => {	
		utils.getRequest(constants.EMPLOYEE_GET_ALL_API,null,dispatch,state,constants.EMPLOYEE_LIST_LOADED);					
    }	
}

export function DeleteEmployeeBatch(batch){			
	return (dispatch, state) => {	

		utils.delBatchRequest(constants.EMPLOYEE_DEL_BATCH_API,batch,dispatch,state,constants.EMPLOYEE_LIST_LOADED);					
    }	
}

export function LoadEmployeeById(id){			
	return (dispatch, state) => {	
		if(id != undefined && id != null){
			utils.getRequest(constants.EMPLOYEE_GET_BY_ID_API+id,null,dispatch,state,constants.EMPLOYEE_LOADED);
		}	
		else{
			utils.getRequest(constants.EMPLOYEE_CREATE_NEW_API,null,dispatch,state,constants.EMPLOYEE_LOADED);
		}				
  }	
}

export function SaveEmployee(obj){		
	return (dispatch, state) => {
		if(obj.Id == 0){
			  // Save New Item
				utils.postRequest(constants.EMPLOYEE_SAVE_API,obj,dispatch,state,constants.AREA_SAVED,'/listemployee');
		}	
		else{
			  // Save Edited Item
			  utils.putRequest(constants.EMPLOYEE_EDIT_API+obj.Id,obj,dispatch,state,constants.AREA_LOADED,'/listemployee');
		}							
  }	
}
