import {Color} from '../colors';
import {Rectangle,Coord2D,Circle} from '../../utils/geometry/geometry';
import RectangleShape from './RectangleShape';
import CircleShape from './CircleShape';
import ShapeStyle from './ShapeStyle';
import Screen from '../Screen';

export default class RectangleCreator {
    static caption="Rectangle";
    rectangle=new Rectangle();
    points=new Array(2);
    constructor(style){
        this.style=style;
        this.shape=new RectangleShape(this.rectangle);
        this.shape.setStyle(style);
        this.helperShapes = [];
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.helperShapes[0].setStyle(new ShapeStyle(Color.BLUE,ShapeStyle.SOLID));
        this.helperShapes[1].setStyle(new ShapeStyle(Color.BLUE,ShapeStyle.SOLID));
        this.i=0;
    }
    isNext(){
        return (this.i<this.points.length);
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i==0)this.points[1]=this.points[0];
        if(this.i>0)this.rectangle=new Rectangle(this.points[0], this.points[1]);
        this.shape=new RectangleShape(this.rectangle);
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
        
        this.helperShapes[0]=new CircleShape(new Circle(this.points[0],this.boundedCircle.radius*Screen.MARKER_SIZE));
        this.helperShapes[1]=new CircleShape(new Circle(this.points[1],this.boundedCircle.radius*Screen.MARKER_SIZE));
        this.helperShapes[0].setStyle(new ShapeStyle(Color.BLUE,ShapeStyle.SOLID));
        this.helperShapes[1].setStyle(new ShapeStyle(Color.BLUE,ShapeStyle.SOLID));
    }
    reset(){return new RectangleCreator(this.style);}
    refresh(boundedCircle){
        this.boundedCircle=boundedCircle;
        if(this.points[this.i]!=null)this.setControlPoints();
    }
    setStyle(style){
        this.style=style;
    }
    getPointDescription(){
        let s;
        if (this.i==0) s="first";else s="last";

        return "Select "+s+" point";
    }
    getShapeDescription(){
        return RectangleCreator.caption;
    }
}