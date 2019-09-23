import Screen from '../components/Screen';
import {STATUS_FREE,STATUS_SELECT,STATUS_CREATE,STATUS_DRAWING,STATUS_CANCEL,STATUS_PAN,STATUS_PICK} from '../reducers/screen';
import DragCursor from '../components/shapes/cursors/DragCursor';
export const ADD_SHAPE = 'ADD_SHAPE';
export const CANCEL = 'CANCEL';
export const CENTER_TO_POINT = 'CENTER_TO_POINT';
export const CREATE_SHAPE = 'CREATE_SHAPE';
export const DELETE_CONFIRM='DELETE_CONFIRM'
export const DELETE_SELECTED_SHAPES = 'DELETE_SELECTED_SHAPES';
export const PAN_SCREEN = 'PAN_SCREEN';
export const PICK = 'PICK';
export const REFRESH_SHAPE_MANAGER = 'REFRESH_SHAPE_MANAGER';
export const REFRESH_SNAP_MARKERS = 'REFRESH_SNAP_MARKERS';
export const REPAINT = 'REPAINT';
export const SELECT_ALL = 'SELECT_ALL';
export const SELECT_SHAPE = 'SELECT_SHAPE';
export const SET_BOUNDED_CIRCLE = 'SET_BOUNDED_CIRCLE';
export const SET_CUR_COORD = 'SET_CUR_COORD';
export const SET_CYCLIC_FLAG = 'SET_CYCLIC_FLAG';
export const SET_DIMENSIONS = 'SET_DIMENSIONS';
export const SET_GRID_SNAP = 'SET_GRID_SNAP';
export const SET_GRID_VISIBLE = 'SET_GRID_VISIBLE';
export const SET_PICKED_DATA = 'SET_PICKED_DATA';
export const SET_PREV_STATUS = 'SET_PREV_STATUS';
export const SET_RATIO = 'SET_RATIO';
export const SET_REAL_WIDTH = 'SET_REAL_WIDTH';
export const SET_SCALE = 'SET_SCALE';
export const SET_SCREEN_CONTEXT = 'SET_SCREEN_CONTEXT';
export const SET_SELECTION_TYPE = 'SET_SELECTION_TYPE';
export const SET_SNAP = 'SET_SNAP';
export const SET_STATUS = 'SET_STATUS';
export const SET_TOP_LEFT = 'SET_TOP_LEFT';
export const START_PICKING = 'START_PICKING';
export const START_SELECTION = 'START_SELECTION';

export function addShape(shape){
    return {
        type:ADD_SHAPE,
        payload:shape
    }
}
export function cancel(){
    return{
        type:CANCEL
    }
}
export function centerToPoint(p){
    return {
        type:CENTER_TO_POINT,
        payload:p
    }
}
export function createNewShape(creator){
    return {
        type: CREATE_SHAPE,
        payload:creator,
    }
}
export function deleteConfirm() {
    return {
        type: DELETE_CONFIRM,
    }
}
export function deleteSelectedShapes() {
    return {
        type: DELETE_SELECTED_SHAPES,
    }
}
export function refreshShapeManager(){
    return{
        type:REFRESH_SHAPE_MANAGER
    }
}
export function refreshSnapMarkers(){
    return{
        type:REFRESH_SNAP_MARKERS
    }
}
export function repaint(){
    return{
        type:REPAINT
    }
}
export function selectAll() {
    return {
        type: SELECT_ALL
    }
}
export function selectShapes(selectedShapes) {
    return {
        type: SELECT_SHAPE,
        payload: selectedShapes,
    }
}
export function setBoundedCircle(){
    return{
        type:SET_BOUNDED_CIRCLE
    }
}
export function setCurCoord(coord) {
    return {
        type: SET_CUR_COORD,
        payload: coord,
    }
}
export function setCyclicFlag(flag) {
    return {
        type: SET_CYCLIC_FLAG,
        payload: flag,
    }
}
export function setDimensions(width,height,realWidth,topLeft){
    return{
        type:SET_DIMENSIONS,
        payload:{width,height,realWidth,topLeft}
    }
}
export function setGridSnap(snap) {
    return {
        type: SET_GRID_SNAP,
        payload: snap,
    }
}
export function setGridVisible(visible) {
    return {
        type: SET_GRID_VISIBLE,
        payload: visible,
    }
}
export function setPickedData(data){
    return{
        type:SET_PICKED_DATA,
        payload:data
    }
}
export function setPrevStatus(){
    return{
        type:SET_PREV_STATUS,
    }
}
export function setRatio(ratio){
    return{
        type:SET_RATIO,
        payload:ratio
    }
}
export function setRealWidth(width){
    return{
        type:SET_REAL_WIDTH,
        payload:width
    }
}
export function setScale(scale,anchor){
    return{
        type:SET_SCALE,
        payload:{scale,anchor}
    }
}
export function setScreenContext(context) {
    return {
        type: SET_SCREEN_CONTEXT,
        payload: context,
    }
}
export function setScreenStatus(status=Screen.STATUS_FREE,params){
    let payload=null;
    let type=null;
    switch(status){
        case STATUS_SELECT:
            type=START_SELECTION;
            break;
        case STATUS_CREATE:
            type=CREATE_SHAPE;
            payload={creator:params.creator}
            break;
        case STATUS_CANCEL:
            type=CANCEL;
            break;
        case STATUS_PAN:
            type=PAN_SCREEN;
        break;
        case STATUS_PICK:
            type=PICK;
            payload={picker:params.picker}
            break;
        default:
    }
    return {
        type,
        payload
    }
}
export function setSelectionType(selType) {
    return {
        type: SET_SELECTION_TYPE,
        payload: selType,
    }
}
export function setSnap(snapClass,snap) {
    const type=snapClass==='grid'?SET_GRID_SNAP:SET_SNAP
    const payload=snapClass==='grid'?snap:{snapClass:snapClass,snap:snap}
    return {
        type: type,
        payload: payload,
    }
}
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








