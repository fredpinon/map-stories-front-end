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
            searchResult: action.response
        },
      };
    case 'CLEAR_SEARCH':
    console.log('INSIDE CLEAR SEARCH');
      return {
        ...state,
        storiesList: {
          
        }
      }
    default:
      return state;
  }
};

export default pages;
