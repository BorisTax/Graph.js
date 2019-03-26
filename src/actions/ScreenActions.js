export const SET_GRID_VISIBLE = 'SET_GRID_VISIBLE';
export const SET_GRID_SNAP = 'SET_GRID_SNAP';
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