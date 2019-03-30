import {Coord2D} from '../../utils/geometry/geometry';

export default class LineShape {
    p=[new Coord2D(0,0),new Coord2D(0,0)];
    color;
    i=0;
    style;
    constructor(line){
        this.p=[];
        this.p[0]=line.p1;
        this.p[1]=line.p2;
    }

    isNext(){
        return (this.i<this.p.length);
    }
    canDrawn(){
        return this.i>0;
    }
    next(){
        return this.p[this.i++];

    }
    reset(){this.i=0;}
    setColor(color){
        this.color=color;
    }
    getColor(){
        return this.color;
    }
    toString(){
        return "p1("+this.p[0].x+","+this.p[0].y+") p2("+this.p[1].x+","+this.p[1].y+")";
    }

    getStyle() {
        return this.style;
    }

    setStyle(style) {
        this.style = style;
    }
}