import axios from 'axios';
import {
  QUESTION_ACTIVE_TAB,
  QUESTION_CHANGE_CLASS_VALUE,
  QUESTION_CHANGE_SUBJECT_VALUE,
  QUESTION_CHANGE_CHAPTER_VALUE,
  QUESTION_IS_READY,
  QUESTION_INITIALIZE_QUESTIONS,
  QUESTION_CHANGE_USERSANSWER,
} from '../constants';
import { startLoading, stopLoading } from './loadingAction';
import { showMessageBox } from './messageBoxAction';


export const setActiveTab = (tabName) => {
  return {
    type: QUESTION_ACTIVE_TAB,
    payload: tabName
  }
}

export const changeClassValue = (classValue) => {
  return {
    type: QUESTION_CHANGE_CLASS_VALUE,
    payload: classValue
  };
};

export const changeSubjectValue = (subject) => {
  return {
    type: QUESTION_CHANGE_SUBJECT_VALUE,
    payload: subject
  };
};

export const changeChapterValue = (chapter) => {
  return {
    type: QUESTION_CHANGE_CHAPTER_VALUE,
    payload: chapter
  };
};

export const changeUsersAnswer = (questionId, option, optionValue) => {
  return {
    type: QUESTION_CHANGE_USERSANSWER,
    payload: {
      questionId,
      option,
      optionValue
    }
  };
};

export const setIsQuestionReady = (isReady) => {
  return {
    type: QUESTION_IS_READY,
    payload: isReady
  }
};

export const initializeQuestions = (questions) => {
  return {
    type: QUESTION_INITIALIZE_QUESTIONS,
    payload: questions
  };
};

export const requestGetTodaysQuestions = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      const requestBody = {
        userId: getState().user.myUser._id,
        className: getState().question.class,
        subject: getState().question.subject,
        chapter: getState().question.chapter
      };

      const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/questions`, { params: requestBody });

      switch (result.status) {
        case 200:
          if (result.data.length) {
            const questions = result.data.map(que => (
              {
                _id: que._id,
                problemStatement: que.problemStatement,
                options: que.options,
                answerByUser: {
                  a: false,
                  b: false,
                  c: false,
                  d: false
                },
                state: que.state
              }
            ));

            dispatch(initializeQuestions(questions));
            dispatch(setIsQuestionReady(true));
          } else {
            throw new Error(`No questions found for the selected options!`);
          }
          break;
        default:
          throw new Error(`Unhandled status code while fetching the questions!`);
      }
    } catch(error) {
      dispatch(setIsQuestionReady(false));
      dispatch(showMessageBox(error.toString(), 'danger'));
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const requestSubmitAnswer = (questionId, usersAnswer) => {
  return async(dispatch, getState) => {
    try {
      const userId = getState().user.myUser._id;

      const requestObject = {
        userId,
        questionId,
        usersAnswer
      };

      dispatch(startLoading());
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/questions/submit`, requestObject);
      
      switch(response.status) {
        case 200:
          dispatch(showMessageBox(`Congratulations! Your answer is correct.`, 'success'));
          break;
        case 204:
          dispatch(showMessageBox(`Incorrect answer. Try again!`, 'danger'));
          break;
        default:
          throw new Error(`Unhandled status code while submitting answer!`);
      }
    } catch(error) {
      dispatch(showMessageBox(error.toString(), 'danger'));
    } finally {
      dispatch(stopLoading());
    }
  };
};