import FunctionPolarShape from '../FunctionPolarShape';
import ShapeStyle from '../ShapeStyle';
import {Coord2D} from "../../../utils/geometry";
import ShapeBuilder from './ShapeBuilder';
export default class FunctionPolarCreator extends ShapeBuilder{
    static caption="FunctionPolar";
    constructor(style=ShapeStyle.getDefault(),screenOuterCircle){
        super(screenOuterCircle)
        this.name="FunctionPolarCreator"
        //this.line=new Line(new Coord2D(),new Coord2D());
        this.points=[new Coord2D()];
        this.shape=new FunctionPolarShape("a");
        this.style=style;
        this.shape.setStyle(style);
        this.helperShapes=[];
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        //this.shape=new FunctionShape(this.model);
        //this.shape.setStyle(this.style);
    }

    reset(){return new FunctionPolarCreator(new ShapeStyle(this.style.getColor(),this.style.getType()),this.screenOuterCircle);}
}
