// Every Action Creator must be registered in client/module/App.js so these functions in this file will
// be recognize by all components

import { push } from 'react-router-redux';
import request from 'superagent';
import constants from '../../../constants';
import * as utils from '../../../utils';

export function LoadArea(){		
	return (dispatch, state) => {	
		utils.getRequest(constants.GET_ALL_AREA,null,dispatch,state,constants.LIST_AREA_LOADED);					
    }	
}

export function DeleteAreaBatch(batch){		
	return (dispatch, state) => {	
		utils.delBatchRequest(constants.DEL_BATCH_API,batch,dispatch,state,constants.LIST_AREA_LOADED);					
    }	
}

export function LoadAreaById(id){			
	return (dispatch, state) => {	
		if(id != undefined && id != null){
			utils.getRequest(constants.GET_AREA_BY_ID_API+id,null,dispatch,state,constants.AREA_LOADED);
		}	
		else{
			utils.getRequest(constants.CREATE_NEW_AREA_API,null,dispatch,state,constants.AREA_LOADED);
		}				
  }	
}

export function SaveArea(obj){		
	return (dispatch, state) => {
		if(obj.Id == 0){
			  // Save New Item
				utils.postRequest(constants.SAVE_AREA_API,obj,dispatch,state,constants.AREA_SAVED,'/listarea');
		}	
		else{
			  // Save Edited Item
			  utils.putRequest(constants.EDIT_AREA_API+obj.Id,obj,dispatch,state,constants.AREA_LOADED,'/listarea');
		}							
  }	
}
