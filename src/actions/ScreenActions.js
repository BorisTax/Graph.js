export const SET_GRID_VISIBLE = 'SET_GRID_VISIBLE';
export const SET_GRID_SNAP = 'SET_GRID_SNAP';
export const SET_BOUNDED_CIRCLE='SET_BOUNDED_CIRCLE';
export const SET_SCREEN_CONTEXT='SET_SCREEN_CONTEXT';
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
export function setBoundedCircle(circle) {
    return {
        type: SET_BOUNDED_CIRCLE,
        payload: circle,
    }
}
export function setScreenContext(context) {
    return {
        type: SET_SCREEN_CONTEXT,
        payload: context,
    }
}