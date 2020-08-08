import { 
  QUESTION_ACTIVE_TAB,
  QUESTION_CHANGE_CLASS_VALUE,
  QUESTION_CHANGE_SUBJECT_VALUE,
  QUESTION_CHANGE_CHAPTER_VALUE,
  QUESTION_IS_READY,
  QUESTION_INITIALIZE_QUESTIONS,
  QUESTION_CHANGE_USERSANSWER,
} from '../constants';

const getUpdateArray = (arr, indexToUpdate, newValue) => {
  return arr.map((oldValue, index) => (index === indexToUpdate) ? newValue : oldValue);
};

const initialState = {
  questions: [{
    _id: '',
    problemStatement: '',
    options: {
      a: '',
      b: '',
      c: '',
      d: ''
    },
    answerByUser: {
      a: false,
      b: false,
      c: false,
      d: false
    },
    state: 'UNATTEMPTED',
  }],
  activeTab: 'question1',
  class: '',
  subject: '',
  chapter: '',
  isQuestionReady: false,
};

const questionReducer = (state = initialState, action) => {
  switch(action.type) {
    case QUESTION_ACTIVE_TAB:   // used in uploadQuestions component
      return {
        ...state,
        activeTab: action.payload
      };
    case QUESTION_CHANGE_CLASS_VALUE:
      return {
        ...state,
        class: action.payload
      };
    case QUESTION_CHANGE_SUBJECT_VALUE:
      return {
        ...state,
        subject: action.payload
      };
    case QUESTION_CHANGE_CHAPTER_VALUE:
      return {
        ...state,
        chapter: action.payload
      };
    case QUESTION_IS_READY:
      return {
        ...state,
        isQuestionReady: action.payload
      }
    case QUESTION_INITIALIZE_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      };
    case QUESTION_CHANGE_USERSANSWER:
      const { questionId, option, optionValue } = action.payload;
      const index = state.questions.findIndex(que => que._id === questionId);
      const question = state.questions.find(que => que._id === questionId);
      const newQuestionObj = {
        ...question,
        answerByUser: {
          ...question.answerByUser,
          [option]: optionValue
        }
      };

      return {
        ...state,
        questions: getUpdateArray(state.questions, index, newQuestionObj)
      };
    default:
      return state;
  }
};

export default questionReducer;