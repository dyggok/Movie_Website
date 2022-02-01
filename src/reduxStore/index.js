import { useReducer } from "react";
import { combineReducers, createrStore, createStore } from "redux";
import storage from 'redux-persist/lib/storage';
import userReducer from "./userAction";

const rootReducer = combineReducers({
  user: userReducer
})

export const store = createStore(rootReducer)
store.subscribe(() => console.log("STATE LOG:::", store.getState()))
