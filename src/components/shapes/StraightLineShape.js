import Geometry,{Circle,Line,StraightLine,Coord2D} from "../../utils/geometry/geometry";

export default class StraightLineShape {
    constructor(line, circle, color){
        this.i=0;
        this.p=Geometry.CircleLineIntersection(line,circle);
        this.line=line;
        this.circle=circle;
        this.color=color;
    }
     isNext(){
        if(this.p==null) return false;
        return (this.i<this.p.length);
        }
    canDrawn(){
        return this.i>0;
    }
    refresh(circle){
        this.p=Geometry.CircleLineIntersection(this.line,circle);
        this.i=0;
    }
    next(){
        if(this.p==null)return null;
        return this.p[this.i++];
    }
    reset(){this.i=0;}
    setColor(color){
        this.color=color;
    }
    getColor(){
        return this.color;
    }
}