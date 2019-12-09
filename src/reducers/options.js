import {SET_LANGUAGE} from "../actions/AppActions";

import {captions} from '../locale/eng';
const keys=[
    {ctrlKey:true,shiftKey:false,altKey:false,keyCode:65,action:"selectAll",param:null},
    {ctrlKey:false,shiftKey:false,altKey:false,keyCode:46,action:"deleteConfirm",param:null},
    {ctrlKey:false,shiftKey:false,altKey:false,keyCode:67,action:"centerToPoint",param:{x:0,y:0}},
    {ctrlKey:false,shiftKey:false,altKey:false,keyCode:27,action:"cancelSelection",param:null},
]
const initialState={captions:captions,keyDownHandler:keys}
export function optionsReducer(state=initialState,action) {
    switch (action.type) {
        case SET_LANGUAGE:
            document.title=action.payload.title;
            return{...state,captions:action.payload};
        default:
            return state
    }
}