import { CALL_API, Schemas } from '../middleware/api';

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

export const DELETE_REQUEST = 'DELETE_REQUEST';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_FAILURE = 'DELETE_FAILURE';

export const deleteStory = (storyId) => ({
  [CALL_API]: {
    method: 'DELETE',
    types: [ DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE ],
    endpoint: `/stories/${storyId}`,
    schema: Schemas.STORY,
  }
})

export const UPDATE_STORY_REQUEST = 'UPDATE_STORY_REQUEST';
export const UPDATE_STORY_SUCCESS = 'UPDATE_STORY_SUCCESS';
export const UPDATE_STORY_FAILURE = 'UPDATE_STORY_FAILURE';

export const updateStory = (storyId, data) => ({
  [CALL_API]: {
    method: 'PUT',
    types: [ UPDATE_STORY_REQUEST, UPDATE_STORY_SUCCESS, UPDATE_STORY_FAILURE ],
    endpoint: `/stories/${storyId}`,
    schema: Schemas.STORY,
    data
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
