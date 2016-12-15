import constants from '../constants';

// this function is used to check whether there is already credential from login or not
// this is used in client/rootApp.js when the route changes

export function checkAuth(){		
	var cred =localStorage.getItem(constants.CREDENTIAL);
	if(cred==null){
		return true;
	}
	else{
		return false;
	}
}
