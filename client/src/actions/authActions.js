import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';



//Register User



export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/signup', userData)
      .then(res => history.push('/login'))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
};




//set logged in user

export const setCurrentUser = (decoded) => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    }
  }



  //Login User - Get User Token


export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login',userData)
      .then(res => {
        //Save token to local storge
        const { token } = res.data;
  
        //Set token to ls
        localStorage.setItem('jwtToken', token);
  
        //set token to auth header
        setAuthToken(token);
  
        const decoded = jwt_decode(token);
  
        //set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
  }


  //Log user out

export const logoutUser = () => dispatch => {
    //remove token from localstorge
    localStorage.removeItem('jwtToken');
  
    //Remove auth header for future requestes
  
    setAuthToken(false);
  
    //set current user to  {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  
  
  }
  