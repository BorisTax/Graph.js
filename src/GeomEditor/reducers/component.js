
import {SET_ACTIVE_SNAP_BUTTON,CLEAR_ACTIVE_SNAP_BUTTON} from "../actions/ComponentActions";
import {SET_ACTIVE_CREATE_BUTTON,SET_ACTIVE_LANG_BUTTON} from "../actions/ComponentActions";
import {SET_STATUS, DELETE_SELECTED_SHAPES, deleteSelectedShapes} from "../actions/ScreenActions";
import {SHOW_HELP, SHOW_CONFIRM} from '../actions/AppActions';
const initialState={
    activeLangButton:"en",
    defaultLang:"en",
    activeSnapButtons:new Set(),
    showHelp:false,
    showConfirm:{show:false,message:""},
}
export function componentReducer(state=initialState,action) {
    let newState={...state};
    const data=action.payload;
    if(!newState.activeButtons) newState.activeButtons=new Set();
    switch (action.type) {
        case SET_ACTIVE_CREATE_BUTTON:
            newState.activeCreateButton=data;
            return newState;
        case SET_ACTIVE_LANG_BUTTON:
            newState.activeLangButton=data;
            return newState;
        case SET_ACTIVE_SNAP_BUTTON:
            newState.activeSnapButtons.add(data);
            return newState;    
        case CLEAR_ACTIVE_SNAP_BUTTON:
            newState.activeSnapButtons.delete(data);
            return newState;
        case SET_STATUS:
            if(data==='FREE') return{...state,activeCreateButton:''}
            return{...state} 
        case SHOW_HELP:
            return {...state,showHelp:data};  
        case SHOW_CONFIRM:
            return {...state,showConfirm:data};  
        case DELETE_SELECTED_SHAPES:
            if(data.ask) return{...state,showConfirm:{show:true,messageKey:"deleteShapes",okAction:deleteSelectedShapes.bind(null,false)}}    
             else return state; 
        default:
            return newState;
    }
}