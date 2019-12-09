export const SET_ACTIVE_SNAP_BUTTON='SET_ACTIVE_SNAP_BUTTON';
export const CLEAR_ACTIVE_SNAP_BUTTON='CLEAR_ACTIVE_SNAP_BUTTON';
export const SET_ACTIVE_CREATE_BUTTON='SET_ACTIVE_CREATE_BUTTON';
export const SET_ACTIVE_LANG_BUTTON='SET_ACTIVE_LANG_BUTTON';
export const SET_ACTIVE_SELECTION_BUTTON='SET_ACTIVE_SELECTION_BUTTON';
export function setActiveSnapButton(id) {
    return {
        type: SET_ACTIVE_SNAP_BUTTON,
        payload: id,
    }
}
export function clearActiveSnapButton(id) {
    return {
        type: CLEAR_ACTIVE_SNAP_BUTTON,
        payload: id,
    }
}
export function setActiveCreateButton(id) {
    return {
        type: SET_ACTIVE_CREATE_BUTTON,
        payload: id,
    }
}
export function setActiveSelectionButton(id) {
    return {
        type: SET_ACTIVE_SELECTION_BUTTON,
        payload: id,
    }
}
export function setActiveLangButton(id) {
    return {
        type: SET_ACTIVE_LANG_BUTTON,
        payload: id,
    }
}