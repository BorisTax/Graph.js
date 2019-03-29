import {SET_LANG} from "../actions/AppActions";

export function optionsReducer(state={},action) {
    switch (action.type) {
        case SET_LANG:
            return{...state,captions:action.payload};
        default:
            return state
    }
}