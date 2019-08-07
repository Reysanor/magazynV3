import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
//sluzy do kommunikacji reduxa

const initalState = {};
//thunk - sluzy do wywolan asynchrpnicznych
//middleware- funkcja wywolywana miedzy rozgloszeniem i wykonaniem akcji
//w reducerze np logi
const middleware = [thunk];

let store;
//przegladarka

if (window.navigator.userAgent.includes("Chrome")) {
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
