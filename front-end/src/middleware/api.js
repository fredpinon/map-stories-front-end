import { normalize, schema } from 'normalizr';

const callApi = (endpoint, schema, method='GET', body, accessToken) => {
  const fullUrl = 'http://localhost:4000' + endpoint;

 const headers = {}
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  if (method === 'POST' || method === 'PUT') headers['Content-Type'] = 'application/json';

 return fetch(fullUrl, {
    method,
    headers,
    body
  })
    .then(response => response.json())
    .then(data => schema ? normalize(data, schema) : data)
}

const editorSchema = new schema.Entity('editors', {} ,{ idAttribute: '_id'} );
const storySchema = new schema.Entity('stories', { editor: editorSchema }, { idAttribute: '_id'});

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


 const { endpoint, schema, types, method, onSuccess } = callAPI;

 let data;
  if (callAPI.data) data = JSON.stringify(callAPI.data);

 if (typeof endpoint !== 'string') throw new Error('Specify a string endpoint URL.');

 if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  };

 const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

 const [ requestType, successType, failureType ] = types;

 next(actionWith({type: requestType}));

 let accessToken;
  if(store.getState().authentication.token) {
    accessToken = store.getState().authentication.token;
  } else if (callAPI.data && callAPI.data.token) {
    accessToken = callAPI.data.token;
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
        error: error.message
      })))
}
