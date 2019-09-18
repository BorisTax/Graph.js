import LineShape from '../LineShape';
import CircleShape from '../CircleShape';
import ShapeStyle from '../ShapeStyle';
import {Line,Coord2D,Circle} from "../../../utils/geometry";
import {Color} from '../../colors';
import Screen from '../../Screen';
import PropertyPicker from './PropertyPicker';
export default class PointPicker extends PropertyPicker{
    static caption="";
    constructor(style=new ShapeStyle(Color.BLACK,ShapeStyle.SOLID)){
        super()
        this.name="PointPicker"
        this.points=[new Coord2D()];
        this.helperShapes=[];
        //this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
        //this.helperShapes.push(new CircleShape(new Circle(new Coord2D(),0)));
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        this.data=point;
        this.setControlPoints();
    }
    setControlPoints(){
        //this.helperShapes[0]=new CircleShape(new Circle(this.points[0],this.boundedCircle.radius* Screen.MARKER_SIZE));
        //this.helperShapes[1]=new CircleShape(new Circle(this.points[1],this.boundedCircle.radius* Screen.MARKER_SIZE));
        //this.helperShapes[0].setColor(Color.BLUE);
        //this.helperShapes[1].setColor(Color.BLUE);
    }
    reset(){return new PointPicker(new ShapeStyle(this.style.getColor(),this.style.getType()));}
}
