
const defaultState = {
  questions: [],
  page: 'login',
  uname: '',
  score: 0,

};


export default (state = defaultState, action) => {
  switch (action.type) {
   
    case 'PLAY_AGAIN': {
      return { ...state, page: 'showquestions' };
    }

    case 'GET_SCORE': {
      // console.log('payload', action.payload);
      return {
        ...state, score: action.payload[0], page: action.payload[1],
      };
      // return state;
    }
    case 'GET_QUESTIONS': {
      // console.log('payload', action.payload);
      return {
        ...state, questions: action.payload[0], page: 'showquestions', uname: action.payload[1],
      };
      // return state;
    }
    default: {
      return state;
    }
  }
};
