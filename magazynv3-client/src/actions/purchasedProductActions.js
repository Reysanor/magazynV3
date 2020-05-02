//!!!
//tutaj pobieram dane z bazy poprzez SPRINGa (controllers) i przekazuje przez reducery do reacta
//!!!

import axios from "axios";
//axios służy do komunikacji z backendem 
import { GET_ERRORS, GET_PURCHASED_PRODUCT, GET_PURCHASED_PRODUCTS, DELETE_PURCHASED_PRODUCT } from "./types";
//history pozwala na przekierowanie przy podsumowaniu formularza
//async oznacza dodanie do kolejki wywolywania funkcji, dispatch przeslanie żądania
//https://redux.js.org/advanced/async-actions

//akcje otrzymują zadanie od springa
//wykorzystuja odpowiednie typy i prowadza do reducerów w index.js
//przekazuje project jako obiekt i history co pozwoli na przekierowanie w index.js
                                                // czeka na promise i zwraca result (E6)
export const createPurchasedProduct = (product_id,purchased_product, history) => async dispatch => {
  try {
    //po poprawnym utworzeniu projektu wracam do dashboard (do tego używam parametru history)
    await axios.post(`/api/purchased/${product_id}`, purchased_product);
    history.push("/products");
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


export const removePurchasedProduct = (product_id,purchased_product, history) => async dispatch => {
  try {
    //po poprawnym utworzeniu projektu wracam do dashboard (do tego używam parametru history)
    await axios.post(`/api/purchased/remove/${product_id}`, purchased_product);
    history.push("/products");
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

export const getPurchasedProducts= () => async dispatch => {
  const res = await axios.get("/api/purchased/all");
  dispatch({
    type: GET_PURCHASED_PRODUCTS, //typ reducera
    payload: res.data //dane z bazy
  });
};

export const getPurchasedProduct = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/purchased/${id}`);
    dispatch({
      type: GET_PURCHASED_PRODUCT,
      payload: res.data
    });
    //w przypadku braku projektu
  } catch (error) {
    history.push("/products");
  }
};


export const getPurchasedProductsPer = () => async dispatch => {
  try {
    const res = await axios.get("/api/purchased/all/per");
    dispatch({
      type: GET_PURCHASED_PRODUCTS,
      payload: res.data
    });
    //w przypadku braku projektu
  } catch (error) {
   
  }
};


export const getPurchasesPer = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/purchased/per/${id}`);
    dispatch({
      type: GET_PURCHASED_PRODUCT,
      payload: res.data
    });
    //w przypadku braku projektu
  } catch (error) {
   
  }
};


export const deletePurchasedProduct = id => async dispatch => {
  if (
    window.confirm(
      "Are you sure? This will delete the purchased product and all the data related to it"
    )
  ) {
    await axios.delete(`/api/purchased/${id}`);
    dispatch({
      type: DELETE_PURCHASED_PRODUCT,
      payload: id //zwracam co do usuniecia
    });
  }
};
