export const CREATE_SHAPE='CREATE_SHAPE';
export const SELECT_SHAPE='SELECT_SHAPE';
export function createShape(shapeCreator) {
    return {
        type: CREATE_SHAPE,
        payload: shapeCreator,
    }

}

