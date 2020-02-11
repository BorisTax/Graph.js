import { Color } from "../colors";

export default class ShapeStyle {
    static DASH=[1,3];
    static SOLID=[0];
    static SELECTION=[1,1];
    static HelperShape=new ShapeStyle(Color.GRAY,ShapeStyle.DASH);
    constructor(color=Color.BLACK,stroke=ShapeStyle.SOLID,width=1){
        this.color=color;
        this.originColor=this.color;
        this.width=width;
        this.type=stroke;
        switch(stroke){
            case ShapeStyle.DASH:
                this.stroke=[1,3];
                break;
            case ShapeStyle.SOLID:
                this.stroke=[0];
                break;
            case ShapeStyle.SELECTION:
                this.stroke=[1,1];
                break;
            default:
        }
    }
    getDefault(){
        return new ShapeStyle(Color.BLACK,ShapeStyle.SOLID);
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