import TriangleShape from '../TriangleShape';
import CircleShape from '../CircleShape';
import {Triangle,Coord2D,Circle} from "../../../utils/geometry";
import {Color} from '../../colors';
import ShapeStyle from '../ShapeStyle';
import Screen from '../../Screen';
export default class TriangleCreator{
     static caption="Triangle";
     constructor(style){
        this.style=style;
        this.triangle=new Triangle();
        this.shape=new TriangleShape(this.triangle);
        this.helperShapes=[];
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.shape.setStyle(style);
        this.i=0;
        this.points=new Array(3);
    }
    isNext(){
        return (this.i<this.points.length);
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i<2)this.points[2]=this.points[1];
        this.triangle=new Triangle(this.points);
        this.shape=new TriangleShape(this.triangle);
        this.shape.setStyle(this.style);
        this.setControlPoints();
    }
    next(){
        if(!this.isNext()) return;
        this.i++;
    }
    setControlPoints(){
        this.helperShapes[0]=new CircleShape(new Circle(this.points[0],this.boundedCircle.radius* Screen.MARKER_SIZE));
        this.helperShapes[1]=new CircleShape(new Circle(this.points[1],this.boundedCircle.radius* Screen.MARKER_SIZE));
        this.helperShapes[2]=new CircleShape(new Circle(this.points[2],this.boundedCircle.radius* Screen.MARKER_SIZE));
        this.helperShapes[0].setColor(Color.BLUE);
        this.helperShapes[1].setColor(Color.BLUE);
        this.helperShapes[2].setColor(Color.BLUE);
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
    reset(){return new TriangleCreator(new ShapeStyle(this.style.getColor(),this.style.getType()));}
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
            case 2:s="third";break;
            default:
        }

        return "Select "+s+" point";
    }
    getShapeDescription(){
        return TriangleCreator.caption;
    }
    }