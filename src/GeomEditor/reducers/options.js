import {SET_LANGUAGE} from "../actions/AppActions";

import {captions} from '../locale/eng';
const keys=[
    {ctrlKey:true,shiftKey:false,altKey:false,keyCode:65,action:"selectAll",param:null},
    {ctrlKey:false,shiftKey:false,altKey:false,keyCode:46,action:"deleteSelectedShapes",param:null},
    {ctrlKey:false,shiftKey:false,altKey:false,keyCode:67,action:"centerToPoint",param:{do:true,point:{x:0,y:0}}},
]
export function optionsReducer(state={captions:captions,keyDownHandler:keys},action) {
    switch (action.type) {
        case SET_LANGUAGE:
            return{...state,captions:action.payload};
        default:
            return state
    }
}