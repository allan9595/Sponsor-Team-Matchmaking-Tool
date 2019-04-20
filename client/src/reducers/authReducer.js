import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER, GET_USERS, GET_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GET_USERS: 
      return {
        ...state,
        users: action.payload
      }
    case GET_USER: 
      return {
        ...state,
        userDetail: action.payload
      };
    default:
      return state;
  }
}
