import {loginUser, setCurrentUser, logoutUser, registerUser } from '../actions/authActions';
import { GET_ERRORS, SET_CURRENT_USER } from '../actions/types';

//call one test from auth
//set current user test
// test('Set current user action object', () => {
//     const action = setCurrentUser();
//     expect(action).toEqual({
//         type: SET_CURRENT_USER
//     });
// });

// //call register action
// //test('Set current user with default values')

//call register with NO data
test('call register with NO data', () => {
    const action = registerUser();
    expect(action).toBe({
        type: GET_ERRORS,
        payload: 'err.response.data'
    });

    //called properly?
    expect(action).toHaveBeenCalledTimes(1);
});