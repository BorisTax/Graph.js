import Screen from '../components/Screen';
export const SET_GRID_VISIBLE = 'SET_GRID_VISIBLE';
export const SET_GRID_SNAP = 'SET_GRID_SNAP';
export const SET_SNAP = 'SET_SNAP';
export const SET_SCREEN_CONTEXT='SET_SCREEN_CONTEXT';
export const CREATE_SHAPE='CREATE_SHAPE';
export const SELECT_SHAPE='SELECT_SHAPE';
export const SELECT_ALL='SELECT_ALL';
export const DELETE_SELECTED_SHAPES='DELETE_SELECTED_SHAPES';
export const ADD_SHAPE='ADD_SHAPE';
export const CENTER_TO_POINT='CENTER_TO_POINT';
export const SET_STATUS='SET_STATUS';
export const SET_CYCLIC_FLAG='SET_CYCLIC_FLAG';
export const SET_TOP_LEFT='SET_TOP_LEFT';
export const SET_SELECTION_TYPE='SET_SELECTION_TYPE';
export const SET_PICKED_DATA='SET_PICKED_DATA';
export const FIX_PICKED_DATA='FIX_PICKED_DATA';
export const START_PICKING='START_PICKING';
export function setTopLeft(p){
    return {
        type:SET_TOP_LEFT,
        payload:p
    }
}
export function startPicking(id,picker){
    return{
        type:START_PICKING,
        payload:{id,picker}
    }
}
export function fixPickedData(fix){
    return{
        type:FIX_PICKED_DATA,
        payload:fix
    }
}
export function setPickedData(data){
    return{
        type:SET_PICKED_DATA,
        payload:data
    }
}
export function setCyclicFlag(flag) {
    return {
        type: SET_CYCLIC_FLAG,
        payload: flag,
    }
}
export function setSelectionType(selType) {
    return {
        type: SET_SELECTION_TYPE,
        payload: selType,
    }
}
export function setGridVisible(visible) {
    return {
        type: SET_GRID_VISIBLE,
        payload: visible,
    }
}
export function setGridSnap(snap) {
    return {
        type: SET_GRID_SNAP,
        payload: snap,
    }
}
export function setSnap(snapClass,snap) {
    return {
        type: SET_SNAP,
        payload: {snapClass:snapClass,snap:snap},
    }
}
export function setScreenContext(context) {
    return {
        type: SET_SCREEN_CONTEXT,
        payload: context,
    }
}
export function createNewShape(creator){
    return {
        type: CREATE_SHAPE,
        payload:creator,
    }
}
export function selectShapes(selectedShapes) {
    return {
        type: SELECT_SHAPE,
        payload: selectedShapes,
    }
}
export function selectAll() {
    return {
        type: SELECT_ALL
    }
}

export function deleteSelectedShapes(ask) {
    return {
        type: DELETE_SELECTED_SHAPES,
        payload:{ask}
    }
}
export function addShape(shape){
    return {
        type:ADD_SHAPE,
        payload:shape
    }
}
export function centerToPoint(action){
    return {
        type:CENTER_TO_POINT,
        payload:{do:action.do,point:action.point}
    }
}

export function setScreenStatus(status=Screen.STATUS_FREE,params){
    return {
        type: SET_STATUS,
        payload:{status,params}
    }
}