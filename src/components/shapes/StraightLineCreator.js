import StraightLineShape from './StraightLineShape';
import {StraightLine,Coord2D} from "../../utils/geometry/geometry";

export default class StraightLineCreator {
    constructor(circle,style){
        this.i=0;
        this.points=new Array(2);
        this.points[0]=new Coord2D();
        this.points[1]=new Coord2D();
        this.line=new StraightLine(0,0,0);
        this.circle=circle;
        this.shape=[new StraightLineShape(this.line,this.circle)];
        this.style=style;
        this.shape[0].setStyle(style);
    }

    isNext(){
        return (this.i<this.points.length);
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i>0) this.line=new StraightLine(...this.points);
        this.shape=[new StraightLineShape(this.line,this.circle)];
        this.shape[0].setStyle(this.style);
    }
    next(){
        if(!this.isNext()) return;
        this.i++;
    }
    getShapes(){
        return this.shape;
    }
    setNextPoint(p){
        this.points[this.i++]=p;
    }
    reset(){return new StraightLineCreator(this.circle,this.style);}
    getPointDescription(){
        let s="";
        if (this.i===0) s="first";else s="second";
        return `Select ${s} point`;
    }
    getShapeDescription(){
        return "Infinite line";
    }
}