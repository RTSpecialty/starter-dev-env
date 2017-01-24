import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInviant from 'redux-immutable-state-invariant';
import rootReducer from './reducers';
import { loader as demoLoader, state as demoState } from './modules/demo';
import { state as commonState } from './modules/common';

export const state = {
  ...commonState,
  ...demoState,
};

export function initialize(store) {
  demoLoader(store);
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
