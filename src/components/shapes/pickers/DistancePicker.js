import LineShape from '../LineShape';
import ShapeStyle from '../ShapeStyle';
import Geometry, {Line,Coord2D,Circle, Vector} from "../../../utils/geometry";
import {Color} from '../../colors';
import PropertyPicker from './PropertyPicker';
import TextShape from '../TextShape';
import Shape from '../Shape';
import DistanceShape from '../helpers/DistanceShape';
export default class DistancePicker extends PropertyPicker{
    static caption="";
    constructor(style=new ShapeStyle(Color.BLACK,ShapeStyle.DASH)){
        super()
        this.name="DistancePicker"
        this.line=new Line(new Coord2D(),new Coord2D());
        this.screenOuterCircle=new Circle(new Coord2D(),0);
        this.points=[new Coord2D(),new Coord2D()];
        this.shape=new LineShape(this.line);
        this.text=new TextShape();
        this.text.setAnchor(TextShape.CENTER)
        this.text.setFont('10px sans-serif')
        this.style=style;
        this.shape.setStyle(style);
        this.helperShapes=[this.text];
        this.xAxe=new Vector({x:0,y:0},{x:1,y:0});
        this.data={type:Shape.PropertyTypes.NUMBER}
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i>0)this.line=new Line(this.points[0],this.points[1]);
        this.shape=new DistanceShape(this.line);
        this.data.value=Geometry.distance(this.points[0],this.points[1]);
        this.setControlPoints();
    }
    setControlPoints(){

    }
    reset(){return new DistancePicker(new ShapeStyle(this.style.getColor(),this.style.getType()));}
}
