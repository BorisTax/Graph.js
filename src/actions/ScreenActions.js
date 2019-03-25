export const SET_GRID_VISIBLE = 'SET_GRID_VISIBLE';
export function setGridVisible(visible) {

    return {
        type: SET_GRID_VISIBLE,
        payload: visible,
    }
}