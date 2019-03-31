export const SET_LANGUAGE='SET_LANGUAGE';

export function setLanguage(captions) {
    return {
        type: SET_LANGUAGE,
        payload: captions,
    }
}
