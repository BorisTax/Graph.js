import {Circle,Line,Coord2D} from "../../utils/geometry/geometry";
import CircleShape from "./CircleShape";
import LineShape from "./LineShape";
import Geometry from "../../utils/geometry/geometry";
import ShapeStyle from "./ShapeStyle";
import {Color} from '../colors';
import Screen from '../Screen';
export default class CircleCRCreator {
    constructor(style=new ShapeStyle(Color.BLACK,ShapeStyle.SOLID)){
        this.points=new Array(2);
        this.circle=new Circle(new Coord2D(),0);
        this.boundedCircle=new Circle();
        this.helperShapes = [];
        this.shape=new CircleShape(this.circle);
        this.radiusLine=new Line(this.circle.center,this.circle.center);
        this.helperShapes.push(new LineShape(this.radiusLine));
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.style=style;
        this.shape.setStyle(style);
        this.helperShapes[0].setStyle(new ShapeStyle(Color.GRAY,ShapeStyle.DASH));
        this.helperShapes[1].setStyle(new ShapeStyle(Color.BLUE,ShapeStyle.SOLID));
        this.helperShapes[2].setStyle(new ShapeStyle(Color.BLUE,ShapeStyle.SOLID));
        this.i=0;
    }
    isNext(){
        return (this.i<this.points.length);
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i==0)this.points[1]=this.points[0];
        if(this.i>0)this.circle=new Circle(this.points[0], Geometry.distance(this.points[0],this.points[this.i]));
        this.radiusLine=new Line(this.points[0],this.points[this.i]);
        this.shape=new CircleShape(this.circle);
        this.helperShapes[0]=new LineShape(this.radiusLine);
        this.shape.setStyle(this.style);
        this.helperShapes[0].setStyle(new ShapeStyle(Color.GRAY,ShapeStyle.DASH));
        this.setControlPoints();
    }
    next(){
        if(!this.isNext()) return;
        this.i++;
    }
    getShape(){
        return this.shape;
    }
    setControlPoints(){
        this.helperShapes[1]=new CircleShape(new Circle(this.points[0],this.boundedCircle.radius*Screen.MARKER_SIZE));
        this.helperShapes[2]=new CircleShape(new Circle(this.points[1],this.boundedCircle.radius*Screen.MARKER_SIZE));
        this.helperShapes[1].setStyle(new ShapeStyle(Color.BLUE,ShapeStyle.SOLID));                     
        this.helperShapes[2].setStyle(new ShapeStyle(Color.BLUE,ShapeStyle.SOLID));
    }
    getHelperShapes(){
        return this.helperShapes;
    }
    setNextPoint(p){
        this.setCurrent(p);
        this.i++;
    }
    reset(){return new CircleCRCreator(this.style);}
    refresh(boundedCircle){
        this.boundedCircle=boundedCircle;
        if(this.points[this.i]!=null) this.setControlPoints();
    }
    setStyle(style){
        this.style=style;
    }
    getPointDescription(){
        let s="";
        if (this.i==0) s="center point";else s="radiusLine";

        return "Select "+s;
    }
    getShapeDescription(){
        return "Circle";
    }
}