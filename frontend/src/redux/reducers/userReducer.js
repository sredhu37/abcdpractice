import { USER_LOGIN, USER_LOGOUT } from '../constants';

const initialState = {
  isLoggedIn: false,
  myUser: {}
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        myUser: action.payload
      }
    case USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        myUser: {}
      }
    default:
      return state;
  }
};

export default userReducer;