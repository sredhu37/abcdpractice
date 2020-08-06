import { LOADING_BEGIN, LOADING_END } from '../constants';

export const startLoading = () => {
  return {
    type: LOADING_BEGIN
  };
};

export const stopLoading = () => {
  return {
    type: LOADING_END
  };
};