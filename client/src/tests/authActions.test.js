import {loginUser, setCurrentUser, logoutUser } from '../actions/authActions';

//call one test from auth
//set current user test
test('Set current user action object', () => {
    const action = setCurrentUser;
    expect(action).toEqual({
        type: SET_CURRENT_USER,
        payload: decoded
    });
});