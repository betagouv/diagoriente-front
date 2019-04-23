import { applyMiddleware, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware, { SagaIterator, SagaMiddleware } from 'redux-saga';

import persistConfig from './persist';
import globalReducer from '../reducers';
import globalSaga from '../sagas';

/* ------------- Saga Middleware ------------- */
const sagaMiddleware: SagaMiddleware<SagaIterator> = createSagaMiddleware();

/* ------------- All Middleware ------------- */
const middlewares: Middleware[] = [sagaMiddleware];

/* ------------- Logger Middleware ------------- */
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewares.push(logger);
}

/* ------------- Persist Reducer ------------- */
const persistedReducer = persistReducer(persistConfig, globalReducer);

/* ------------- Redux Store ------------- */
const store = createStore(persistedReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(globalSaga);

export default store;

export const persistor = persistStore(store);
