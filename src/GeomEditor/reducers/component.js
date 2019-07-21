
import {SET_ACTIVE_SNAP_BUTTON,CLEAR_ACTIVE_SNAP_BUTTON} from "../actions/ComponentActions";
import {SET_ACTIVE_CREATE_BUTTON,SET_ACTIVE_LANG_BUTTON} from "../actions/ComponentActions";
import {SET_STATUS} from "../actions/ScreenActions";
import {SHOW_HELP} from '../actions/AppActions';
const initialState={
    activeLangButton:"en",
    defaultLang:"en",
    activeSnapButtons:new Set(),
    showHelp:false,
}
export function componentReducer(state=initialState,action) {
    let newState={...state};
    if(!newState.activeButtons) newState.activeButtons=new Set();
    switch (action.type) {
        case SET_ACTIVE_CREATE_BUTTON:
            newState.activeCreateButton=action.payload;
            return newState;
        case SET_ACTIVE_LANG_BUTTON:
            newState.activeLangButton=action.payload;
            return newState;
        case SET_ACTIVE_SNAP_BUTTON:
            newState.activeSnapButtons.add(action.payload);
            return newState;    
        case CLEAR_ACTIVE_SNAP_BUTTON:
            newState.activeSnapButtons.delete(action.payload);
            return newState;
        case SET_STATUS:
            if(action.payload==='FREE') return{...state,activeCreateButton:''}
            return{...state} 
        case SHOW_HELP:
            return {...state,showHelp:action.payload};        
        default:
            return newState;
    }
}