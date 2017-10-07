import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';
import api from '../middleware/api';
import { loadState, saveState } from '../localStorage';

const persistedState = loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk, api))
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
