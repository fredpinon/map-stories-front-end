import { combineReducers } from 'redux';

import authentication from './authentication';
import entities from './entities';
import pages from './pages';
import timer from './timer'

const reducers = combineReducers({
  authentication,
  entities,
  pages,
  timer
})

export default reducers;
