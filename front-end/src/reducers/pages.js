const defaultState = {
  storiesList: {
    searchResults: []
  }
}

const pages = (state = defaultState, action) => {
  switch (action.type) {
    case 'STORIES_SEARCH_SUCCESS':
      return {
        ...state,
        storiesList: {
            ...state.storiesList,
            searchResults: action.response.result
        },
      };
    case 'CLEAR_SEARCH':
    console.log('INSIDE CLEAR SEARCH');
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
