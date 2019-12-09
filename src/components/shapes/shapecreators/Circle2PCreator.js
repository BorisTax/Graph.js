import {Circle,Line,Coord2D} from "../../../utils/geometry";
import CircleShape from "../CircleShape";
import LineShape from "../LineShape";
import Geometry from "../../../utils/geometry";
import ShapeStyle from "../ShapeStyle";
import {Color} from '../../colors';
import Screen from '../../Screen';
import AbstractCreator from "./AbstractCreator";
export default class Circle2PCreator extends AbstractCreator{
     static caption="Circle by 2 points";
     constructor(style,boundedCircle){
        super(boundedCircle)
        this.name="Circle2PCreator"
        this.style=style;
        this.circle=new Circle(new Coord2D(),0);
        this.shape=new CircleShape(this.circle);
        this.shape.setStyle(style);
        this.helperShapes = [];
        this.diamLine=new Line(this.circle.center,this.circle.center);
        this.helperShapes.push(new LineShape(this.diamLine));
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.helperShapes[0].setStyle(new ShapeStyle(Color.gray,ShapeStyle.DASH));
        this.helperShapes[1].setStyle(new ShapeStyle(Color.blue,ShapeStyle.SOLID));
        this.helperShapes[2].setStyle(new ShapeStyle(Color.blue,ShapeStyle.SOLID));
        this.points=new Array(2);
    }
    
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i>0) this.circle=new Circle(Geometry.midPoint(this.points[0],this.points[1]),Geometry.distance(this.points[0],this.points[1])/2);
        this.diamLine =new Line(this.points[0],this.points[this.i]);
        this.shape=new CircleShape(this.circle);
        this.shape.setStyle(this.style);
        this.setControlPoints();
    }
    setControlPoints(){
        this.helperShapes[0]=new LineShape(this.diamLine);
        this.helperShapes[1]=new CircleShape(new Circle(this.points[0],this.boundedCircle.radius* Screen.MARKER_SIZE));
        this.helperShapes[2]=new CircleShape(new Circle(this.points[1],this.boundedCircle.radius* Screen.MARKER_SIZE));
        this.helperShapes[0].setStyle(new ShapeStyle(Color.GRAY,ShapeStyle.DASH));
        this.helperShapes[1].setStyle(new ShapeStyle(Color.POINT_MARKER,ShapeStyle.SOLID));
        this.helperShapes[2].setStyle(new ShapeStyle(Color.POINT_MARKER,ShapeStyle.SOLID));
    }
    reset(){return new Circle2PCreator(new ShapeStyle(this.style.getColor(),this.style.getType()),this.boundedCircle);}
    
}