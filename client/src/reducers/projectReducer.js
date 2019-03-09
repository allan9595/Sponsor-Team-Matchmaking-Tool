import {
  GET_PROJECTS,
  ADD_PROJECTS
} from '../actions/types';


const initialState = {
  projects: []
}


export default (state = initialState, action) => {
    switch(action.type){
      case GET_PROJECTS:
        return {
          ...state,
          projects: action.payload
        };
      case ADD_PROJECTS: 
        return {
          ...state,
          projects: [action.payload , ...state.projects]
        }
      default:
        return state;
    }
  }
  