import { GET_ERRORS } from "../actions/types";

//co wyświetla w błędzie - puste więc pobierze error
const initialState = {};

export default function(state = initialState, action) {
  //przechwycenie kazdej akcji i sprawdzenie errorow

  switch (action.type) {
    case GET_ERRORS:
      //dostaje zawartość np. od projectActions.js, w tym przypadku błędu (payload) od 
      return action.payload;

    default:
      return state;
      
  }
}
