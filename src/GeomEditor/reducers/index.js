import {combineReducers} from "redux";
import {shapeReducer} from "./shapes";
import {screenReducer} from "./screen";
import {optionsReducer} from "./options";
import {componentReducer} from "./component";
import { userReducer } from "./user";

export const rootReducer=combineReducers({
    shapes:shapeReducer,
    screen:screenReducer,
    options:optionsReducer,
    user:userReducer,
    components:componentReducer,
});