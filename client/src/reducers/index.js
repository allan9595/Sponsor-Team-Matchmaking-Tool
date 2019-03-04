import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import projectReducer from './projectReducer';

export default combineReducers({
  auth: authReducer,
  projectReducer: projectReducer,
  errors: errorReducer,
});
