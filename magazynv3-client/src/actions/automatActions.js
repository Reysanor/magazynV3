//!!!
//tutaj pobieram dane z bazy poprzez SPRINGa (controllers) i przekazuje przez reducery do reacta
//!!!

import axios from "axios";
//axios służy do komunikacji z backendem 
import { GET_ERRORS, GET_AUTOMAT, GET_AUTOMATS, DELETE_AUTOMAT } from "./types";
//history pozwala na przekierowanie przy podsumowaniu formularza
//async oznacza dodanie do kolejki wywolywania funkcji, dispatch przeslanie żądania
//https://redux.js.org/advanced/async-actions

//akcje otrzymują zadanie od springa
//wykorzystuja odpowiednie typy i prowadza do reducerów w index.js
//przekazuje project jako obiekt i history co pozwoli na przekierowanie w index.js
                                                // czeka na promise i zwraca result (E6)
export const createAutomat = (automat, history) => async dispatch => {
  try {
    //po poprawnym utworzeniu projektu wracam do dashboard (do tego używam parametru history)
    await axios.post("/api/automat", automat);
    history.push("/dashboard");
    //opóźnienie rozgłoszenia (ang. “dispatch) akcji lub rozgłoszenie jej tylko 
    //jeśli zostaną spełnione określone warunki.
    dispatch({
      type: GET_ERRORS,
      //usuwam errory ze state - są niepotrzebne po poprawnym utworzeniu projektu
      payload: {}
    });
  } catch (err) {
    
    dispatch({
      type: GET_ERRORS,
      //zwraca error do reducera
      payload: err.response.data
    });
  }
};

export const getAutomats = () => async dispatch => {
  const res = await axios.get("/api/automat/all");
  dispatch({
    type: GET_AUTOMATS, //typ reducera
    payload: res.data //dane z bazy
  });
};

export const getTenantsToAutomat = (nip) => async dispatch => {
  const res = await axios.get(`/api/automat/all/${nip}`);
  dispatch({
    type: GET_AUTOMATS, //typ reducera
    payload: res.data //dane z bazy
  });
};

export const getTenantsToAutomatFree = () => async dispatch => {
  const res = await axios.get("/api/automat/all/free");
  dispatch({
    type: GET_AUTOMATS, //typ reducera
    payload: res.data //dane z bazy
  });
};


export const getAutomat = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/automat/${id}`);
    dispatch({
      type: GET_AUTOMAT,
      payload: res.data
    });
    //w przypadku braku projektu
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteAutomat = id => async dispatch => {
  if (
    window.confirm(
      "Are you sure? This will delete the automat and all the data related to it"
    )
  ) {
    await axios.delete(`/api/automat/${id}`);
    dispatch({
      type: DELETE_AUTOMAT,
      payload: id //zwracam co do usuniecia
    });
  }
};
