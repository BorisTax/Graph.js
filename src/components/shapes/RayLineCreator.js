import RayLineShape from './RayLineShape';
import CircleShape from './CircleShape';
import ShapeStyle from './ShapeStyle';
import {RayLine, Coord2D, Circle} from "../../utils/geometry/geometry";
import {Color} from '../colors';
import Screen from '../Screen';
export default class RayLineCreator{
    constructor(style){
        this.i=0;
        this.line=new RayLine(new Coord2D(),new Coord2D());
        this.points=new Array(2);
        this.boundedCircle=new Circle();
        this.shape=[];
        this.shape.push(new RayLineShape(this.line));
        this.style=style||new ShapeStyle(Color.BLACK,ShapeStyle.SOLID);
        this.shape[0].setStyle(style);
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
        if(this.i==0)this.points[1]=this.points[0];
        if(this.i>0) this.line=new RayLine(...this.points);
        this.shape[0]=new RayLineShape(this.line,this.boundedCircle);
        this.shape[0].setStyle(this.style);
        this.setControlPoints();
    }
    next(){
        if(!this.isNext()) return;
        this.i++;
    }
    getShapes(){
        return this.shape;
    }
    getHelperShapes(){
        return this.helperShapes;
    }
    setNextPoint(p){
        this.points[this.i++]=p;
    }
    reset(){return new RayLineCreator(this.style);}
    refresh(boundedCircle){
        this.boundedCircle=boundedCircle;
        if(this.points[this.i]!=null) this.setControlPoints();
    }
    getPointDescription(){
        let s="";
        if (this.i===0) s="origin";else s="second";
        return "Select "+s+" point";
    }
    getShapeDescription(){
        return "Ray line";
    }

}