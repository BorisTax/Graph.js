import {SET_TOKEN, LOGOUT} from "../actions/UserActions";
import {captions} from '../locale/eng';
import jwtDecode from 'jwt-decode';

var user={}
var token=localStorage.getItem('token');
if(!token) token=sessionStorage.getItem('token');
if(token) user={name:jwtDecode(token).name,token}; else user.name=captions.user.name;
export function userReducer(state=user,action) {
    switch (action.type) {
        case SET_TOKEN:
            if(action.payload.token) {
                if(action.payload.remember===true)localStorage.setItem('token',action.payload.token);
                else sessionStorage.setItem('token',action.payload.token);
                user={name:jwtDecode(action.payload.token).name,token:action.payload.token}
            }
            else{
                user.name=captions.user.name;
            }
            return user;
        case LOGOUT:
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            return {}
        default:
            return state
    }
}