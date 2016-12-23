import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import login from '../module/Login/reducers/login';
import listarea from '../module/Area/reducers/listarea';
import area from '../module/Area/reducers/area';

import listEmployee from '../module/Employee/reducers/listEmployee';
import employee from '../module/Employee/reducers/employee';

import loadingBar from '../common/reducers/loadingBar';
import snackBar from '../common/reducers/snackBar';
import table from '../common/reducers/table';

//Gather all reducer in here

const rootReducer = combineReducers({
	login,
	listarea,
	area,
	listEmployee,
	employee,
	loadingBar,
	snackBar,
	table,
	routing:routerReducer
});

export default rootReducer;