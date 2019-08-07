import { GET_ERRORS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  //przechwycenie kazdej akcji i sprawdzenie errorow

  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    default:
      return state;
  }
}
