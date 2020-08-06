import { MESSAGE_BOX_SHOW, MESSAGE_BOX_HIDE } from '../constants';

const initialState = {
  show: false,
  text: '',
  variant: 'danger'
};

const messageBoxReducer = (state = initialState, action) => {
  switch(action.type) {
    case MESSAGE_BOX_SHOW:
      return {
        ...state,
        show: true,
        text: action.payload.text,
        variant: action.payload.variant
      };
    case MESSAGE_BOX_HIDE:
      return initialState;
    default:
      return state;
  }
};

export default messageBoxReducer;