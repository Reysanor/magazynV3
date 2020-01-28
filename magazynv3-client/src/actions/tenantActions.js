//!!!
//tutaj pobieram dane z bazy poprzez SPRINGa (controllers) i przekazuje przez reducery do reacta
//!!!

import axios from "axios";
//axios służy do komunikacji z backendem 
import { GET_ERRORS, GET_TENANT, GET_TENANTS, DELETE_TENANT } from "./types";
//history pozwala na przekierowanie przy podsumowaniu formularza
//async oznacza dodanie do kolejki wywolywania funkcji, dispatch przeslanie żądania
//https://redux.js.org/advanced/async-actions

//akcje otrzymują zadanie od springa
//wykorzystuja odpowiednie typy i prowadza do reducerów w index.js
//przekazuje project jako obiekt i history co pozwoli na przekierowanie w index.js
                                                // czeka na promise i zwraca result (E6)
export const createTenant = (tenant, history) => async dispatch => {
  try {
    //po poprawnym utworzeniu projektu wracam do dashboard (do tego używam parametru history)
    await axios.post("/api/tenant", tenant);
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

export const getTenants = () => async dispatch => {
  const res = await axios.get("/api/tenant/all");
  dispatch({
    type: GET_TENANTS, //typ reducera
    payload: res.data //dane z bazy
  });
};

export const getTenant = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/tenant/${id}`);
    dispatch({
      type: GET_TENANT,
      payload: res.data
    });
    //w przypadku braku projektu
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteTenant = id => async dispatch => {
  if (
    window.confirm(
      "Are you sure? This will delete the tenant and all the data related to it"
    )
  ) {
    await axios.delete(`/api/tenant/${id}`);
    dispatch({
      type: DELETE_TENANT,
      payload: id //zwracam co do usuniecia
    });
  }
};
