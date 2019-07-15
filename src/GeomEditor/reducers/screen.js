import {SET_GRID_VISIBLE,SET_GRID_SNAP,SET_SNAP,SET_SCREEN_CONTEXT,CREATE_SHAPE,SELECT_SHAPE,DELETE_SELECTED_SHAPES,SET_STATUS, ADD_SHAPE} from "../actions/ScreenActions";
import {SET_PROPERTY}  from '../actions/ShapeActions';

const initialState = {
    screenWidth:550,
    screenHeight:550,
    show:{grid:true},
    gridSnap:false,
    snap:{snapClass:null,snap:false},
    status:"FREE",
    shapes:[],
    selectedShapes:[],
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
        case SELECT_SHAPE:
            return{...state,selectedShapes:action.payload};
        case DELETE_SELECTED_SHAPES:
            return{...state,shapes:state.shapes.filter((s)=>!s.getState().selected),selectedShapes:[]};
        case ADD_SHAPE:
            state.shapes.push(action.payload);
            return{...state};
        case SET_STATUS:
            return{...state,status:action.payload,creator:action.creator};
        case SET_PROPERTY:
            for(let shape of state.selectedShapes){
                if(shape.getProperties().has(action.payload.key)) shape.setProperty({key:action.payload.key,value:action.payload.value});
            }
            return{...state};
        default:
            return state
    }
}