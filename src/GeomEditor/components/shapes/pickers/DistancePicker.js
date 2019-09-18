import LineShape from '../LineShape';
import CircleShape from '../CircleShape';
import ShapeStyle from '../ShapeStyle';
import Geometry, {Line,Coord2D,Circle} from "../../../utils/geometry";
import {Color} from '../../colors';
import Screen from '../../Screen';
import PropertyPicker from './PropertyPicker';
export default class DistancePicker extends PropertyPicker{
    static caption="";
    constructor(style=new ShapeStyle(Color.BLACK,ShapeStyle.SOLID)){
        super()
        this.name="DistancePicker"
        this.line=new Line(new Coord2D(),new Coord2D());
        this.boundedCircle=new Circle(new Coord2D(),0);
        this.points=[new Coord2D(),new Coord2D()];
        this.shape=new LineShape(this.line);
        this.style=style;
        this.shape.setStyle(style);
        this.helperShapes=[];
        //this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        //this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i>0)this.line=new Line(this.points[0],this.points[1]);
        this.data=Geometry.distance(this.points[0],this.points[1]);
        this.shape=new LineShape(this.line);
        this.shape.setStyle(this.style);
        this.setControlPoints();
    }
    setControlPoints(){
        //this.helperShapes[0]=new CircleShape(new Circle(this.points[0],this.boundedCircle.radius* Screen.MARKER_SIZE));
        //this.helperShapes[1]=new CircleShape(new Circle(this.points[1],this.boundedCircle.radius* Screen.MARKER_SIZE));
        //this.helperShapes[0].setColor(Color.BLUE);
        //this.helperShapes[1].setColor(Color.BLUE);
    }
    reset(){return new DistancePicker(new ShapeStyle(this.style.getColor(),this.style.getType()));}
}
