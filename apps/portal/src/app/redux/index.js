import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { thunk } from 'redux-thunk';
import ReduxState from './ReduxState';
import UsersReducers from './UsersReducers';
import VerificationReducers from './VerificationReducers';
import ResidentReducers from './ResidentReducers';
import FamilyReducers from './FamilyReducers';
import RequestReducers from './RequestReducers';

// Middleware
const middleware = [thunk];

// Combine reducers
const rootReducer = combineReducers({
  UsersReducers: UsersReducers,
  ReduxState: ReduxState,
  VerificationReducers: VerificationReducers,
  ResidentReducers: ResidentReducers,
  FamilyReducers: FamilyReducers,
  RequestReducers: RequestReducers,
});

// Enhancers (jika diperlukan)
const enhancers = [];

// Compose middleware dan enhancers
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

// Buat store Redux
const store = createStore(rootReducer, composedEnhancers);

export default store;
