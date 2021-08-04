import FunctionParamShape from '../FunctionParamShape';
import ShapeStyle from '../ShapeStyle';
import {Coord2D} from "../../../utils/geometry";
import ShapeBuilder from './ShapeBuilder';
export default class FunctionParamCreator extends ShapeBuilder{
    static caption="FunctionParam";
    constructor(style=ShapeStyle.getDefault(),screenOuterCircle){
        super(screenOuterCircle)
        this.name="FunctionParamCreator"
        //this.line=new Line(new Coord2D(),new Coord2D());
        this.points=[new Coord2D()];
        this.shape=new FunctionParamShape({yfunc:"3.6*(cos(t)+cos(3.6*t)/2.6)",xfunc:"3.6*(sin(t)-sin(3.6*t)/2.6)",angle:3600});
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

    reset(){return new FunctionParamCreator(new ShapeStyle(this.style.getColor(),this.style.getType()),this.screenOuterCircle);}
}
