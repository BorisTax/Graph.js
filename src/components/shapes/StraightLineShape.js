import Geometry,{Circle,Line,StraightLine,Coord2D} from "../../utils/geometry/geometry";
import ShapeStyle from './ShapeStyle';

export default class StraightLineShape {
    constructor(line, circle){
        this.i=0;
        this.p=Geometry.CircleLineIntersection(line,circle);
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
    getStyle() {
        return this.style;
    }
    setStyle(style) {
        this.style = style;
    }
}