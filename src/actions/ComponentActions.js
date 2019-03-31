export const SET_ACTIVE_BUTTON='SET_ACTIVE_BUTTON';
export const CLEAR_ACTIVE_BUTTON='CLEAR_ACTIVE_BUTTON';
export const SET_ACTIVE_CREATE_BUTTON='SET_ACTIVE_CREATE_BUTTON';
export const SET_ACTIVE_LANG_BUTTON='SET_ACTIVE_LANG_BUTTON';

export function setActiveButtonId(id) {
    return {
        type: SET_ACTIVE_BUTTON,
        payload: id,
    }
}
export function clearActiveButtonId(id) {
    return {
        type: CLEAR_ACTIVE_BUTTON,
        payload: id,
    }
}
export function setActiveCreateButtonId(id) {
    return {
        type: SET_ACTIVE_CREATE_BUTTON,
        payload: id,
    }
}
export function setActiveLangButtonId(id) {
    return {
        type: SET_ACTIVE_LANG_BUTTON,
        payload: id,
    }
}