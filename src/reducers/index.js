import {combineReducers} from "redux";
import {shapeReducer} from "./shapes";
import {modelReducer} from "./model";
import {optionsReducer} from "./options";
import {componentReducer} from "./component";
import { userReducer } from "./user";

export const rootReducer=combineReducers({
    shapes:shapeReducer,
    model:modelReducer,
    options:optionsReducer,
    user:userReducer,
    components:componentReducer,
});