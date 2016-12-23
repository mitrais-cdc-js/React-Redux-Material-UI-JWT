// Every Action Creator must be registered in client/module/App.js so these functions in this file will
// be recognize by all components

import { push } from 'react-router-redux';
import request from 'superagent';
import constants from '../../../constants';
import * as utils from '../../../utils';

export function LoadEmployee(obj){		
	return (dispatch, state) => {				
		utils.getRequest(constants.EMPLOYEE_GET_ALL_PAGING_API,obj,dispatch,state,
			function(err,res){				
				utils.dispatchWithDataJsonFormat(constants.EMPLOYEE_LIST_LOADED,dispatch,res)
				utils.dispatchWithDataJsonFormat(constants.LIST_LOADED,dispatch,res)					
		});								
    }	
}

export function DeleteEmployeeBatch(batch){			
	return (dispatch, state) => {							
		utils.delBatchRequest(constants.EMPLOYEE_DEL_BATCH_API,batch,dispatch,state,
			function(err,res){				
				utils.dispatchWithDataJsonFormat(constants.EMPLOYEE_LIST_LOADED,dispatch,res)
				utils.dispatchWithDataJsonFormat(constants.LIST_LOADED,dispatch,res)
				utils.showSnackBar(dispatch,"Data has been Deleted");
				
				constants.SOCKET.emit('DELETE_EMPLOYEE', batch);				
		});					
  }	
}

export function LoadEmployeeById(id){			
	return (dispatch, state) => {	
		if(id != undefined && id != null){
			utils.getRequest(constants.EMPLOYEE_GET_BY_ID_API+id,null,dispatch,state,
			function(err,res){				
				utils.dispatchWithDataJsonFormat(constants.EMPLOYEE_LOADED,dispatch,res)				
			});
		}	
		else{
			utils.getRequest(constants.EMPLOYEE_CREATE_NEW_API,null,dispatch,state,
			function(err,res){				
				utils.dispatchWithDataJsonFormat(constants.EMPLOYEE_LOADED,dispatch,res)								
			});
		}				
  	}	
}

export function SaveEmployee(obj){		
	return (dispatch, state) => {
		if(obj.Id == 0){
			  // Save New Item
			utils.postRequest(constants.EMPLOYEE_SAVE_API,obj,dispatch,state,
			function(err,res){				
				dispatch(push('/listemployee'));				
				utils.showSnackBar(dispatch,"Data has been Saved");
				constants.SOCKET.emit('ADD_EMPLOYEE', obj);				
			});
		}	
		else{
			  // Save Edited Item
			utils.putRequest(constants.EMPLOYEE_EDIT_API+obj.Id,obj,dispatch,state,
			function(err,res){	
				dispatch(push('/listemployee'));				
				utils.showSnackBar(dispatch,"Data has been Edited");
			
				constants.SOCKET.emit('EDIT_EMPLOYEE', obj);				
			});
		}							
  }	
}

export function onFirstLoad(){
	return(dispatch,state) => {
		
		constants.SOCKET.emit('news', { hello: 'Another Aris' });		
		constants.SOCKET.on('DELETE_EMPLOYEE_BROADCAST', function (data) {
			console.log('Receive Broadcase');
			dispatch(LoadEmployee(state().table));
		});
		constants.SOCKET.on('ADD_EMPLOYEE_BROADCAST', function (data) {
			console.log('Receive Broadcase');
			dispatch(LoadEmployee(state().table));
		});
		constants.SOCKET.on('EDIT_EMPLOYEE_BROADCAST', function (data) {
			console.log('Receive Broadcase');
			dispatch(LoadEmployee(state().table));
		});
	}
}