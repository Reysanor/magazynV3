//!!!
//tutaj pobieram dane z bazy poprzez SPRINGa (controllers) i przekazuje przez reducery do reacta
//!!!

import axios from "axios";
//axios służy do komunikacji z backendem
import { GET_ERRORS, GET_PRODUCT_TO_AUTOMATS } from "./types";
//history pozwala na przekierowanie przy podsumowaniu formularza
//async oznacza dodanie do kolejki wywolywania funkcji, dispatch przeslanie żądania
//https://redux.js.org/advanced/async-actions

//akcje otrzymują zadanie od springa
//wykorzystuja odpowiednie typy i prowadza do reducerów w index.js
//przekazuje productToAutomat jako obiekt i history co pozwoli na przekierowanie w index.js
// czeka na promise i zwraca result (E6)

export const addProductToAutomat = (
  automat_id,
  product_id,
  product_to_automat,
  history
) => async (dispatch) => {
  try {
    await axios.post(
      `/api/automat/${automat_id}/pta/${product_id}`,
      product_to_automat
    );
    history.push(`/automatBoard/${automat_id}`);
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      //zwraca error do reducera
      payload: err.response.data,
    });
  }
};

export const getProductToAutomats = (automat_id) => async (dispatch) => {
 
  try{
    const res = await axios.get(`/api/automat/${automat_id}/pta/all`);
    dispatch({
      type: GET_PRODUCT_TO_AUTOMATS, //typ reducera
      payload: res.data, //dane z bazy
    });
  }catch(err){
    dispatch({
      type: GET_ERRORS,
      //zwraca error do reducera
      payload: err.response.data,
    });
  }
};
