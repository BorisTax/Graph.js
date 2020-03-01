import RayLineShape from '../RayLineShape';
import ShapeStyle from '../ShapeStyle';
import {RLine, Coord2D} from "../../../utils/geometry";
import ShapeBuilder from './ShapeBuilder';
export default class RayLineCreator extends ShapeBuilder{
    static caption="Ray line";
    constructor(style,screenOuterCircle){
        super(screenOuterCircle)
        this.name="RayLineCreator"
        this.line=new RLine(new Coord2D(),new Coord2D());
        this.points=new Array(2);
        this.shape=new RayLineShape(this.line);
        this.style=style||ShapeStyle.getDefault();
        this.shape.setStyle(style);
    }

    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i>0) {this.line=new RLine(...this.points);if(this.line.vector.x===0&&this.line.vector.y===0)this.legal=false;else this.legal=true}
        this.shape=new RayLineShape(this.line,this.screenOuterCircle);
        this.shape.setStyle(this.style);
    }
    reset(){return new RayLineCreator(new ShapeStyle(this.style.getColor(),this.style.getType()),this.screenOuterCircle);}
}