import axios from "axios";
import { SET_CURRENT_USER, GET_ERRORS } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";


export const createNewUser = (newUser, history) => async dispatch => {
  try {
    await axios.post("/api/users/register", newUser);
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
//Login request – obiekt z username I password (dane a nie opakowanie) dla JSON-a, 
export const login = LoginRequest => async dispatch => {
  try {
  //post => get the LoginRequest 
    const res = await axios.post("/api/users/login", LoginRequest);
  //extract token from res.data (successful or not)
    const {token} = res.data;
  //store token in localStorage
    localStorage.setItem("jwtToken",token);
  //set our token in header - it will permit to all actions whose need the authorization key 
  //(.anyRequest().authenticated(); w SecurityConfig)
  //function for authorization token
    setJWTToken(token);
  //decode the token from tokenProvider
  //npm install jwt-decode
    const decoded = jwt_decode(token);
  //dispatch to securityReducer
   dispatch ({
     type: SET_CURRENT_USER,
     payload: decoded
   })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }  
 
}
