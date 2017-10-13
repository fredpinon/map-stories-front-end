import { CALL_API, Schemas } from '../middleware/api';

export const CREATE_STORY_REQUEST = 'CREATE_STORY_REQUEST';
export const CREATE_STORY_SUCCESS = 'CREATE_STORY_SUCCESS';
export const CREATE_STORY_FAILURE = 'CREATE_STORY_FAILURE';

export const createStory = (data) => ({
  [CALL_API]: {
    types: [ CREATE_STORY_REQUEST, CREATE_STORY_SUCCESS, CREATE_STORY_FAILURE ],
    endpoint: '/stories',
    schema: Schemas.STORY,
    method: 'POST',
    data: data,
  }
})

export const EDIT_EVENT_REQUEST = 'EDIT_EVENT_REQUEST';
export const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
export const EDIT_EVENT_FAILURE = 'EDIT_EVENT_FAILURE';

export const editEvent = (data, storyId, method=undefined) => ({
  [CALL_API]: {
    types: [ EDIT_EVENT_REQUEST, EDIT_EVENT_SUCCESS, EDIT_EVENT_FAILURE ],
    endpoint: method !== undefined ? `/stories/${storyId}/events/${data.id}`: `/stories/${storyId}/events`,
    schema: Schemas.STORY,
    method: method !== undefined ? method : (data.id ? 'PUT' : 'POST'),
    data: data,
  }
})

export const STORIES_HP_REQUEST = 'STORIES_HP_REQUEST';
export const STORIES_HP_SUCCESS = 'STORIES_HP_SUCCESS';
export const STORIES_HP_FAILURE = 'STORIES_HP_FAILURE';

export const fetchStoriesHomePage = () => ({
  [CALL_API]: {
    types: [ STORIES_HP_REQUEST, STORIES_HP_SUCCESS, STORIES_HP_FAILURE ],
    endpoint: '/stories/',
    schema: Schemas.STORY_ARRAY
  }
})

export const STORIES_USER_REQUEST = 'STORIES_USER_REQUEST';
export const STORIES_USER_SUCCESS = 'STORIES_USER_SUCCESS';
export const STORIES_USER_FAILURE = 'STORIES_USER_FAILURE';

export const fetchStoriesUserPage = () => ({
  [CALL_API]: {
    types: [ STORIES_USER_REQUEST, STORIES_USER_SUCCESS, STORIES_USER_FAILURE ],
    endpoint: '/me/stories',
    schema: Schemas.STORY_ARRAY
  }
})

export const STORY_REQUEST = 'STORY_REQUEST';
export const STORY_SUCCESS = 'STORY_SUCCESS';
export const STORY_FAILURE = 'STORY_FAILURE';

export const fetchSingleStory = (storyId) => ({
  [CALL_API]: {
    types: [ STORY_REQUEST, STORY_SUCCESS, STORY_FAILURE ],
    endpoint: `/stories/${storyId}`,
    schema: Schemas.STORY
  }
})


export const STORIES_SEARCH_REQUEST = 'STORIES_SEARCH_REQUEST';
export const STORIES_SEARCH_SUCCESS = 'STORIES_SEARCH_SUCCESS';
export const STORIES_SEARCH_FAILURE = 'STORIES_SEARCH_FAILURE';

export const fetchStoriesSearch = (query) => ({
  [CALL_API]: {
    types: [ STORIES_SEARCH_REQUEST, STORIES_SEARCH_SUCCESS, STORIES_SEARCH_FAILURE ],
    endpoint: `/stories/?q=${query}`,
    schema: Schemas.STORY_ARRAY
  }
})

export const storeCredentials = (userCredentials) => ({
  type: 'USER_CREDENTIALS',
  payload: {
    userCredentials,
  }
})

export const logOutUser = () => ({
  type: 'USER_LOGGED_OUT',
  payload: {

  }
})

export const clearSearch = () => ({
  type: 'CLEAR_SEARCH',
  payload: {

  }
})
