import LineShape from './LineShape';
import ShapeStyle from './ShapeStyle';
import {Line,Coord2D} from "../../utils/geometry/geometry";

export default class LineCreator{
    constructor(style=new ShapeStyle("black",ShapeStyle.SOLID)){
        this.i=0;
        this.line=new Line(new Coord2D(),new Coord2D());
        this.points=[new Coord2D(),new Coord2D()];
        this.shape=[];
        this.shape.push(new LineShape(this.line));
        this.style=style;
        this.shape[0].setStyle(style);
    }
    isNext(){
        return (this.i<this.points.length);
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i>0)this.line=new Line(this.points[0],this.points[1]);
        this.shape[0]=new LineShape(this.line);
        this.shape[0].setStyle(this.style);
    }
    next(){
        if(!this.isNext()) return;
        this.i++;
    }
    getShapes(){
        return this.shape;
    }
    getHelperShapes(){
        return null;
    }
    setNextPoint(p){
        this.setCurrent(p);
        this.i++;
    }
    reset(){return new LineCreator(this.style);}
    getPointDescription(){
        let s="";
        if (this.i===0) s="first";else s="last";

        return "Select "+s+" point";
    }
    getShapeDescription(){
        return "Segment line";
    }
}
