import { CALL_API, Schemas } from '../middleware/api'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

export const fetchUser = () => ({
  [CALL_API]: {
    types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
    endpoint: `/me`,
    schema: Schemas.USER
  }
})
