import options from '../config'
export const SET_LANGUAGE='SET_LANGUAGE';
export const REQUEST_LANGUAGE='REQUEST_LANGUAGE';
export const SHOW_HELP='SHOW_HELP';
export const SHOW_CONFIRM='SHOW_CONFIRM';

export function setLanguage(captions) {
    return {
        type: SET_LANGUAGE,
        payload: captions,
    }
}
export function requestLanguage(lang) {
    return dispatch=> {
        fetch(options.devUrl+'/lang',{method:'POST',
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
export function showHelp(show){
    return {
        type:SHOW_HELP,
        payload:show
    }
}
export function showConfirm(show,messageKey,okAction){
    return {
        type:SHOW_CONFIRM,
        payload:{show,messageKey,okAction}
    }
}

