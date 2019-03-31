
import {SET_ACTIVE_SNAP_BUTTON,CLEAR_ACTIVE_SNAP_BUTTON} from "../actions/ComponentActions";
import {SET_ACTIVE_CREATE_BUTTON,SET_ACTIVE_LANG_BUTTON} from "../actions/ComponentActions";
const initialState={
    activeLangButton:"ENG",
    defaultLang:"ENG",
    activeSnapButtons:new Set(),
}
export function componentReducer(state=initialState,action) {
    let newState=Object.assign({},state);
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
        default:
            return newState;
    }
}