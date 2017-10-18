import { combineReducers } from 'redux';

import authentication from './authentication';
import entities from './entities';
import pages from './pages';
import errors from './errors';



const reducers = combineReducers({
  authentication,
  entities,
  pages,
  errors
})

export default reducers;
