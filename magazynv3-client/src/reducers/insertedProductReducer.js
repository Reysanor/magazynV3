import {GET_INSERTED_PRODUCT, GET_INSERTED_PRODUCTS, DELETE_INSERTED_PRODUCT, } from "../actions/types";

//co wyświetla w błędzie - puste więc pobierze error
const initialState = {
  inserted_products: [],
  inserted_product: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INSERTED_PRODUCTS:
      return {
        ...state,
        inserted_products: action.payload,
      };

    case GET_INSERTED_PRODUCT:
      return {
        ...state,
        inserted_product: action.payload,
      };

    case DELETE_INSERTED_PRODUCT:
      //jeżeli delete się uda to ma odświeżyć poprzez odfiltrowanie usuniętego obiektu
      //zwraca do wyswietlenia projekty sprzeczne z action.payload (id do skasowania)
      return{
        ...state,
        inserted_products: state.inserted_products.filter(
            inserted_product => inserted_product.id !== action.payload
          )
    }
    default:
      return state;
  }
}
