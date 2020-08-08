import { LOADING_BEGIN, LOADING_END } from '../constants';

const initialState = {
  show: false
};

const loadingReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOADING_BEGIN:
      return {
        ...state,
        show: true,
      };
    case LOADING_END:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;