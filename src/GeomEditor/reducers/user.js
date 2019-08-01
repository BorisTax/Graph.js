import {SET_TOKEN, LOGOUT} from "../actions/UserActions";
import {captions} from '../locale/eng';
import jwtDecode from 'jwt-decode';

var user={}
var token=localStorage.getItem('token');
if(token) user={name:jwtDecode(token).name,token}; else user.name=captions.user.name;
export function userReducer(state=user,action) {
    switch (action.type) {
        case SET_TOKEN:
            if(action.payload) {
                localStorage.setItem('token',action.payload);
                user={name:jwtDecode(action.payload).name,token:action.payload}
            }
            else{
                user.name=captions.user.name;
            }
            return user;
        case LOGOUT:
            localStorage.removeItem('token');
            return {}
        default:
            return state
    }
}