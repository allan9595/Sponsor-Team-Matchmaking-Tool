import axios from 'axios';

import {
  GET_ERRORS,
  GET_PROJECTS,
  ADD_PROJECTS,
  DELETE_PROJECT,
  GET_PROJECT,
  EDIT_PROJECT
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


  // Update Project
export const updateProject = (projectData, history, id) => dispatch => {
  axios
    .post(`/api/project/sponsor/edit-project/${id}`, projectData)
    .then(res => {
      dispatch({
        type: EDIT_PROJECT,
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


// Delete Project from sponsor
export const deleteProject= id => dispatch => {
  axios
    .delete(`/api/project/sponsor/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PROJECT,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Get current project
export const getCurrentProject = (id) => dispatch => {
  axios
    .get(`/api/project/sponsor/edit-project/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROJECT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROJECT,
        payload: {}
      })
    );
};