import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";
import backlogReducer from "./backlogReducer";
import securityReducer from "./securityReducer";
//store - A store holds the whole state tree of your application.
//The only way to change the state inside it is to dispatch an action on it.

//payload = property that holds the actual data in a Redux action object.
//https://stackoverflow.com/questions/51357412/what-is-a-payload-in-redux-context

//reducer:
//Generalnie działa to tak: ktoś wywołuje akcję (np getProjects w Dashboard.js), 
//obiekt store z tą akcją (projectActions.js) wywołuje funkcję reducer (projectReducer.js), 
//przekazując do niej aktualny stan oraz akcję, funkcja reducer sprawdza typ przekazanej 
//do niej akcji i w zależności jak jest ten typ, zwraca nową wersję obiektu stanu (do Dashboard.js).

//combineReducers - wire everything without breaking the redux, contain all reducers
//redux - sluzy do sterowania stanem aplikacji - przechowuje go w jednym store
//przekazuje akcje do odpowiedniego reducera
export default combineReducers({
  errors: errorReducer,
  project: projectReducer,
  backlog: backlogReducer,
  security: securityReducer
});
