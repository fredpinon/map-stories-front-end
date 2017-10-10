const defaultState = {
  editors: {},
  stories: {}
}

const entities = (state = defaultState, action) => {
  if(action.response && action.response.entities) {
    console.log('in the reducer ', action.response);
    return {
      ...state,
      editors: {
        ...state.editors,
        ...action.response.entities.editors
      },
      stories: {
        ...state.stories,
        ...action.response.entities.stories,
      }
    };
  }
  return state;
};

export default entities;
