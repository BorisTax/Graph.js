import SLineShape from '../SLineShape';
import ShapeStyle from '../ShapeStyle';
import {SLine,Coord2D} from "../../../utils/geometry";
import ShapeBuilder from './ShapeBuilder';
export default class StraightLineCreator extends ShapeBuilder{
    static caption="Straight line";
    constructor(style,screenOuterCircle){
        super(screenOuterCircle)
        this.name="StraightLineCreator"
        this.points=new Array(2);
        this.points[0]=new Coord2D();
        this.points[1]=new Coord2D();
        this.line=new SLine(0,0,0);
        //this.screenOuterCircle=new Circle(new Coord2D(),0);
        this.shape=new SLineShape(this.line);
        this.style=style||ShapeStyle.getDefault();
        this.shape.setStyle(style);
    }

    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i>0) {this.line=new SLine(...this.points);if(this.line.a===0&&this.line.b===0)this.legal=false;else this.legal=true;}
        this.shape=new SLineShape(this.line);
        this.shape.setStyle(this.style);
    }
    reset(){return new StraightLineCreator(new ShapeStyle(this.style.getColor(),this.style.getType()),this.screenOuterCircle);}
}