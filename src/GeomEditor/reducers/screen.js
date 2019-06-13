import {SET_GRID_VISIBLE,SET_GRID_SNAP,SET_SNAP,SET_SCREEN_CONTEXT,CREATE_SHAPE,SET_STATUS} from "../actions/ScreenActions";

const initialState = {
    screenWidth:900,
    screenHeight:550,
    show:{grid:true},
    gridSnap:false,
    snap:{snapClass:null,snap:false},
    status:"FREE",
};
export function screenReducer(state = initialState,action) {
    switch (action.type) {
        case SET_GRID_VISIBLE:
            return{...state,show:{grid:action.payload}};
        case SET_GRID_SNAP:
            return{...state,gridSnap:action.payload};
        case SET_SNAP:
            return{...state,snap:action.payload};
        case SET_SCREEN_CONTEXT:
            return{...state,context:action.payload};
        case CREATE_SHAPE:
            return{...state,status:"CREATE",creator:action.payload};
        case SET_STATUS:
            return{...state,status:action.payload,creator:action.creator};
        default:
            return state
    }
}