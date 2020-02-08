import {UserActions} from "../actions/UserActions";
import {captions} from '../locale/eng';
import jwtDecode from 'jwt-decode';

var user={}
//var token=localStorage.getItem('token');
//if(!token) token=sessionStorage.getItem('token');
var token=document.cookie.split('=')[1];
if(token) user={name:jwtDecode(token).name,token}; else user.name=captions.user.name;
export function userReducer(state=user,action) {
    switch (action.type) {
        case UserActions.SET_TOKEN:
            if(action.payload.token) {
                let expires;
                if(action.payload.remember===true) expires=`;expires=Tue, 19 Jan 2099 00:00:00 GMT`;
                    else expires=''
                document.cookie=`token=${action.payload.token}${expires}`
                user={name:jwtDecode(action.payload.token).name,token:action.payload.token}
            }
            else{
                user.name=captions.user.name;
            }
            return user;
        case UserActions.LOGOUT:
            document.cookie='token='
            return {}
        default:
            return state
    }
}