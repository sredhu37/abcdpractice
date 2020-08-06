import axios from 'axios';
import { 
  UPLOAD_QUESTION_CHANGE_PROBLEM_STATEMENT,
  UPLOAD_QUESTION_ADD_NEW_QUESTION,
  UPLOAD_QUESTION_DELETE_LAST_QUESTION,
  UPLOAD_QUESTION_CHANGE_OPTION_STATEMENT,
  UPLOAD_QUESTION_CHANGE_ANSWER_VALUE,
  UPLOAD_QUESTION_CHANGE_CLASS_VALUE,
  UPLOAD_QUESTION_CHANGE_SUBJECT_VALUE,
  UPLOAD_QUESTION_CHANGE_CHAPTER_VALUE,
  UPLOAD_QUESTION_RESET_ALL,
} from '../constants';
import { startLoading, stopLoading } from './loadingAction';
import { showMessageBox } from './messageBoxAction';
import { hidePrompt } from './promptAction';
import { setActiveTab } from './questionAction';

export const addNewQuestion = () => {
  return {
    type: UPLOAD_QUESTION_ADD_NEW_QUESTION
  };
};

export const deleteLastQuestion = () => {
  return {
    type: UPLOAD_QUESTION_DELETE_LAST_QUESTION
  };
}

export const changeProblemStatement = (questionNumber, problemStatement) => {
  return {
    type: UPLOAD_QUESTION_CHANGE_PROBLEM_STATEMENT,
    payload: {
      questionNumber,
      problemStatement
    }
  };
};

export const changeOptionStatement = (questionNumber, optionStatement, optionValue) => {
  return {
    type: UPLOAD_QUESTION_CHANGE_OPTION_STATEMENT,
    payload: {
      questionNumber,
      optionStatement,
      optionValue,
    }
  };
};

export const changeAnswersValue = (questionNumber, answerValue, optionValue) => {
  return {
    type: UPLOAD_QUESTION_CHANGE_ANSWER_VALUE,
    payload: {
      questionNumber,
      answerValue,
      optionValue,
    }
  }
};

export const changeClassValue = (classValue) => {
  return {
    type: UPLOAD_QUESTION_CHANGE_CLASS_VALUE,
    payload: classValue
  };
};

export const changeSubjectValue = (subject) => {
  return {
    type: UPLOAD_QUESTION_CHANGE_SUBJECT_VALUE,
    payload: subject
  };
};

export const changeChapterValue = (chapter) => {
  return {
    type: UPLOAD_QUESTION_CHANGE_CHAPTER_VALUE,
    payload: chapter
  };
};

export const resetAll = () => {
  return {
    type: UPLOAD_QUESTION_RESET_ALL
  }
};

export const requestUploadQuestions = () => {
  return async (dispatch, getState) => {
    let msgBoxTxt = "";
    let msgBoxVariant = "";

    try {
      dispatch(startLoading());
      // Update uploader via an action on logging in
      const uploadQuestionsState = {
        ...(getState().uploadQuestions),
        uploader: getState().user.myUser.email
      };

      const result = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/questions/upload`, uploadQuestionsState);

      msgBoxTxt = result.data.toString();
      msgBoxVariant = 'success';

      dispatch(resetAll());
      dispatch(setActiveTab('question1'))
    } catch(error) {
      msgBoxTxt = error.toString();
      msgBoxVariant = 'danger';
    } finally {
      dispatch(stopLoading());
      dispatch(hidePrompt());
      dispatch(changeClassValue(''));
      dispatch(changeSubjectValue(''));
      dispatch(changeChapterValue(''));
      dispatch(showMessageBox(msgBoxTxt, msgBoxVariant));
    }
  };
};