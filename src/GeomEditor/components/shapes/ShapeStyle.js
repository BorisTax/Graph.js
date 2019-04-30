
export default class ShapeStyle {
    static DASH=0;
    static SOLID=1;
    constructor(color,stroke,width=1){
        this.color=color;
        this.width=width;
        this.type=stroke;
        switch(stroke){
            case ShapeStyle.DASH:
                this.stroke=[1,3];
                break;
            case ShapeStyle.SOLID:
                this.stroke=[0];
                break;
            default:
        }
    }
    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }
    getType(){return this.type;}
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