import axios from 'axios';

import {
  GET_ERRORS
} from './types';


// Create Profile
export const createProject = (projectData, history) => dispatch => {
    axios
      .post('/api/project/sponsor/create', projectData)
      .then(res => history.push('/sponsor'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };