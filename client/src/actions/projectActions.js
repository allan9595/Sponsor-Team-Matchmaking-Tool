import axios from 'axios';
import {
  GET_ERRORS,
  GET_PROJECTS,
  ADD_PROJECTS,
  DELETE_PROJECT,
  GET_PROJECT,
  EDIT_PROJECT,
  ADD_TEAMS
} from './types';


// Create Project
export const createProject = (projectData, history) => dispatch => {
    axios
      .post('/api/project/sponsor/create', projectData, { headers: { 'Content-Type': 'multipart/form-data' }})
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
    .post(`/api/project/sponsor/edit-project/${id}`, projectData, { headers: { 'Content-Type': 'multipart/form-data' }})
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

//GET all the projects for sponsor
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



//GET all the projects from professor view
export const getProjectsProfessor = () => dispatch => {
  
  axios
    .get('/api/project/professor')
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


//GET single project from professor view
export const getProjectProfessor = (id) => dispatch => {
  axios
    .get(`/api/project/professor/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROJECT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROJECT,
        payload: null
      })
    );
};


export const fileDownload = (id) => dispatch => {
  axios
    .get(`/api/project/professor/${id}/file`, 
      {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
        }
    })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', id + '.pdf'); //or any other extension
      document.body.appendChild(link);
      link.click();
  })
    .catch(err =>
      dispatch({
        type: GET_PROJECT,
        payload: null
      })
    );
};



// Team Assignment
export const teamAssignment = (teamData, history) => dispatch => {
  axios
    .post('/api/team/professor/teams/create', teamData)
    .then(res => {
      dispatch({
        type: ADD_TEAMS,
        payload: res.data
      })
    })
    .then(res => history.push('/professor'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};