import {
  GET_PRODUCT_TO_AUTOMAT,
  GET_PRODUCT_TO_AUTOMATS,
  DELETE_PRODUCT_TO_AUTOMAT,
} from "../actions/types";

//co wyświetla w błędzie - puste więc pobierze error
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
      return {
        ...state,
        //TO DO
      };
    default:
      return state;
  }
}
