
import {ComponentActions} from "../actions/ComponentActions";
import {ScreenActions, deleteSelectedShapes} from "../actions/ScreenActions";
import {AppActions} from '../actions/AppActions';
import { Status } from "./screen";
const initialState={
    activeLangButton:"en",
    defaultLang:"en",
    activeSnapButtons:new Set(),
    showHelp:false,
    showConfirm:{show:false,message:""},
    showAlert:{show:false,message:""}
}
export function componentReducer(state=initialState,action) {
    let newState={...state};
    const data=action.payload;
    if(!newState.activeButtons) newState.activeButtons=new Set();
    switch (action.type) {
        case ScreenActions.CANCEL:
            return {...newState,activeCreateButton:null}
        case ComponentActions.SET_ACTIVE_CREATE_BUTTON:
            newState.activeCreateButton=data;
            return newState;
        case ComponentActions.SET_ACTIVE_LANG_BUTTON:
            newState.activeLangButton=data;
            return newState;
        case ComponentActions.SET_ACTIVE_SNAP_BUTTON:
            newState.activeSnapButtons.add(data);
            return newState;    
        case ComponentActions.CLEAR_ACTIVE_SNAP_BUTTON:
            newState.activeSnapButtons.delete(data);
            return newState;
        case ScreenActions.SET_STATUS:
            if(data.status===Status.FREE) return{...state,activeCreateButton:''}
            return{...state} 
        case AppActions.SHOW_HELP:
            return {...state,showHelp:data};  
        case AppActions.SHOW_CONFIRM:
            return {...state,showConfirm:data};  
        case AppActions.SHOW_ALERT:
            return {...state,showAlert:data}; 
        case ScreenActions.DELETE_CONFIRM:
           return{...state,showConfirm:{show:true,messageKey:"deleteShapes",okAction:deleteSelectedShapes.bind(null,false)}}    
        default:
            return newState;
    }
}