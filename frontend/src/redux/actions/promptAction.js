import { PROMPT_SHOW, PROMPT_HIDE, PROMPT_SHOW_ERROR, PROMPT_HIDE_ERROR } from '../constants';

export const showPrompt = () => {
  return {
    type: PROMPT_SHOW
  };
};

export const hidePrompt = () => {
  return {
    type: PROMPT_HIDE
  };
};

export const showPromptError = (errText) => {
  return {
    type: PROMPT_SHOW_ERROR,
    payload: errText
  };
};

export const hidePromptError = () => {
  return {
    type: PROMPT_HIDE_ERROR
  }
};