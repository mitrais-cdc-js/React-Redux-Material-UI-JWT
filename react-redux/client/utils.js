import { push } from 'react-router-redux'
import constants from './constants';
import request from 'superagent';
import queryString from 'query-string';

// These bunch of functions are for the common used in components such as calling the API etc.

export function showResult(err,dispatch,currentState){
    if(err){
        if(err.status == 401){
            var obj={};
            obj.path=currentState().routing.locationBeforeTransitions.pathname;
            const stringified = queryString.stringify(obj);            
		    dispatch(push('/Login/'+stringified));		
	    }
    }        
}

export function getRequest(url,queryStringObject,dispatch,currentState,callback){
    dispatch({type:constants.FETCHING_DATA}); // invoke loadingBar Reducer to SHOW loadingBar
    request
    .get(url)
    .query(queryStringObject)
    .set({Authorization:"Bearer "+getToken()})
    .end((err, res) => {
        dispatch({type:constants.FETCHING_DONE}); // invoke loadingBar Reducer to HIDE loadingBar
        showResult(err,dispatch,currentState);	
        if(callback!=null&& callback !=undefined){
            if(!err){
                callback(err,res);
            }            
        }
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

export function delBatchRequest(url,batch,dispatch,currentState,callback){
    dispatch({type:constants.FETCHING_DATA}); 
    var objBatch={};
    objBatch.Batch = batch;    
    request
    .post(url)
    .set({Authorization:"Bearer "+getToken()})	
    .send(objBatch)			    		
    .end((err, res) => {
        dispatch({type:constants.FETCHING_DONE}); 
        showResult(err,dispatch,currentState);	
        if(callback!=null&& callback !=undefined){
            if(!err){
                callback(err,res);
            }            
        }
    });
}

export function postRequest(url,obj,dispatch,currentState,callback){
    dispatch({type:constants.FETCHING_DATA});  
    request
   	.post(url)		
    .set({Authorization:"Bearer "+getToken()})
    .send(obj)		
    .end((err, res) => {
        dispatch({type:constants.FETCHING_DONE});         
        showResult(err,dispatch,currentState);		
        if(callback!=null&& callback !=undefined){
            if(!err){
                callback(err,res);
            }
            
        }
        
    });
}

export function putRequest(url,obj,dispatch,currentState,callback){
    dispatch({type:constants.FETCHING_DATA}); 
    request
    .put(url)		
    .set({Authorization:"Bearer "+getToken()})
    .send(obj)		
    .end((err, res) => {
        dispatch({type:constants.FETCHING_DONE}); 
        showResult(err,dispatch,currentState);
        if(callback!=null&& callback !=undefined){
            callback(err,res);
        }
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


export function dispatchWithDataJsonFormat(type,dispatch,res){
    dispatch({
		type,
		data:JSON.parse(res.text)
	})
	
}

export function dispatchNonJsonFormat(type,dispatch,res){	
    dispatch({
		type,
		data:res.text
	})
}


export function showSnackBar(dispatch,message){	
    dispatch({
		type: constants.SHOW_SNACKBAR_ACTION,
		data:{ message }
	})
}