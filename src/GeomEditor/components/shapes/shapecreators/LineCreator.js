import LineShape from '../LineShape';
import CircleShape from '../CircleShape';
import ShapeStyle from '../ShapeStyle';
import {Line,Coord2D,Circle} from "../../../utils/geometry/geometry";
import {Color} from '../../colors';
import Screen from '../../Screen';
export default class LineCreator{
    static caption="Segment line";
    constructor(style=new ShapeStyle(Color.BLACK,ShapeStyle.SOLID)){
        this.i=0;
        this.line=new Line(new Coord2D(),new Coord2D());
        this.boundedCircle=new Circle(new Coord2D(),0);
        this.points=[new Coord2D(),new Coord2D()];
        this.shape=new LineShape(this.line);
        this.style=style;
        this.shape.setStyle(style);
        this.helperShapes=[];
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
    }
    isNext(){
        return (this.i<this.points.length);
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i>0)this.line=new Line(this.points[0],this.points[1]);
        this.shape=new LineShape(this.line);
        this.shape.setStyle(this.style);
        this.setControlPoints();
    }
    setControlPoints(){
        this.helperShapes[0]=new CircleShape(new Circle(this.points[0],this.boundedCircle.radius* Screen.MARKER_SIZE));
        this.helperShapes[1]=new CircleShape(new Circle(this.points[1],this.boundedCircle.radius* Screen.MARKER_SIZE));
        this.helperShapes[0].setColor(Color.BLUE);
        this.helperShapes[1].setColor(Color.BLUE);
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
    reset(){return new LineCreator(this.style);}
    refresh(boundedCircle){
        this.boundedCircle=boundedCircle;
        if(this.points[this.i]!=null) this.setControlPoints();
    }
    getPointDescription(){
        let s="";
        if (this.i===0) s="first";else s="last";

        return "Select "+s+" point";
    }
    getShapeDescription(){
        return "Segment line";
    }
}
