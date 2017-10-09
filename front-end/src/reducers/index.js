import { combineReducers } from 'redux';

import authentication from './authentication';
import entities from './entities';
import pages from './pages';

const reducers = combineReducers({
  authentication,
  entities,
  pages
})

export default reducers;
