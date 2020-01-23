//importuje akcje które po wywołaniu mają przejść przez reducer.
import { GET_TENANT, GET_TENANTS, DELETE_TENANT } from "../actions/types";

const initialState = {
  tenants: [], //array
  tenant: {} //single
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TENANTS:
      //...state - Adds old state properties to the new object by copying
      return {
        ...state,
        tenants: action.payload // dane z listą projektów, które zaktualizują state
      };

    case GET_TENANT:
      return {
        ...state,
        tenant: action.payload
      };

    case DELETE_TENANT:
      return {
        //jeżeli delete się uda to ma odświeżyć poprzez odfiltrowanie usuniętego obiektu
        //zwraca do wyswietlenia projekty sprzeczne z action.payload (id do skasowania)
        ...state,
        tenants: state.tenants.filter(
          tenant => tenant.nip !== action.payload
        )
      };
    default:
      return state;
  }
}
