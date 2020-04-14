//!!!
//tutaj pobieram dane z bazy poprzez SPRINGa (controllers) i przekazuje przez reducery do reacta
//!!!

import axios from "axios";
//axios służy do komunikacji z backendem 
import { GET_ERRORS, GET_PRODUCTTOAUTOMATS } from "./types";
//history pozwala na przekierowanie przy podsumowaniu formularza
//async oznacza dodanie do kolejki wywolywania funkcji, dispatch przeslanie żądania
//https://redux.js.org/advanced/async-actions

//akcje otrzymują zadanie od springa
//wykorzystuja odpowiednie typy i prowadza do reducerów w index.js
//przekazuje productToAutomat jako obiekt i history co pozwoli na przekierowanie w index.js
                                                // czeka na promise i zwraca result (E6)


export const getProductToAutomats = automat_id => async dispatch => {
    const res = await axios.get(`/api/automat/${automat_id}/pta/all`);
    dispatch({
      type: GET_PRODUCTTOAUTOMATS, //typ reducera
      payload: res.data //dane z bazy
    });
  };
  