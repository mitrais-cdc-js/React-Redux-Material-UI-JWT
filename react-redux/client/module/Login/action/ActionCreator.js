// Every Action Creator must be registered in client/module/App.js so these functions in this file will
// be recognize by all components

import { push } from 'react-router-redux'
import request from 'superagent';
import constants from '../../../constants';
import dateFormat from 'dateformat'


export function LoginAction(login, redirect="/"){		
	return (dispatch, state) => {
		// trigger loadingBar to SHOW 
		dispatch({
			type:constants.FETCHING_DATA,
			data:null
		});
		//Call The API using superagent library
		request
		.post(constants.JWT_REQUEST)
		.send({ UserName: login.username,Password:login.password})
		.end((err, res) => {
			//trigger loadingBar to HIDE
			dispatch({
				type:constants.FETCHING_DONE,
				data:null
			});			
			if (err) {
				dispatch({
					type: constants.LOGIN_FAILED,
					message: "Check your Credential or your connection"

				})
			}
			else{
				const data = JSON.parse(res.text);
				localStorage.setItem(constants.CREDENTIAL, JSON.stringify(data));
				dispatch(push(redirect));
			}																
		});
    }	
}

export function Logout(){
	return (dispatch, state) => {		
		localStorage.removeItem(constants.CREDENTIAL);        
		dispatch(LogoutAction());
		dispatch(push('/Login'));
    }	
}


export function LogoutAction(){
	return{
		type: constants.LOGOUT_ACTION
	}
}


