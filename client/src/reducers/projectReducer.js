import {
  GET_PROJECTS,
  ADD_PROJECTS,
  DELETE_PROJECT,
  GET_PROJECT,
  ADD_TEAMS
} from '../actions/types';


const initialState = {
  projects: [],
  teams: []
}


export default (state = initialState, action) => {
    switch(action.type){
      case GET_PROJECTS:
        return {
          ...state,
          projects: action.payload
        };
      case GET_PROJECT: 
        return {
          ...state,
          project: action.payload
        };
      case ADD_PROJECTS: 
        return {
          ...state,
          projects: [action.payload , ...state.projects]
        };
      case ADD_TEAMS: 
        return {
          ...state,
          teams: action.payload
        }
      case DELETE_PROJECT:
        return {
          ...state,
          projects: state.projects.filter(project => project._id !== action.payload)
        };
      default:
        return state;
    }
  }
  