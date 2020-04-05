//importuje akcje które po wywołaniu mają przejść przez reducer.
import { GET_PRODUCT, GET_PRODUCTS, DELETE_PRODUCT } from "../actions/types";

const initialState = {
  products: [], //array
  product: {} //single
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      //...state - Adds old state properties to the new object by copying
      return {
        ...state,
        products: action.payload // dane z listą projektów, które zaktualizują state
      };

    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload
      };

    case DELETE_PRODUCT:
      return {
        //jeżeli delete się uda to ma odświeżyć poprzez odfiltrowanie usuniętego obiektu
        //zwraca do wyswietlenia projekty sprzeczne z action.payload (id do skasowania)
        ...state,
        products: state.products.filter(
          product => product.id !== action.payload
        )
      };
    default:
      return state;
  }
}
