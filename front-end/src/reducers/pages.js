const defaultState = {
  searchedStories: []
}

const pages = (state = defaultState, action) => {
  switch (action.type) {
    case 'STORIES_SEARCH_SUCCESS':
      return {
        ...state,
        searchedStories: action.response,
      };
    default:
      return state;
  }
};

export default pages;
