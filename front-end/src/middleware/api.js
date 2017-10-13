import { normalize, schema } from 'normalizr';

const callApi = (endpoint, schema, method='GET', body, accessToken) => {
  const fullUrl = 'https://private-538085-mapstories.apiary-mock.com' + endpoint;

  const headers = {}
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  console.log(method);

  return fetch(fullUrl, {
    method,
    headers,
    body
  })
    .then(response => response.json())
    .then(data => {
      return Object.assign({},
          normalize(data, schema)
        )
    })
}

const editorSchema = new schema.Entity('editors', {});
const storySchema = new schema.Entity('stories', { editor: editorSchema });

export const Schemas = {
  EDITOR: editorSchema,
  EDITOR_ARRAY: [editorSchema],
  STORY: storySchema,
  STORY_ARRAY: [storySchema],
};

export const CALL_API = 'Call API';

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') return next(action);

  console.log(action);
  const { endpoint, schema, types, method, onSuccess } = callAPI;

  let data;
  if (callAPI.data) data = JSON.stringify(callAPI.data);

  if (typeof endpoint !== 'string') throw new Error('Specify a string endpoint URL.');

  if (!schema) throw new Error('Specify one of the exported Schemas.');

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  };

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types;

  next(actionWith({type: requestType}));

  let accessToken;
  if(store.getState().authentication.token) {
    accessToken = store.getState().authentication.token;
  }

  return callApi(endpoint, schema, method, data, accessToken)
    .then(response => {
      store.dispatch(actionWith({
        type: successType,
        response
      }))
      if (typeof onSuccess === 'function') onSuccess(response);
    })
    .catch(error => store.dispatch(actionWith({
        type: failureType,
        error
      })))
}
