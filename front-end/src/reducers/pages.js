import * as actions from '../actions'

const defaultState = {
  createStory: {
    newStoryId: null
  }
}

const pages = (state = defaultState, action) => {
  switch (action.type) {
    case actions.CREATE_STORY_SUCCESS:
      return {
        ...state,
        createStory: {
          ...state.createStory,
          newStoryId: action.response.result
        }
      }
      break;
  }
  return state;
};

export default pages;
