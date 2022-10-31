# Node-And-Server

INSTALL IN FRONTEND
npm install redux react-redux redux-thunk redux-devtools-extension

//----------------------// Within Source File Create store.js //-----------------------------//
store.js -> where we connect reducers and any middleware 

import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

