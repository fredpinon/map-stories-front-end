import * as actions from '../actions'

const defaultState = {
  storiesList: {
    searchResults: [],
    pageResults: []
  },
  createStory: {
    newStoryId: null
  },
  editorStoriesPage: {
    results: []
  }
}

const pages = (state = defaultState, action) => {
  switch (action.type) {
    case actions.CREATE_STORY_SUCCESS:
      const newStoryArr = [action.response.result];
      return {
        ...state,
        createStory: {
          ...state.createStory,
          newStoryId: action.response.result
        },
        editorStoriesPage: {
          results: state.editorStoriesPage.results.concat(newStoryArr),
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
    case 'CLEAR_SEARCH':
      return {
        ...state,
        storiesList: {
          ...state.storiesList,
          searchResults: []
        }
      }
    case 'STORIES_HP_SUCCESS':
      return {
        ...state,
        storiesList: {
          ...state.storiesList,
          pageResults: action.response.result
        }
      }
    case actions.STORIES_USER_SUCCESS:
      return {
        ...state,
        editorStoriesPage: {
          results: action.response.result
        }
      }
    case actions.DELETE_STORY_SUCCESS:
      return {
        ...state,
        editorStoriesPage: {
          results: state.editorStoriesPage.results.filter(id => id !== action.payload.storyId)
        }
      }
    default:
      return state;
  }
};

export default pages;
