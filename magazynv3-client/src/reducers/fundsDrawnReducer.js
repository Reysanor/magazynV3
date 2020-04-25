import {GET_FUNDS_DRAWN, GET_FUNDS_DRAWNS, DELETE_FUNDS_DRAWN, } from "../actions/types";

//co wyświetla w błędzie - puste więc pobierze error
const initialState = {
  funds_drawns: [],
  funds_drawn: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FUNDS_DRAWNS:
      return {
        ...state,
        funds_drawns: action.payload,
      };

    case GET_FUNDS_DRAWN:
      return {
        ...state,
        funds_drawn: action.payload,
      };

    case DELETE_FUNDS_DRAWN:
      //jeżeli delete się uda to ma odświeżyć poprzez odfiltrowanie usuniętego obiektu
      //zwraca do wyswietlenia projekty sprzeczne z action.payload (id do skasowania)
      return{
        ...state,
        funds_drawns: state.funds_drawns.filter(
            funds_drawn => funds_drawn.id !== action.payload
          )
    }
    default:
      return state;
  }
}
