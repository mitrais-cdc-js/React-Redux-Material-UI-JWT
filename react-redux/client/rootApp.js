
import React from 'react';
import { render } from 'react-dom';

//import components
import App from './module/App';
import Map from './module/Map/components/Map';
import Login from './module/Login/components/Login';
import ListArea from './module/Area/components/ListArea';
import Area from './module/Area/components/Area';
import ListEmployee from './module/Employee/components/ListEmployee';
import Employee from './module/Employee/components/Employee';

//import react router deps
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import store,{history} from './store'

//another import
import injectTapEventPlugin from 'react-tap-event-plugin';
import queryString from 'query-string';
import * as auth from './authentication/auth'


injectTapEventPlugin();
 const requireAuthentication = (nextState, replace) => {
	 if(auth.checkAuth()){
		 var obj={};
		 obj.path=nextState.location.pathname;
		 const stringified = queryString.stringify(obj);
		 replace(`/Login/`+stringified);
	 }	      
}

const router = (
		<Provider store={store}>
			<Router history={history}>
				<Route path="/" component={App}>
					<IndexRoute component = {Map} onEnter={requireAuthentication}></IndexRoute>
					<Route path="/Login" component = {Login}></Route>	
					<Route path="/Login/:path" component = {Login}></Route>					
					<Route path="/listarea" component={ListArea}  onEnter={requireAuthentication}></Route>
					<Route path="/area" component={Area}  onEnter={requireAuthentication}></Route>
					<Route path="/area/:id" component={Area}  onEnter={requireAuthentication}></Route>
					<Route path="/listemployee" component={ListEmployee}  onEnter={requireAuthentication}></Route>
					<Route path="/employee" component={Employee}  onEnter={requireAuthentication}></Route>
					<Route path="/employee/:id" component={Employee}  onEnter={requireAuthentication}></Route>																	
				</Route>
			</Router>	
		</Provider>		
	)

render (router,document.getElementById('root'));