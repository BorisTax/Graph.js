import {SET_LANGUAGE} from "../actions/AppActions";
import {captions} from '../locale/eng';

export function optionsReducer(state={captions:captions['ENG']},action) {
    switch (action.type) {
        case SET_LANGUAGE:
            return{...state,captions:action.payload};
        default:
            return state
    }
}