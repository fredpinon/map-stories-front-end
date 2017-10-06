import { combineReducers } from 'redux';

import authentication from './authentication';
import entities from './entities';

const reducers = combineReducers({
  authentication,
  entities
})

export default reducers;
