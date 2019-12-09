import LineShape from '../LineShape';
import ShapeStyle from '../ShapeStyle';
import Geometry, {Line,Coord2D,Circle, Vector} from "../../../utils/geometry";
import {Color} from '../../colors';
import PropertyPicker from './PropertyPicker';
import TextShape from '../TextShape';
export default class DistancePicker extends PropertyPicker{
    static caption="";
    constructor(style=new ShapeStyle(Color.BLACK,ShapeStyle.DASH)){
        super()
        this.name="DistancePicker"
        this.line=new Line(new Coord2D(),new Coord2D());
        this.boundedCircle=new Circle(new Coord2D(),0);
        this.points=[new Coord2D(),new Coord2D()];
        this.shape=new LineShape(this.line);
        this.text=new TextShape();
        this.text.setAnchor(TextShape.CENTER)
        this.text.setFont('10px sans-serif')
        this.style=style;
        this.shape.setStyle(style);
        this.helperShapes=[this.text];
        this.xAxe=new Vector({x:1,y:0},{x:0,y:0})
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
        this.text.setText(this.data.toFixed(4))
        this.text.setPoint(Geometry.midPoint(this.points[0],this.points[1]))
        let angle=Geometry.angleVectors(new Vector(this.points[1],this.points[0]),this.xAxe);
        if(angle<Math.PI/2)angle=angle*Math.sign(this.points[0].y-this.points[1].y);
            else angle=(Math.PI-angle)*Math.sign(this.points[1].y-this.points[0].y);
        this.text.rotate(angle);

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
