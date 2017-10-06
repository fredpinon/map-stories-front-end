const entities = (state = {}, action) => {
  switch (action.type) {
    case 'STORIES_HP_SUCCESS':
      return {
        ...state,
        editors: action.response.entities.editors,
        stories: action.response.entities.stories,
      };
    case 'STORIES_USER_SUCCESS':
      return {
        ...state,
        editors: action.response.entities.editors,
        stories: action.response.entities.stories,
      };
    case 'STORY_SUCCESS':
    // console.log(action);
      return {
        // ...state,
        // story: action.
      }
    default:
      return state;
  }
};

export default entities;
