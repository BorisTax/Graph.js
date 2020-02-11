import {Circle,Line,Coord2D} from "../../../utils/geometry";
import CircleShape from "../CircleShape";
import LineShape from "../LineShape";
import Geometry from "../../../utils/geometry";
import ShapeStyle from "../ShapeStyle";
import ShapeBuilder from "./ShapeBuilder";
export default class CircleCRCreator extends ShapeBuilder{
    static caption="Circle by center";
    constructor(style=ShapeStyle.getDefault(),boundedCircle){
        super(boundedCircle)
        this.name="CircleCRCreator"
        this.points=new Array(2);
        this.circle=new Circle(new Coord2D(),0);
        this.shape=new CircleShape(this.circle);
        this.radiusLine=new Line(this.circle.center,this.circle.center);
        this.helperShapes.push(new LineShape(this.radiusLine));
        this.style=style;
        this.shape.setStyle(style);
        this.helperShapes[0].setStyle(ShapeStyle.HelperShape);
    }

    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i>0)this.circle=new Circle(this.points[0], Geometry.distance(this.points[0],this.points[this.i]));
        this.radiusLine=new Line(this.points[0],this.points[this.i]);
        this.shape=new CircleShape(this.circle);
        this.helperShapes[0]=new LineShape(this.radiusLine);
        this.shape.setStyle(this.style);
        this.helperShapes[0].setStyle(ShapeStyle.HelperShape);
    }

    reset(){return new CircleCRCreator(new ShapeStyle(this.style.getColor(),this.style.getType()),this.boundedCircle);}
}