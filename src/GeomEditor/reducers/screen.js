import {SET_GRID_VISIBLE,SET_GRID_SNAP,SET_SNAP,SET_SCREEN_CONTEXT,CREATE_SHAPE, SET_SELECTION_TYPE, SET_TOP_LEFT, SET_PICKED_DATA, START_PICKING, FIX_PICKED_DATA, REPAINT} from "../actions/ScreenActions";
import {SELECT_SHAPE,DELETE_SELECTED_SHAPES,SET_STATUS, ADD_SHAPE, CENTER_TO_POINT, SELECT_ALL} from "../actions/ScreenActions";
import {SET_CYCLIC_FLAG} from "../actions/ScreenActions";
import {SET_PROPERTY}  from '../actions/ShapeActions';
export const STATUS_FREE='FREE';
export const STATUS_SELECT='SELECT';
export const STATUS_CREATE='CREATE';
export const STATUS_DRAWING='DRAWING';
export const STATUS_CANCEL='CANCEL';
export const STATUS_PAN='PAN';
export const STATUS_PICK='PICK';
const initialState = {
    screenWidth:550,
    screenHeight:550,
    repaint:0,//random number is used to rerender all components when it's changed
    show:{grid:true},
    gridSnap:false,
    snap:{snapClass:null,snap:false},
    pickedData:{data:null,editId:0,fix:false},
    topLeft:{x:-10,y:10},
    realWidth:0,realHeight:0,
    ratio:1,pixelRatio:1,
    marginTop:15,marginLeft:40,marginBottom:15,marginRight:10,
    cyclicCreation:false,
    selectionType:'crossSelect',
    status:STATUS_FREE,
    statusParams:{creator:null,picker:null},
    shapes:[],
    selectedShapes:[],
    centerPoint:{do:false,point:{x:0,y:0}}
};
export function screenReducer(state = initialState,action) {
    switch (action.type) {
        case REPAINT:
            return {...state,repaint:Math.random()}
        case START_PICKING:
            return {...state,status:STATUS_PICK,pickedData:{data:state.pickedData.data,editId:action.payload.id,picker:action.payload.picker}}
        case SET_PICKED_DATA:
            return {...state,pickedData:{data:action.payload,editId:state.pickedData.editId,picker:state.pickedData.picker}}
        case FIX_PICKED_DATA:
            return {...state,pickedData:{fix:action.payload,data:state.pickedData.data,editId:state.pickedData.editId,picker:state.pickedData.picker}}
        case SET_SELECTION_TYPE:
            return {...state,selectionType:action.payload}
        case SET_CYCLIC_FLAG:
            return {...state,cyclicCreation:action.payload}
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
        case SELECT_ALL:
            const selectedShapes=[];
            state.shapes.forEach((s,i)=>{
                        if(i>1){
                               s.setState({selected:true});
                               selectedShapes.push(s);
                            }});
            return{...state,selectedShapes};
        case DELETE_SELECTED_SHAPES:
            if(state.selectedShapes.length===0) {action.type='';return {...state}}//action.type='' - to prevent action propagation
            if(action.payload.ask) return {...state}
            return{...state,shapes:state.shapes.filter((s)=>!s.getState().selected),selectedShapes:[]};
        case ADD_SHAPE:
            state.shapes.push(action.payload);
            return{...state};
        case CENTER_TO_POINT:
            return{...state,centerPoint:{do:action.payload.do,point:action.payload.point}};
        case SET_TOP_LEFT:
            const topLeft=action.payload;
            const bottomRight={};
            bottomRight.x=topLeft.x+state.realWidth;
            bottomRight.y=topLeft.y-state.realHeight;
            return {...state,topLeft,bottomRight}
        case SET_STATUS:
            return{...state,status:action.payload.status,statusParams:action.payload.params};
        case SET_PROPERTY:
            for(let shape of state.selectedShapes){
                if(shape.getProperties().has(action.payload.key)) shape.setProperty({key:action.payload.key,value:action.payload.value});
            }
            return{...state};
        default:
            return state
    }
}