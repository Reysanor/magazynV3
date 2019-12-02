import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";
import backlogReducer from "./backlogReducer";
//reducer - funkcja implementująca store
//combineReducers - wire everything without breaking the redux, contain all reducers
//redux - sluzy do sterowania stanem aplikacji - przechowuje go w jednym store
//przekazuje akcje do odpowiedniego reducera
export default combineReducers({
  errors: errorReducer,
  project: projectReducer,
  backlog: backlogReducer
});
