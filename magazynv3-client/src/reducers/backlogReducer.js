import { GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK } from "../actions/types";

//co wyświetla w błędzie - puste więc pobierze error
const initialState = {
    project_tasks: [],
    project_task: {}
};

export default function(state = initialState, action) {
  //przechwycenie kazdej akcji i sprawdzenie errorow
  switch (action.type) {
    case GET_BACKLOG:
      //dostaje zawartość np. od projectActions.js, w tym przypadku błędu (payload) od 
      return {
          ...state,
          project_tasks:action.payload
      }

      case GET_PROJECT_TASK:
          return{
              ...state,
              project_task:action.payload
          }
    case DELETE_PROJECT_TASK:
        return{
            ...state,
            project_tasks: state.project_tasks.filter(
                project_task => project_task.projectSequence !== action.payload
              )
        }

    default:
      return state;
  }
}
