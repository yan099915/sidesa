import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { thunk } from 'redux-thunk';
import ReduxState from './ReduxState';
import ArticlesReducers from './ArticlesReducers';
import AnnouncementReducers from './AnnouncementReducers';
// Middleware
const middleware = [thunk];

// Combine reducers
const rootReducer = combineReducers({
  ReduxState: ReduxState,
  ArticlesReducers: ArticlesReducers,
  AnnouncementReducers: AnnouncementReducers,
});

// Enhancers (jika diperlukan)
const enhancers = [];

// Compose middleware dan enhancers
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

// Buat store Redux
const store = createStore(rootReducer, composedEnhancers);

export default store;
