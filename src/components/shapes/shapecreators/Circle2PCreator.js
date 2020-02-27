import {Circle,Line,Coord2D} from "../../../utils/geometry";
import CircleShape from "../CircleShape";
import LineShape from "../LineShape";
import Geometry from "../../../utils/geometry";
import ShapeStyle from "../ShapeStyle";
import ShapeBuilder from "./ShapeBuilder";
export default class Circle2PCreator extends ShapeBuilder{
     static caption="Circle by 2 points";
     constructor(style,boundedCircle){
        super(boundedCircle)
        this.name="Circle2PCreator"
        this.style=style;
        this.circle=new Circle(new Coord2D(),0);
        this.shape=new CircleShape(this.circle);
        this.shape.setStyle(style);
        this.diamLine=new Line(this.circle.center,this.circle.center);
        this.helperShapes.push(new LineShape(this.diamLine));
        this.helperShapes[0].setStyle(ShapeStyle.HelperShape);
        this.points=new Array(2);
    }
    
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i>0) this.circle=new Circle(Geometry.midPoint(this.points[0],this.points[1]),Geometry.distance(this.points[0],this.points[1])/2);
        this.diamLine = new Line(this.points[0],this.points[this.i]);
        this.shape=new CircleShape(this.circle);
        this.shape.setStyle(this.style);
        this.helperShapes[0]=new LineShape(this.diamLine);
        this.helperShapes[0].setStyle(ShapeStyle.HelperShape);
    }
    reset(){return new Circle2PCreator(new ShapeStyle(this.style.getColor(),this.style.getType()),this.boundedCircle);}
}