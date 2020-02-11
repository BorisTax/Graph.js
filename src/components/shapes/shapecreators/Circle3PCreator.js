import {Circle,Triangle,Coord2D} from "../../../utils/geometry";
import CircleShape from "../CircleShape";
import TriangleShape from "../TriangleShape";
import ShapeStyle from "../ShapeStyle";
import ShapeBuilder from "./ShapeBuilder";
export default class Circle3PCreator extends ShapeBuilder{
    static caption="Circle by 3 points";
    constructor(style,boundedCircle){
        super(boundedCircle)
        this.name="Circle3PCreator"
        this.style=style;
        this.circle=new Circle(new Coord2D(),0);
        this.shape=new CircleShape(this.circle);
        this.shape.setStyle(style);
        this.triangle =new Triangle();
        this.helperShapes.push(new TriangleShape(this.triangle));
        this.helperShapes[0].setStyle(ShapeStyle.HelperShape);
        this.points=new Array(3);
    }

    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i<2)this.points[2]=this.points[1];
        this.triangle=new Triangle(this.points);
        this.circle=this.triangle.getOuterCircle();
        this.shape=new CircleShape(this.circle);
        this.shape.setStyle(this.style);
        this.helperShapes[0]=new TriangleShape(this.triangle);
        this.helperShapes[0].setStyle(ShapeStyle.HelperShape);
    }

    reset(){return new Circle3PCreator(new ShapeStyle(this.style.getColor(),this.style.getType()),this.boundedCircle);}
    refresh(boundedCircle){
        this.boundedCircle=boundedCircle;
        if(this.points[this.i]!=null) this.setControlPoints();
    }

}