//store


//belows are useful library
//npm install redux-thunk
//npm install redux-logger --dev
//npm install react-router-dom react-redux history
//npm install redux-devtools-extension --dev

//redux-thunk : middleware exists between react application and store. when user wants, it enables to send action in redux store

//redux-logger : props, action, state information in console

//react-router-dom react-redux history : url router

//redux-devtools-extension --dev: development tool

import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";
import games from "redux/modules/games";
import createHistory from "history/createBrowserHistory";
import  { composeWithDevTools } from "redux-devtools-extension";

const env = process.env.NODE_ENV;

const history = createHistory()

const middlewares = [thunk, routerMiddleware(history)];

if(env === 'development') {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer = combineReducers({
  games,
  routing: routerReducer,
});

let store;

if (env === "development") {
  store = initialState =>
    createStore(reducer,
    composeWithDevTools(applyMiddleware(...middlewares)));
} else {
  store = initialState => createStore(reducer, applyMiddleware(...middlewares));
}

export { history };

export default store();