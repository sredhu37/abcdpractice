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

const emptyQuestion = {
  problemStatement: "",
  options: {
    a: "",
    b: "",
    c: "",
    d: "",
  },
  answer: {
    a: false,
    b: false,
    c: false,
    d: false,
  },
  solution: "",
  uploader: "",
};

const initialState = {
  questions: [
    {
      ...emptyQuestion,
      number: 1,
    },
  ],
  class: '',
  subject: '',
  chapter: '',
  uploader: '',
};

const getUpdatedArray = (arr, indexToUpdate, newValue) => {
  return arr.map((item, index) => index === indexToUpdate ? newValue : item);
};

const getArrayAfterRemovingLastItem = (arr) => {
  if(arr.length > 1) {
    return arr.slice(0, -1);
  } else {
    return arr;
  }
};

const uploadQuestionsReducer = (state = initialState, action) => {
  let questionNumber, queIndex, optionValue;

  switch(action.type) {
    case UPLOAD_QUESTION_ADD_NEW_QUESTION:
      const numberOfQuestions = state.questions.length;
      const newQuestion = {
        ...emptyQuestion,
        number: numberOfQuestions + 1,
      };

      return {
        ...state,
        questions: [
          ...(state.questions),
          newQuestion
        ]
      };

    case UPLOAD_QUESTION_DELETE_LAST_QUESTION:
      return {
        ...state,
        questions: getArrayAfterRemovingLastItem(state.questions)
      };

    case UPLOAD_QUESTION_CHANGE_PROBLEM_STATEMENT:
      questionNumber = action.payload.questionNumber;
      const problemStatement = action.payload.problemStatement;

      queIndex = state.questions.findIndex(que => que.number === questionNumber);

      return {
        ...state,
        questions: getUpdatedArray(state.questions, queIndex, {
          ...(state.questions[queIndex]),
          problemStatement
        })
      };

    case UPLOAD_QUESTION_CHANGE_OPTION_STATEMENT:
      questionNumber = action.payload.questionNumber;
      const optionStatement = action.payload.optionStatement;
      optionValue = action.payload.optionValue;

      queIndex = state.questions.findIndex(que => que.number === questionNumber);

      return {
        ...state,
        questions: getUpdatedArray(state.questions, queIndex, {
          ...(state.questions[queIndex]),
          options: {
            ...(state.questions[queIndex].options),
            [optionValue]: optionStatement
          }
        })
      };

    case UPLOAD_QUESTION_CHANGE_ANSWER_VALUE:
      questionNumber = action.payload.questionNumber;
      const answerValue = action.payload.answerValue;
      optionValue = action.payload.optionValue;

      queIndex = state.questions.findIndex(que => que.number === questionNumber);

      return {
        ...state,
        questions: getUpdatedArray(state.questions, queIndex, {
          ...(state.questions[queIndex]),
          answer: {
            ...(state.questions[queIndex].answer),
            [optionValue]: answerValue,
          }
        })
      };

    case UPLOAD_QUESTION_CHANGE_CLASS_VALUE:
      return {
        ...state,
        class: action.payload,
      };

    case UPLOAD_QUESTION_CHANGE_SUBJECT_VALUE:
      return {
        ...state,
        subject: action.payload,
      };

    case UPLOAD_QUESTION_CHANGE_CHAPTER_VALUE:
      return {
        ...state,
        chapter: action.payload,
      };

    case UPLOAD_QUESTION_RESET_ALL:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default uploadQuestionsReducer;