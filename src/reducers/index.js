import {combineReducers} from "redux";
import {shapeReducer} from "./shapes";
import {screenReducer} from "./screen";

export const rootReducer=combineReducers({
    shapes:shapeReducer,
    screen:screenReducer,
})