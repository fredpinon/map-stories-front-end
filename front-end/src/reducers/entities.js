const defaultState = {
  editors: {},
  stories: {}
}

const entities = (state = defaultState, action) => {
  if(action.response && action.response.entities) {
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
