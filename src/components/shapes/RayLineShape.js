import Geometry,{Circle,Line,StraightLine,Coord2D} from "../../utils/geometry/geometry";

export default class RayLineShape {
    p=[];
    i=-1;
    constructor(line, circle){
        this.p=Geometry.CircleRayLineIntersection(line,circle);
        this.line=line;
        this.circle=circle;
    }

    isNext(){
        if(this.p==null) return false;
        return (this.i<this.p.length);
    }
    canDrawn(){
        return this.i>0;
    }
    refresh(circle){
        this.p=Geometry.CircleRayLineIntersection(this.line,circle);
        this.i=-1;
    }
    next(){
        if(this.p==null)return null;
        if(this.i==-1){this.i++;return this.line.origin;}
        return this.p[this.i++];
    }
    reset(){this.i=-1;}
    setColor(color){
        this.color=color;
    }
    getColor(){
        return this.color;
    }

    getStyle() {
        return this.style;
    }
    setStyle(style) {
    this.style = style;
    }
}