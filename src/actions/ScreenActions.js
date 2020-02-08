import {Status} from '../reducers/screen';
export const ScreenActions={
    ADD_SHAPE : 'ADD_SHAPE',
    CANCEL : 'CANCEL',
    CANCEL_SELECTION : 'CANCEL_SELECTION',
    CENTER_TO_POINT : 'CENTER_TO_POINT',
    CREATE_SHAPE : 'CREATE_SHAPE',
    DELETE_CONFIRM:'DELETE_CONFIRM',
    DELETE_SELECTED_SHAPES : 'DELETE_SELECTED_SHAPES',
    PAN_SCREEN : 'PAN_SCREEN',
    PICK : 'PICK',
    REFRESH_SHAPE_MANAGER : 'REFRESH_SHAPE_MANAGER',
    REFRESH_SNAP_MARKERS : 'REFRESH_SNAP_MARKERS',
    REPAINT : 'REPAINT',
    SELECT_ALL : 'SELECT_ALL',
    SELECT_SHAPE : 'SELECT_SHAPE',
    SET_BOUNDED_CIRCLE : 'SET_BOUNDED_CIRCLE',
    SET_CUR_COORD : 'SET_CUR_COORD',
    SET_CYCLIC_FLAG : 'SET_CYCLIC_FLAG',
    SET_DIMENSIONS : 'SET_DIMENSIONS',
    SET_GRID_SNAP : 'SET_GRID_SNAP',
    SET_GRID_VISIBLE : 'SET_GRID_VISIBLE',
    SET_PICKED_DATA : 'SET_PICKED_DATA',
    SET_PREV_STATUS : 'SET_PREV_STATUS',
    SET_RATIO : 'SET_RATIO',
    SET_REAL_WIDTH : 'SET_REAL_WIDTH',
    SET_SCALE : 'SET_SCALE',
    SET_SCREEN_CONTEXT : 'SET_SCREEN_CONTEXT',
    SET_SELECTION_TYPE : 'SET_SELECTION_TYPE',
    SET_SNAP : 'SET_SNAP',
    SET_STATUS : 'SET_STATUS',
    SET_TOP_LEFT : 'SET_TOP_LEFT',
    START_PICKING : 'START_PICKING',
    START_SELECTION : 'START_SELECTION',
}

export function addShape(shape){
    return {
        type:ScreenActions.ADD_SHAPE,
        payload:shape
    }
}
export function cancel(){
    return{
        type:ScreenActions.CANCEL
    }
}
export function cancelSelection(){
    return{
        type:ScreenActions.CANCEL_SELECTION
    }
}
export function centerToPoint(p){
    return {
        type:ScreenActions.CENTER_TO_POINT,
        payload:p
    }
}
export function createNewShape(creator){
    return {
        type: ScreenActions.CREATE_SHAPE,
        payload:creator,
    }
}
export function deleteConfirm() {
    return {
        type: ScreenActions.DELETE_CONFIRM,
    }
}
export function deleteSelectedShapes() {
    return {
        type: ScreenActions.DELETE_SELECTED_SHAPES,
    }
}
export function refreshShapeManager(){
    return{
        type:ScreenActions.REFRESH_SHAPE_MANAGER
    }
}
export function refreshSnapMarkers(){
    return{
        type:ScreenActions.REFRESH_SNAP_MARKERS
    }
}
export function repaint(){
    return{
        type:ScreenActions.REPAINT
    }
}
export function selectAll() {
    return {
        type: ScreenActions.SELECT_ALL
    }
}
export function selectShapes(selectedShapes) {
    return {
        type: ScreenActions.SELECT_SHAPE,
        payload: selectedShapes,
    }
}
export function setBoundedCircle(){
    return{
        type:ScreenActions.SET_BOUNDED_CIRCLE
    }
}
export function setCurCoord(coord) {
    return {
        type: ScreenActions.SET_CUR_COORD,
        payload: coord,
    }
}
export function setCyclicFlag(flag) {
    return {
        type: ScreenActions.SET_CYCLIC_FLAG,
        payload: flag,
    }
}
export function setDimensions(width,height,realWidth,topLeft){
    return{
        type:ScreenActions.SET_DIMENSIONS,
        payload:{width,height,realWidth,topLeft}
    }
}
export function setGridSnap(snap) {
    return {
        type: ScreenActions.SET_GRID_SNAP,
        payload: snap,
    }
}
export function setGridVisible(visible) {
    return {
        type: ScreenActions.SET_GRID_VISIBLE,
        payload: visible,
    }
}
export function setPickedData(data){
    return{
        type:ScreenActions.SET_PICKED_DATA,
        payload:data
    }
}
export function setPrevStatus(){
    return{
        type:ScreenActions.SET_PREV_STATUS,
    }
}
export function setRatio(ratio){
    return{
        type:ScreenActions.SET_RATIO,
        payload:ratio
    }
}
export function setRealWidth(width){
    return{
        type:ScreenActions.SET_REAL_WIDTH,
        payload:width
    }
}
export function setScale(scale,anchor){
    return{
        type:ScreenActions.SET_SCALE,
        payload:{scale,anchor}
    }
}
export function setScreenContext(context) {
    return {
        type: ScreenActions.SET_SCREEN_CONTEXT,
        payload: context,
    }
}
export function setScreenStatus(status=Status.FREE,params){
    let payload=null;
    let type=null;
    switch(status){
        case Status.SELECT:
            type=ScreenActions.START_SELECTION;
            break;
        case Status.CREATE:
            type=ScreenActions.CREATE_SHAPE;
            payload={creator:params.creator}
            break;
        case Status.CANCEL:
            type=ScreenActions.CANCEL;
            break;
        case Status.PAN:
            type=ScreenActions.PAN_SCREEN;
        break;
        case Status.PICK:
            type=ScreenActions.PICK;
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
        type: ScreenActions.SET_SELECTION_TYPE,
        payload: selType,
    }
}
export function setSnap(snapClass,snap) {
    const type=snapClass==='grid'?ScreenActions.SET_GRID_SNAP:ScreenActions.SET_SNAP
    const payload=snapClass==='grid'?snap:{snapClass:snapClass,snap:snap}
    return {
        type: type,
        payload: payload,
    }
}
export function setTopLeft(p){
    return {
        type:ScreenActions.SET_TOP_LEFT,
        payload:p
    }
}
export function startPicking(id,picker){
    return{
        type:ScreenActions.START_PICKING,
        payload:{id,picker}
    }
}








