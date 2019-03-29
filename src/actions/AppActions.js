export const SET_LANG='SET_LANG';

export function setLanguage(captions) {
    return {
        type: SET_LANG,
        payload: captions,
    }
}
