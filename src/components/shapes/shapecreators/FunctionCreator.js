import FunctionShape from '../FunctionShape';
import ShapeStyle from '../ShapeStyle';
import {Coord2D} from "../../../utils/geometry";
import ShapeBuilder from './ShapeBuilder';
export default class FunctionCreator extends ShapeBuilder{
    static caption="Function";
    constructor(style=ShapeStyle.getDefault(),screenOuterCircle){
        super(screenOuterCircle)
        this.name="FunctionCreator"
        //this.line=new Line(new Coord2D(),new Coord2D());
        this.points=[new Coord2D()];
        this.shape=new FunctionShape({func:"x*x"});
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

    reset(){return new FunctionCreator(new ShapeStyle(this.style.getColor(),this.style.getType()),this.screenOuterCircle);}
}
