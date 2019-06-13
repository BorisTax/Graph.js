import SLineShape from '../SLineShape';
import CircleShape from '../CircleShape';
import ShapeStyle from '../ShapeStyle';
import {SLine,Coord2D, Circle} from "../../../utils/geometry";
import {Color} from '../../colors';
import Screen from '../../Screen';
export default class StraightLineCreator {
    static caption="Straight line";
    constructor(style){
        this.i=0;
        this.points=new Array(2);
        this.points[0]=new Coord2D();
        this.points[1]=new Coord2D();
        this.line=new SLine(0,0,0);
        this.shape=new SLineShape(this.line);
        this.style=style||new ShapeStyle(Color.BLACK,ShapeStyle.SOLID);
        this.shape.setStyle(style);
        this.helperShapes=[];
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
    }
    setControlPoints(){
        this.helperShapes[0]=new CircleShape(new Circle(this.points[0], this.boundedCircle.radius* Screen.MARKER_SIZE));
        this.helperShapes[1]=new CircleShape(new Circle(this.points[1], this.boundedCircle.radius* Screen.MARKER_SIZE));
        this.helperShapes[0].setColor(Color.BLUE);
        this.helperShapes[1].setColor(Color.BLUE);
    }
    isNext(){
        return (this.i<this.points.length);
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i>0) this.line=new SLine(...this.points);
        this.shape=new SLineShape(this.line);
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
        this.points[this.i++]=p;
    }
    reset(){return new StraightLineCreator(new ShapeStyle(this.style.getColor(),this.style.getType()));}
    refresh(boundedCircle){
        this.boundedCircle=boundedCircle;
        if(this.points[this.i]!=null) this.setControlPoints();
    }
    getPointDescription(){
        let s="";
        if (this.i===0) s="first";else s="second";
        return `Select ${s} point`;
    }
    getShapeDescription(){
        return "Straight line";
    }
}