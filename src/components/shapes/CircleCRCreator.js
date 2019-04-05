import {Circle,Line,Coord2D} from "../../utils/geometry/geometry";
import CircleShape from "./CircleShape";
import LineShape from "./LineShape";
import Geometry from "../../utils/geometry/geometry";
import ShapeStyle from "./ShapeStyle";
export default class CircleCRCreator {
    constructor(style){
        this.circle=new Circle(new Coord2D(),0);
        this.shape=[];
        this.helperShape= [];
        this.shape.push(new CircleShape(this.circle));
        this.radius=new Line(this.circle.center,this.circle.center);
        this.helperShape.push(new LineShape(this.radius));
        this.style=style;
        this.shape[0].setStyle(style);
        this.helperShape[0].setStyle(new ShapeStyle("gray",ShapeStyle.DASH));
        this.i=0;
        this.points=new Array(2);
    }
    isNext(){
        return (this.i<this.points.length);
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i>0)this.circle=new Circle(this.points[0], Geometry.distance(this.points[0],this.points[this.i]));
        this.radius=new Line(this.points[0],this.points[this.i]);
        this.shape[0]=new CircleShape(this.circle);
        this.helperShape[0]=new LineShape(this.radius);
        this.shape[0].setStyle(this.style);
        this.helperShape[0].setStyle(new ShapeStyle("gray",ShapeStyle.DASH));
    }
    next(){
        if(!this.isNext()) return;
        this.i++;
    }
    getShapes(){
        return this.shape;
    }
    getHelperShapes(){
        return this.helperShape;
    }
    setNextPoint(p){
        this.setCurrent(p);
        this.i++;
    }
    reset(){return new CircleCRCreator(this.style);}
    setStyle(style){
        this.style=style;
    }
    getPointDescription(){
        let s="";
        if (this.i==0) s="center point";else s="radius";

        return "Select "+s;
    }
    getShapeDescription(){
        return "Circle";
    }
}