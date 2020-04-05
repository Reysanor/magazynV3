//importuje akcje które po wywołaniu mają przejść przez reducer.
import { GET_AUTOMAT, GET_AUTOMATS, DELETE_AUTOMAT } from "../actions/types";

const initialState = {
  automats: [], //array
  automat: {} //single
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AUTOMATS:
      //...state - Adds old state properties to the new object by copying
      return {
        ...state,
        automats: action.payload // dane z listą projektów, które zaktualizują state
      };

    case GET_AUTOMAT:
      return {
        ...state,
        automat: action.payload
      };

    case DELETE_AUTOMAT:
      return {
        //jeżeli delete się uda to ma odświeżyć poprzez odfiltrowanie usuniętego obiektu
        //zwraca do wyswietlenia projekty sprzeczne z action.payload (id do skasowania)
        ...state,
        automats: state.automats.filter(
          automat => automat.serialNumber !== action.payload
        )
      };
    default:
      return state;
  }
}
