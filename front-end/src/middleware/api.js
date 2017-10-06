import { normalize, schema } from 'normalizr';

const API_ROOT = 'https://localhost/4000';

const callApi = (endpoint, schema) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl)
  .then(response =>
    response.json().then(json => {
      // if (!response.ok) {
      //   return Promise.reject(json)
      // }

      // const camelizedJson = camelizeKeys(json)
      //
      // return Object.assign({},
      //   normalize(camelizedJson, schema),
      //   { nextPageUrl }
      // )
    })
  )
}

const userSchema = new schema.Entity('users', {}, { idAttribute: 'user_id' });
const mapSchema = new schema.Entity('maps', { user: userSchema }, { idAttribute: 'map_id' });
const eventSchema = new schema.Entity('events', { map: mapSchema }, { idAttribute: 'event_id' });

export const Schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
  MAP: mapSchema,
  MAP_ARRAY: [mapSchema],
  EVENT: eventSchema,
  EVENT_ARRAY: [eventSchema],
};

export const CALL_API = 'Call API';

export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') return next(action)

  let { endpoint } = callAPI
  const { schema, types } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}
