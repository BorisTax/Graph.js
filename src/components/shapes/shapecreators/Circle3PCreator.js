import {Circle,Triangle,Coord2D} from "../../../utils/geometry/geometry";
import CircleShape from "../CircleShape";
import TriangleShape from "../TriangleShape";
import ShapeStyle from "../ShapeStyle";
import {Color} from '../../colors';
import Screen from '../../Screen';
export default class Circle3PCreator{
    static caption="Circle by 3 points";
    constructor(style){
        this.style=style;
        this.circle=new Circle(new Coord2D(),0);
        this.shape=new CircleShape(this.circle);
        this.shape.setStyle(style);
        this.helperShapes = [];
        this.triangle =new Triangle();
        this.helperShapes.push(new TriangleShape(this.triangle));
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.helperShapes[0].setStyle(new ShapeStyle(Color.gray,ShapeStyle.DASH));
        this.helperShapes[1].setStyle(new ShapeStyle(Color.blue,ShapeStyle.SOLID));
        this.helperShapes[2].setStyle(new ShapeStyle(Color.blue,ShapeStyle.SOLID));
        this.helperShapes[3].setStyle(new ShapeStyle(Color.blue,ShapeStyle.SOLID));
        this.points=new Array(3);
        this.i=0;
    }
    isNext(){
        return (this.i<this.points.length);
    }
    setCurrent(point){

        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i==0)this.points[1]=this.points[0];
        if(this.i<2)this.points[2]=this.points[1];
        this.triangle=new Triangle(this.points);
        this.circle=this.triangle.getOuterCircle();
        this.shape=new CircleShape(this.circle);
        this.shape.setStyle(this.style);
        this.setControlPoints();
    }
    next(){
        if(!this.isNext()) return;
        this.i++;
    }
    getShape(){
        return this.shape;
    }
    getHelperShapes(){
        return this.helperShapes;
    }
    setNextPoint(p){
        this.setCurrent(p);
        this.i++;
    }
    setControlPoints(){
        this.helperShapes[0]=new TriangleShape(new Triangle(this.points));
        this.helperShapes[1]=new CircleShape(new Circle(this.points[0],this.boundedCircle.radius* Screen.MARKER_SIZE));
        this.helperShapes[2]=new CircleShape(new Circle(this.points[1],this.boundedCircle.radius* Screen.MARKER_SIZE));
        this.helperShapes[3]=new CircleShape(new Circle(this.points[2],this.boundedCircle.radius* Screen.MARKER_SIZE));
        this.helperShapes[0].setStyle(new ShapeStyle(Color.GRAY,ShapeStyle.DASH));
        this.helperShapes[1].setStyle(new ShapeStyle(Color.BLUE,ShapeStyle.SOLID));
        this.helperShapes[2].setStyle(new ShapeStyle(Color.BLUE,ShapeStyle.SOLID));
        this.helperShapes[3].setStyle(new ShapeStyle(Color.BLUE,ShapeStyle.SOLID));
    }
    reset(){return new Circle3PCreator(this.style);}
    refresh(boundedCircle){
        this.boundedCircle=boundedCircle;
        if(this.points[this.i]!=null) this.setControlPoints();
    }
    setStyle(style){
        this.style=style;
    }
    getPointDescription(){
        let s="";
        switch(this.i){
            case 0:s="first";break;
            case 1:s="second";break;
            case 2:s="third";
            default:
        }

        return "Select "+s+" point";
    }
    getShapeDescription(){
        return Circle3PCreator.caption;
    }
}