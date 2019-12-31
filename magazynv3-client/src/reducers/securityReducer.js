import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  //not log in
  user: {},
  //boolean of authentication
  validToken: false
};

//check if payload exists
const booleanActionPayload = payload => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    //valid user
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload
      };
    //invalid user
    default:
      return state;
  }
}
