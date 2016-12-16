import { createStore , applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore,push,routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';
import constants from './constants';
import thunk from 'redux-thunk';


const middleware = routerMiddleware(browserHistory)
const store = createStore(rootReducer,applyMiddleware(thunk,middleware));

export const history = syncHistoryWithStore(browserHistory,store);
export default store;