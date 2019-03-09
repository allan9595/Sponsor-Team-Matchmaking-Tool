import axios from 'axios';

import {
  GET_ERRORS,
  GET_PROJECTS,
  ADD_PROJECTS
} from './types';


// Create Project
export const createProject = (projectData, history) => dispatch => {
    axios
      .post('/api/project/sponsor/create', projectData)
      .then(res => {
        dispatch({
          type: ADD_PROJECTS,
          payload: res.data
        })
      })
      .then(res => history.push('/sponsor'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };


//GET all the projects 
export const getProjects = () => dispatch => {
  
  axios
    .get('/api/project/sponsor')
    .then(res =>
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROJECTS,
        payload: null
      })
    );
};