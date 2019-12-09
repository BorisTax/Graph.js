import TriangleShape from '../TriangleShape';
import CircleShape from '../CircleShape';
import {Triangle,Coord2D,Circle} from "../../../utils/geometry";
import {Color} from '../../colors';
import ShapeStyle from '../ShapeStyle';
import Screen from '../../Screen';
import AbstractCreator from './AbstractCreator';
export default class TriangleCreator extends AbstractCreator{
     static caption="Triangle";
     constructor(style,boundedCircle){
        super(boundedCircle)
        this.name="TriangleCreator"
        this.style=style;
        this.triangle=new Triangle();
        this.shape=new TriangleShape(this.triangle);
        this.helperShapes=[];
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.shape.setStyle(style);
        this.points=new Array(3);
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
    setControlPoints(){
        this.helperShapes[0]=new CircleShape(new Circle(this.points[0],this.boundedCircle.radius* Screen.MARKER_SIZE));
        this.helperShapes[1]=new CircleShape(new Circle(this.points[1],this.boundedCircle.radius* Screen.MARKER_SIZE));
        this.helperShapes[2]=new CircleShape(new Circle(this.points[2],this.boundedCircle.radius* Screen.MARKER_SIZE));
        this.helperShapes[0].setColor(Color.POINT_MARKER);
        this.helperShapes[1].setColor(Color.POINT_MARKER);
        this.helperShapes[2].setColor(Color.POINT_MARKER);
    }
    reset(){return new TriangleCreator(new ShapeStyle(this.style.getColor(),this.style.getType()),this.boundedCircle);}
}