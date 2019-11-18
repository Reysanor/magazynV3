import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";

import rootReducer from "./reducers";
//sluzy do komunikacji reduxa

//default values
const initalState = {};
//thunk - sluzy do wywolan asynchronicznych
//middleware- funkcja wywolywana miedzy rozgloszeniem i wykonaniem akcji
//w reducerze np logi
const middleware = [thunk];

//definiowanie store
let store;
//przegladarka - potrzebne do działania w nich

if (window.navigator.userAgent.includes("Chrome")) {
  //w przypadku chrome przekazuje wybrane parametry: zbiór reducerów, wartości domyślne, połączone funkcje 
  store = createStore(
    rootReducer,
    initalState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
} else {
  store = createStore(
    rootReducer,
    initalState,
    compose(applyMiddleware(...middleware))
  );
}

export default store;
