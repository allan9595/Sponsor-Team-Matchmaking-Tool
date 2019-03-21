import {SET_TEXT_FILITER} from '../actions/types';

const initialState = {
    text: ''
}


export default (state=initialState, action) => {
    switch(action.type){
        case SET_TEXT_FILITER:
            return {
                ...state,
                text: action.text
            };
        default: 
            return state;
    }
}