import axios from 'axios';
import { USER_LOGIN, USER_LOGOUT } from '../constants';
import { startLoading, stopLoading } from './loadingAction';

export const userLoggedIn = (payload = {}) => {
  return {
    type: USER_LOGIN,
    payload
  };
};

export const userLoggedOut = () => {
  return {
    type: USER_LOGOUT
  }
};

export const requestGetLoggedInUser = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const profile = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/profile`);

      if (profile) {
        dispatch(userLoggedIn(profile.data));
        dispatch(stopLoading());
      } else {
        throw new Error("Couldn't receive profile from the server. Inform Administrator immediately!")
      }
    } catch(err) {
      dispatch(userLoggedOut());
      dispatch(stopLoading());
    }
  };
};