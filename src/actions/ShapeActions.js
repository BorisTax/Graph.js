export const ShapeActions={
    CREATE_SHAPE:'CREATE_SHAPE',
    SELECT_SHAPE:'SELECT_SHAPE',
    SET_PROPERTY:'SET_PROPERTY',
}
export function createShape(shapeCreator) {
    return {
        type: ShapeActions.CREATE_SHAPE,
        payload: shapeCreator,
    }
}
export function setProperty(prop){
    return {
        type:ShapeActions.SET_PROPERTY,
        payload:prop,
    }
}

