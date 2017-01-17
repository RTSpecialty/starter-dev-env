import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInviant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, reduxImmutableStateInviant()),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );
}
