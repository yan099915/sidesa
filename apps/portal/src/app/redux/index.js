import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { thunk } from 'redux-thunk';
import UsersReducers from './UsersReducers';
import ReduxState from './ReduxState';

// Middleware
const middleware = [thunk];

// Combine reducers
const rootReducer = combineReducers({
  UsersReducers: UsersReducers,
  ReduxState: ReduxState,
});

// Enhancers (jika diperlukan)
const enhancers = [];

// Compose middleware dan enhancers
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

// Buat store Redux
const store = createStore(rootReducer, composedEnhancers);

export default store;
