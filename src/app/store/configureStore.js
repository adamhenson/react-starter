import { applyMiddleware, compose, createStore } from 'redux';

import createRootReducer from './reducers';

export default function configureStore(client, preloadedState) {
  return createStore(
    createRootReducer(client),
    preloadedState,
    compose(
      applyMiddleware(
        client.middleware(),
      ),
      typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f,
    ),
  );
}
