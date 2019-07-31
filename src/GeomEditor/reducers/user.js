import {SET_USER} from "../actions/UserActions";
import {captions} from '../locale/eng';
import jwtDecode from 'jwt-decode';

var user={}
var token=localStorage.getItem('token');
if(token) user={name:jwtDecode(token),token}; else user.name=captions.user.name;
export function userReducer(state=user,action) {
    switch (action.type) {
        case SET_USER:
            if(action.payload.token) localStorage.setItem('token',token)
            return{...state,user:action.payload};
        default:
            return state
    }
}