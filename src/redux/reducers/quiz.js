
const defaultState = {
  questions: [],
  page: 'login',
  uname: '',
  score: 0,

};


export default (state = defaultState, action) => {
  switch (action.type) {
    case 'EDIT_NOTE': {
      //   notescount: noteid - 1, page: 'addnote', defText: notetext, defTitle: notetitle
      return {
        ...state, page: 'addnote', notescount: action.payload.noteid - 1, defText: action.payload.notetext, defTitle: action.payload.notetitle,
      };
    }
    case 'SAVE_NOTE': {
      const newnote = state.notes.slice();
      // console.log(notesrecieved.notesid, this.state.notes.length);
      if (action.payload.notesid - 1 < state.notes.length) {
        newnote[action.payload.notesid - 1] = action.payload;
        return {
          ...state, notes: newnote, page: 'shownote', notescount: state.notes.length, defText: '', defTitle: '',
        };
      }
      newnote.push(action.payload);
      return {
        ...state, notes: newnote, page: 'shownote', notescount: state.notes.length + 1, defText: '', defTitle: '',
      };
    }
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
