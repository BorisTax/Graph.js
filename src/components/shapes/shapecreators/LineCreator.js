import LineShape from '../LineShape';
import ShapeStyle from '../ShapeStyle';
import {Line,Coord2D} from "../../../utils/geometry";
import ShapeBuilder from './ShapeBuilder';
export default class LineCreator extends ShapeBuilder{
    static caption="Segment line";
    constructor(style=ShapeStyle.getDefault(),screenOuterCircle){
        super(screenOuterCircle)
        this.name="LineCreator"
        this.line=new Line(new Coord2D(),new Coord2D());
        this.points=[new Coord2D(),new Coord2D()];
        this.shape=new LineShape(this.line);
        this.style=style;
        this.shape.setStyle(style);
        this.helperShapes=[];
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i>0)this.line=new Line(this.points[0],this.points[1]);
        this.shape=new LineShape(this.line);
        this.shape.setStyle(this.style);
    }

    reset(){return new LineCreator(new ShapeStyle(this.style.getColor(),this.style.getType()),this.screenOuterCircle);}
}
