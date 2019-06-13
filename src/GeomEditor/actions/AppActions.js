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
        fetch('/lang',{method:'POST',
                       body:JSON.stringify({lang:lang}),
                       headers: {'Content-Type': 'application/json'}
                        })
            .then(res => res.json())
            .then(capt => dispatch(setLanguage(capt)))
            .catch(e => {
                console.error(e)
            });
    }

}
