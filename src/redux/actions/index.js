
const PLAY_AGAIN = 'PLAY_AGAIN';
const GET_SCORE = 'GET_SCORE';
const GET_QUESTIONS = 'GET_QUESTIONS';


export const playAgain = () => ({
  type: PLAY_AGAIN,

});

export const getScore = payload => ({
  type: GET_SCORE,
  payload,

});
export const getQuestions = payload => ({
  type: GET_QUESTIONS,
  payload,
});
