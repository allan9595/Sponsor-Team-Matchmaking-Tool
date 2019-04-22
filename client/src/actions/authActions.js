import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, GET_USERS, GET_USER, DELETE_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/signup', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginAdmin = userData => dispatch => {
  axios
    .post('/api/users/login-admin', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
 
 
       // Set current user to {} which will set isAuthenticated to false
      dispatch(setCurrentUser({}));
    
  
};

export const submitEmail = (values) => async dispatch =>{
  axios.post('/api/users/forgot', values)
  
};

// Reset User
export const resetPassword = (userData, history, token) => dispatch => {
  axios
    .post(`/api/users/reset/${token}`, userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//fetching User accounts 
export const getUsers = () => dispatch => {
  axios
    .get('/api/users/admin')
    .then(res => dispatch({
      type: GET_USERS,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: null
      })
    );
}

// Register User
export const registerAdmin = (userData, history) => dispatch => {
  axios
    .post('/api/users/signup-admin', userData)
    .then(res => history.push('/login-admin'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};



//GET single user from admin view
export const getAdminUser = (id) => dispatch => {
  axios
    .get(`/api/users/admin/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER,
        payload: null
      })
    );
};


// Delete User from admin
export const deleteUser = (id,history) => dispatch => {
  axios
    .delete(`/api/users/admin/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_USER,
        payload: id
      })
    )
    .then(res => history.push('/admin'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};