import Screen from '../components/Screen';
export const SET_GRID_VISIBLE = 'SET_GRID_VISIBLE';
export const SET_GRID_SNAP = 'SET_GRID_SNAP';
export const SET_SNAP = 'SET_SNAP';
export const SET_SCREEN_CONTEXT='SET_SCREEN_CONTEXT';
export const CREATE_SHAPE='CREATE_SHAPE';
export const SET_STATUS='SET_STATUS';


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
export function setScreenStatus(status=Screen.STATUS_FREE,creator){
    return {
        type: SET_STATUS,
        payload:status,
        creator:creator,
    }
}