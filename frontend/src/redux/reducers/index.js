import { combineReducers } from 'redux';
import userReducer from './userReducer';
import messageBoxReducer from './messageBoxReducer';
import loadingReducer from './loadingReducer';
import uploadQuestionsReducer from './uploadQuestionsReducer';
import promptReducer from './promptReducer';
import questionReducer from './questionReducer';

const rootReducer = combineReducers({
  user: userReducer,
  messageBox: messageBoxReducer,
  loading: loadingReducer,
  uploadQuestions: uploadQuestionsReducer,
  prompt: promptReducer,
  question: questionReducer,
});

export default rootReducer;