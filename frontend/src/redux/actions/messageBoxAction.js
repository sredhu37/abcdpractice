import { MESSAGE_BOX_SHOW, MESSAGE_BOX_HIDE } from '../constants';

export const showMessageBox = (text, variant) => {
  return {
    type: MESSAGE_BOX_SHOW,
    payload: {
      text,
      variant
    }
  };
};

export const hideMessageBox = () => {
  return {
    type: MESSAGE_BOX_HIDE
  };
};
