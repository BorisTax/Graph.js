import options from '../config'
export const AppActions={
    SET_LANGUAGE:'SET_LANGUAGE',
    REQUEST_LANGUAGE:'REQUEST_LANGUAGE',
    SHOW_HELP:'SHOW_HELP',
    SHOW_CONFIRM:'SHOW_CONFIRM',
    SHOW_ALERT:'SHOW_ALERT',
}

export function setLanguage(captions) {
    return {
        type: AppActions.SET_LANGUAGE,
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
        type:AppActions.SHOW_HELP,
        payload:show
    }
}
export function showConfirm(show,messageKey,okAction){
    return {
        type:AppActions.SHOW_CONFIRM,
        payload:{show,messageKey,okAction}
    }
}
export function showAlert(show,messageKey){
    return {
        type:AppActions.SHOW_ALERT,
        payload:{show,messageKey}
    }
}
export function blink(){
    const form=document.querySelector('.modalContainer > .toolBar')
    const oldColor=form.style.backgroundColor
    var count=0
    const int=setInterval(()=>{
        if(form.style.backgroundColor===oldColor)form.style.backgroundColor='red'; 
            else form.style.backgroundColor=oldColor
        if(++count>3) {clearInterval(int);form.style.backgroundColor=oldColor}
    },40)
}

