import {captions} from '../locale/eng';
export const SET_LANGUAGE='SET_LANGUAGE';
export const REQUEST_LANGUAGE='REQUEST_LANGUAGE';

export function setLanguage(captions) {
    return {
        type: SET_LANGUAGE,
        payload: captions,
    }
}
export function requestLanguage(lang) {
    return dispatch=> {
        if(!true)
        fetch('./locale/lang.php?lang=' + lang)
            .then(res => res.json())
            .then(capt => dispatch(setLanguage(capt)))
            .catch(e => {
                console.error(e)
            });
        else dispatch(setLanguage(captions[lang]));
    }

}
