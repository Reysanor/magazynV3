import {GET_PURCHASED_PRODUCT, GET_PURCHASED_PRODUCTS, DELETE_PURCHASED_PRODUCT, } from "../actions/types";

//co wyświetla w błędzie - puste więc pobierze error
const initialState = {
  purchased_products: [],
  purchased_product: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PURCHASED_PRODUCTS:
      return {
        ...state,
        purchased_products: action.payload,
      };

    case GET_PURCHASED_PRODUCT:
      return {
        ...state,
        purchased_product: action.payload,
      };

    case DELETE_PURCHASED_PRODUCT:
      //jeżeli delete się uda to ma odświeżyć poprzez odfiltrowanie usuniętego obiektu
      //zwraca do wyswietlenia projekty sprzeczne z action.payload (id do skasowania)
      return{
        ...state,
        purchased_products: state.purchased_products.filter(
            purchased_product => purchased_product.id !== action.payload
          )
    }
    default:
      return state;
  }
}
