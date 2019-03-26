import {SET_GRID_VISIBLE,SET_GRID_SNAP} from "../actions/ScreenActions";

const initialState = {
    screenWidth:550,
    screenHeight:550,
    show:{grid:true},
    snap:{grid:false},
}
export function screenReducer(state = initialState,action) {
    switch (action.type) {
        case SET_GRID_VISIBLE:
            return{...state,show:{grid:action.payload}};
        case SET_GRID_SNAP:
            return{...state,snap:{grid:action.payload}};
        default:
            return state
    }
}