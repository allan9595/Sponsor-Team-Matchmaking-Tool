import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import projectReducer from './projectReducer';
import filterReducer from './filiterReducer';
export default combineReducers({
  auth: authReducer,
  project: projectReducer,
  errors: errorReducer,
  filters: filterReducer
});
