import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// EXAMPLE CODE... you can combine multiple reducers to help reduce the changes of State in your app.
import user from './user';
const rootReducer = combineReducers({user, routing: routerReducer});

export default rootReducer;