import RayLineShape from '../RayLineShape';
import CircleShape from '../CircleShape';
import ShapeStyle from '../ShapeStyle';
import {RLine, Coord2D, Circle} from "../../../utils/geometry";
import {Color} from '../../colors';
import Screen from '../../Screen';
import AbstractCreator from './AbstractCreator';
export default class RayLineCreator extends AbstractCreator{
    static caption="Ray line";
    constructor(style){
        super()
        this.name="RayLineCreator"
        this.line=new RLine(new Coord2D(),new Coord2D());
        this.points=new Array(2);
        this.boundedCircle=new Circle();
        this.shape=new RayLineShape(this.line);
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

    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i>0) this.line=new RLine(...this.points);
        this.shape=new RayLineShape(this.line,this.boundedCircle);
        this.shape.setStyle(this.style);
        this.setControlPoints();
    }
    reset(){return new RayLineCreator(new ShapeStyle(this.style.getColor(),this.style.getType()));}
}