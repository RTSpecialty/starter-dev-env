import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInviant from 'redux-immutable-state-invariant';
import rootReducer from './reducers';
import { loader as demoLoader, state as demoState } from './modules/demo';
import { state as commonState } from './modules/common';
import { loader as userLoader, state as userState } from './modules/user';
import { state as agencyState } from './modules/agency';

export const state = {
  ...commonState,
  ...agencyState,
  ...userState,
  ...demoState,
};

export function initialize(store) {
  demoLoader(store);
  userLoader(store);
  return store;
}

export function configure(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, reduxImmutableStateInviant()),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );
}
