//!!!
//tutaj pobieram dane z bazy poprzez SPRINGa (controllers) i przekazuje przez reducery do reacta
//!!!

import axios from "axios";
//axios służy do komunikacji z backendem 
import { GET_ERRORS, GET_INSERTED_PRODUCT, GET_INSERTED_PRODUCTS, DELETE_INSERTED_PRODUCT } from "./types";
//history pozwala na przekierowanie przy podsumowaniu formularza
//async oznacza dodanie do kolejki wywolywania funkcji, dispatch przeslanie żądania
//https://redux.js.org/advanced/async-actions

//akcje otrzymują zadanie od springa
//wykorzystuja odpowiednie typy i prowadza do reducerów w index.js
//przekazuje project jako obiekt i history co pozwoli na przekierowanie w index.js
                                                // czeka na promise i zwraca result (E6)
export const createInsertedProduct = (automat_id,product_id,inserted_product, history) => async dispatch => {
  try {
    //po poprawnym utworzeniu projektu wracam do dashboard (do tego używam parametru history)
    await axios.post(`/api/inserted/${automat_id}/${product_id}`, inserted_product);
    history.push(`/automatBoard/${automat_id}`);    //opóźnienie rozgłoszenia (ang. “dispatch) akcji lub rozgłoszenie jej tylko 
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

export const getInsertedProducts = () => async dispatch => {
  const res = await axios.get("/api/inserted/all");
  dispatch({
    type: GET_INSERTED_PRODUCTS, //typ reducera
    payload: res.data //dane z bazy
  });
};

export const getInsertedProductsByAutomat = (automat_serialNumber) => async dispatch => {
  const res = await axios.get(`/api/inserted/all/${automat_serialNumber}`);
  dispatch({
    type: GET_INSERTED_PRODUCTS, //typ reducera
    payload: res.data //dane z bazy
  });
};


export const getInsertedOneProductByAutomat = (automat_serialNumber,product_id) => async dispatch => {
  const res = await axios.get(`/api/inserted/all/${automat_serialNumber}/${product_id}`);
  dispatch({
    type: GET_INSERTED_PRODUCTS, //typ reducera
    payload: res.data //dane z bazy
  });
};

export const deleteInsertedProduct = id => async dispatch => {
  if (
    window.confirm(
      "Are you sure? This will delete the inserted product and all the data related to it"
    )
  ) {
    await axios.delete(`/api/inserted/${id}`);
    dispatch({
      type: DELETE_INSERTED_PRODUCT,
      payload: id //zwracam co do usuniecia
    });
  }
};


export const getInsertedProductAvaragePrice = (automat_serialNumber,product_id) => async dispatch => {
  
    const res = await axios.get(`/api/inserted/profit/${automat_serialNumber}/${product_id}`);
    dispatch({
      type: GET_INSERTED_PRODUCT,
      payload: res.data
    });
};

export const getInsertedProductsAvaragePrice = (automat_serialNumber) => async dispatch => {
  
  const res = await axios.get(`/api/inserted/profit/${automat_serialNumber}`);
  dispatch({
    type: GET_INSERTED_PRODUCTS,
    payload: res.data
  });
};

export const getInsertedProductsInfo = () => async dispatch => {
  
  const res = await axios.get("/api/inserted/profit/all");
  dispatch({
    type: GET_INSERTED_PRODUCTS,
    payload: res.data
  });
};

export const getInsertedProductsToAutomatTotalProfit = (automat_serialNumber) => async dispatch => {
  
  const res = await axios.get(`/api/inserted/profit/all/${automat_serialNumber}`);
  dispatch({
    type: GET_INSERTED_PRODUCT,
    payload: res.data
  });
};
