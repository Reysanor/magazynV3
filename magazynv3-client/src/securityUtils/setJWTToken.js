import axios from "axios";

const setJWTToken = token => {
  if (token) {
              //wstawiam header do żądzania np. post

    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setJWTToken;
