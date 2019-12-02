//!!!
//tutaj pobieram dane z bazy poprzez SPRINGa i przekazuje przez reducery do reacta
//!!!

import axios from "axios";
//axios służy do komunikacji z backendem 
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";
//history pozwala na przekierowanie przy podsumowaniu formularza
//async oznacza dodanie do kolejki wywolywania funkcji, dispatch przeslanie żądania
//https://redux.js.org/advanced/async-actions

//akcje otrzymuje zadanie od springa
//wykorzystuja odpowiednie typy i prowadza do reducerów w index.js
//przekazuje project jako objekt i history co pozwoli na przekierowanie w index.js
                                                // czeka na promise i zwraca result (E6)
export const createProject = (project, history) => async dispatch => {
  try {
    //po poprawnym utworzeniu projektu wracam do dashboard (do tego używam parametru history)
    await axios.post("/api/project", project);
    history.push("/dashboard");
    //opóźnienie rozgłoszenia (ang. “dispatch) akcji lub rozgłoszenie jej tylko 
    //jeśli zostaną spełnione określone warunki.
    dispatch({
      type: GET_ERRORS,
      //usuwam errory ze state- są niepotrzebne po poprawnym utworzeniu projektu
      payload: {}
    });
  } catch (err) {
    
    dispatch({
      type: GET_ERRORS,
      //zwraca error do reducera
      payload: err.response.data
    });
  }
};
export const getProjects = () => async dispatch => {
  const res = await axios.get("/api/project/all");
  dispatch({
    type: GET_PROJECTS, //typ reducera
    payload: res.data //dane z bazy
  });
};

export const getProject = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/project/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
    //w przypadku braku projektu
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteProject = id => async dispatch => {
  if (
    window.confirm(
      "Are you sure? This will delete the project and all the data related to it"
    )
  ) {
    await axios.delete(`/api/project/${id}`);
    dispatch({
      type: DELETE_PROJECT,
      payload: id //zwracam co do usuniecia
    });
  }
};
