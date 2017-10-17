import * as actions from '../actions'

const defaultState = {
  errorTime: null,
  errorMessage: '',
}

const errors = (state = defaultState, action) => {
  switch (action.type) {
    case actions.SHOW_ERROR:
      return {
        errorTime: (new Date()).getTime() + 5000,
        errorMessage: action.errorMessage,
      }
      break;
    default:
      return state;
  }
};

export default errors;
