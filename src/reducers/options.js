import {SET_LANGUAGE} from "../actions/AppActions";

export function optionsReducer(state={},action) {
    switch (action.type) {
        case SET_LANGUAGE:
            return{...state,captions:action.payload};
        default:
            return state
    }
}