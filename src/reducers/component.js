
import {SET_BUTTON_ID} from "../actions/ComponentActions";

export function componentReducer(state={},action) {
    switch (action.type) {
        case SET_BUTTON_ID:
            return{...state,buttonId:action.payload};
        default:
            return state
    }
}