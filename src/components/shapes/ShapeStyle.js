
export default class ShapeStyle {
    static DASH=[1,3];
    static SOLID=[0];
    constructor(color,stroke){
        this.color=color;
        this.stroke=stroke;
    }
    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }

    getStroke() {
        return this.stroke;
    }

    setStroke(stroke) {
        this.stroke = stroke;
    }

}