export const SET_BUTTON_ID='SET_BUTTON_ID';

export function setButtonID(id) {
    return {
        type: SET_BUTTON_ID,
        payload: id,
    }
}