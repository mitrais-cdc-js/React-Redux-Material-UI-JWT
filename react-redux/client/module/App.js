import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as commonActionCreator from '../actions/commonActionCreator';

import * as appActionCreator from './Login/action/ActionCreator';
import * as areaActionCreator from './Area/action/ActionCreator';
import * as mapActionCreator from './Map/action/ActionCreator';
import * as employeeActionCreator from './Employee/action/ActionCreator';


import Main from './Main';
import React from 'react';
import store from '../store';

// this method will return all reducers/states that have been gathered in reducer/index.js 
// all state will be converted to props
function mapStateToProps(state, ownProps){
	return store.getState();				
}

// Gather All Action Creator here
function mapDispatchToProps(dispatch){		
	return bindActionCreators(
		{
			...appActionCreator,
			...areaActionCreator,
			...mapActionCreator,
			...commonActionCreator,
			...employeeActionCreator		
		},dispatch);
}

// this App component will wrap to Main.js ( smart component )
const App = connect(mapStateToProps,mapDispatchToProps)(Main);


export default App;