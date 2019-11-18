import { GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "../actions/types";

const initialState = {
  projects: [], //array
  project: {} //single 
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      //...state - Adds old state properties to the new object by copying
      return {
        ...state,
        projects: action.payload // dane z listą projektów, które zaktualizują state
      };

    case GET_PROJECT:
      return {
        ...state,
        project: action.payload
      };

    case DELETE_PROJECT:
      return {
        //zwraca do wyswietlenia projekty sprzeczne z action.payload (id do skasowania)
        ...state,
        projects: state.projects.filter(
          project => project.projectIdentifier !== action.payload
        )
      };
    default:
      return state;
  }
}
