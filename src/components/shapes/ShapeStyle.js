
export default class ShapeStyle {
    static DASH=[1,3];
    static SOLID=[0];
    constructor(color,stroke,width=1){
        this.color=color;
        this.stroke=stroke;
        this.width=width;
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
    getWidth(){
        return this.width;
    }
    setWidth(width){
        this.width=width;
    }

}