import { push } from 'react-router-redux'
import constants from './constants';
import request from 'superagent';
import queryString from 'query-string';

// These bunch of functions are for the common used in components such as calling the API etc.

export function showResult(err,dispatch,currentState,nextAction,result,nextPath,message){
    if(err){
        if(err.status == 401){
            var obj={};
            obj.path=currentState().routing.locationBeforeTransitions.pathname;
            const stringified = queryString.stringify(obj);            
		    dispatch(push('/Login/'+stringified));		
	    }
    }    
    else{
        if(message != null){
            // invoke the snackBar to show up when successfully save, edit , delete
            dispatch({
                type:constants.SHOW_SNACKBAR_ACTION,
                payload:{
                    message:message
                }
            })
        }
        if(nextPath != null && nextPath!= undefined){
            dispatch(push(nextPath));
        }
        else{
            dispatch({ type:nextAction, data:JSON.parse(result.text) });
        }
        
    }
}

export function getRequest(url,queryStringObject,dispatch,currentState,nextAction){
    dispatch({type:constants.FETCHING_DATA}); // invoke loadingBar Reducer to SHOW loadingBar
    request
    .get(url)
    .query(queryStringObject)
    .set({Authorization:"Bearer "+getToken()})
    .end((err, res) => {
        dispatch({type:constants.FETCHING_DONE}); // invoke loadingBar Reducer to HIDE loadingBar
        showResult(err,dispatch,currentState,nextAction,res,null,null);						
    });
}

export function delRequest(url,id,dispatch,currentState,nextAction){
    dispatch({type:constants.FETCHING_DATA}); 
    request
    .del(url+id)			
    .set({Authorization:"Bearer "+getToken()})			
    .end((err, res) => {
        dispatch({type:constants.FETCHING_DONE}); 
        showResult(err,dispatch,currentState,nextAction,res,null,"Data has been deleted");		
    });
}

export function delBatchRequest(url,batch,dispatch,currentState,nextAction){
    dispatch({type:constants.FETCHING_DATA}); 
    var objBatch={};
    objBatch.Batch = batch;    
    request
    .post(url)
    .set({Authorization:"Bearer "+getToken()})	
    .send(objBatch)			    		
    .end((err, res) => {
        dispatch({type:constants.FETCHING_DONE}); 
        showResult(err,dispatch,currentState,nextAction,res,null,"Data has been deleted");		
    });
}

export function postRequest(url,obj,dispatch,currentState,nextAction,nextPath){
    dispatch({type:constants.FETCHING_DATA});  
    request
   	.post(url)		
    .set({Authorization:"Bearer "+getToken()})
    .send(obj)		
    .end((err, res) => {
        dispatch({type:constants.FETCHING_DONE}); 
        showResult(err,dispatch,currentState,nextAction,res,nextPath,"Data has been saved");		
    });
}

export function putRequest(url,obj,dispatch,currentState,nextAction,nextPath){
    dispatch({type:constants.FETCHING_DATA}); 
    request
    .put(url)		
    .set({Authorization:"Bearer "+getToken()})
    .send(obj)		
    .end((err, res) => {
        dispatch({type:constants.FETCHING_DONE}); 
        showResult(err,dispatch,currentState,nextAction,res,nextPath,"Data has been edited");
    });
}

function getToken(){
	var cred =localStorage.getItem(constants.CREDENTIAL);
	if(cred!=null){
		var credObj= JSON.parse(cred);
		return credObj.access_token;
	}	
	return null;
}
