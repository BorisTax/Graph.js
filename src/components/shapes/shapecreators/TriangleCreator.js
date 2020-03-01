import TriangleShape from '../TriangleShape';
import {Triangle} from "../../../utils/geometry";
import ShapeStyle from '../ShapeStyle';
import ShapeBuilder from './ShapeBuilder';
export default class TriangleCreator extends ShapeBuilder{
     static caption="Triangle";
     constructor(style,screenOuterCircle){
        super(screenOuterCircle)
        this.name="TriangleCreator"
        this.style=style;
        this.triangle=new Triangle();
        this.shape=new TriangleShape(this.triangle);
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
    }

    reset(){return new TriangleCreator(new ShapeStyle(this.style.getColor(),this.style.getType()),this.screenOuterCircle);}
}