import * as actions from '../actions'

const defaultState = {
  storiesList: {
    searchResults: []
  },
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
    case actions.STORIES_SEARCH_SUCCESS:
      return {
        ...state,
        storiesList: {
          ...state.storiesList,
          searchResults: action.response.result
        },
      };
    case actions.CLEAR_SEARCH:
      return {
        ...state,
        storiesList: {
          ...state.storiesList,
          searchResults: []
        }
      }
    default:
      return state;
  }
};

export default pages;
