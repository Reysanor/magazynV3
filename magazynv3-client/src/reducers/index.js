import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import tenantReducer from "./tenantReducer";
import automatReducer from "./automatReducer";
import productReducer from "./productReducer";
import productToAutomatReducer from "./productToAutomatReducer";
import fundsDrawnReducer from "./fundsDrawnReducer";
import insertedProductReducer from "./insertedProductReducer";
import purchasedProductReducer from "./purchasedProductReducer";
import parentIdReducer from "./parentIdReducer";
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
  security: securityReducer,
  tenant: tenantReducer,
  product: productReducer,
  automat: automatReducer,
  product_to_automat: productToAutomatReducer,
  funds_drawn: fundsDrawnReducer,
  inserted_product: insertedProductReducer,
  purchased_product: purchasedProductReducer,
  parent_id: parentIdReducer
});
