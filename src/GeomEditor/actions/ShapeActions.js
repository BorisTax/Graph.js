export const CREATE_SHAPE='CREATE_SHAPE';
export const SELECT_SHAPE='SELECT_SHAPE';
export const SET_PROPERTY='SET_PROPERTY';
export function createShape(shapeCreator) {
    return {
        type: CREATE_SHAPE,
        payload: shapeCreator,
    }
}
export function setProperty(prop){
    return {
        type:SET_PROPERTY,
        payload:prop,
    }
}

