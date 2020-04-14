import { GET_PRODUCTTOAUTOMAT, GET_PRODUCTTOAUTOMATS, DELETE_PRODUCTTOAUTOMAT } from "../actions/types";


//co wyświetla w błędzie - puste więc pobierze error
const initialState = {
    product_to_automats: [],
    product_to_automat: {}
};

export default function(state = initialState, action) {
  //przechwycenie kazdej akcji i sprawdzenie errorow
  switch (action.type) {
    case GET_PRODUCTTOAUTOMATS:
      //dostaje zawartość np. od projectActions.js, w tym przypadku błędu (payload) od 
      return {
          ...state,
          product_to_automats:action.payload
      }

      case GET_PRODUCTTOAUTOMAT:
          return{
              ...state,
              product_to_automat:action.payload
          }
   
    default:
      return state;
  }
}

