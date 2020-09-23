import {GET_PRODUCT_TO_AUTOMAT, GET_PRODUCT_TO_AUTOMATS, DELETE_PRODUCT_TO_AUTOMAT, } from "../actions/types";

const initialState = {
  product_to_automats: [],
  product_to_automat: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_TO_AUTOMATS:
      return {
        ...state,
        product_to_automats: action.payload,
      };

    case GET_PRODUCT_TO_AUTOMAT:
      return {
        ...state,
        product_to_automat: action.payload,
      };

    case DELETE_PRODUCT_TO_AUTOMAT:
      //jeżeli delete się uda to ma odświeżyć poprzez odfiltrowanie usuniętego obiektu
      //zwraca do wyswietlenia projekty sprzeczne z action.payload (id do skasowania)
      return{
        ...state,
        product_to_automats: state.product_to_automats.filter(
          product_to_automat => product_to_automat.product.id !== action.payload
          )
    }
    default:
      return state;
  }
}
