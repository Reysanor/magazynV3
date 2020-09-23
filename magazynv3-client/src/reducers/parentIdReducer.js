import { GET_PARENT_ID } from "../actions/types";

const initialState = {
 parent: {"id":2} //single
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PARENT_ID:
      return {
        ...state,
        parent: action.payload,
      };

    default:
      return state;
  }
}
