import {Color} from '../../colors';
import {Rectangle,Coord2D,Circle} from '../../../utils/geometry';
import RectangleShape from '../RectangleShape';
import CircleShape from '../CircleShape';
import ShapeStyle from '../ShapeStyle';
import Screen from '../../Screen';
import AbstractCreator from './AbstractCreator';
export default class RectangleCreator extends AbstractCreator{
    static caption="Rectangle";
    rectangle=new Rectangle();
    points=new Array(2);
    constructor(style,boundedCircle){
        super(boundedCircle)
        this.name="RectangleCreator"
        this.style=style;
        this.shape=new RectangleShape(this.rectangle);
        this.shape.setStyle(style);
        this.helperShapes = [];
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        this.helperShapes[0].setStyle(new ShapeStyle(Color.BLUE,ShapeStyle.SOLID));
        this.helperShapes[1].setStyle(new ShapeStyle(Color.BLUE,ShapeStyle.SOLID));
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i>0)this.rectangle=new Rectangle(this.points[0], this.points[1]);
        this.shape=new RectangleShape(this.rectangle);
        this.shape.setStyle(this.style);
        this.setControlPoints();
    }
    setControlPoints(){
        this.helperShapes[0]=new CircleShape(new Circle(this.points[0],this.boundedCircle.radius*Screen.MARKER_SIZE));
        this.helperShapes[1]=new CircleShape(new Circle(this.points[1],this.boundedCircle.radius*Screen.MARKER_SIZE));
        this.helperShapes[0].setStyle(new ShapeStyle(Color.POINT_MARKER,ShapeStyle.SOLID));
        this.helperShapes[1].setStyle(new ShapeStyle(Color.POINT_MARKER,ShapeStyle.SOLID));
    }
    reset(){return new RectangleCreator(new ShapeStyle(this.style.getColor(),this.style.getType()),this.boundedCircle);}
}