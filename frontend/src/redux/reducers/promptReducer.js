import { PROMPT_SHOW, PROMPT_HIDE, PROMPT_SHOW_ERROR, PROMPT_HIDE_ERROR } from '../constants';

const initialState = {
  show: false,
  showError: false,
  errMessage: '',
};

const promptReducer = (state = initialState, action) => {
  switch(action.type) {
    case PROMPT_SHOW:
      return {
        ...state,
        show: true
      };
    case PROMPT_HIDE:
      return initialState;
    case PROMPT_SHOW_ERROR:
      return {
        ...state,
        showError: true,
        errMessage: action.payload
      };
    case PROMPT_HIDE_ERROR:
      return {
        ...state,
        showError: false,
        errMessage: ''
      };
    default:
      return state;
  }
};

export default promptReducer;