export const CREATE_SHAPE='CREATE_SHAPE';
export function createShape(shapeCreator) {
    return {
        type: CREATE_SHAPE,
        payload: shapeCreator,
    }
}
