import RayLineShape from './RayLineShape';
import ShapeStyle from './ShapeStyle';
import {RayLine, Coord2D, Circle} from "../../utils/geometry/geometry";

export default class RayLineCreator{
    constructor(style){
        //debugger;
        this.i=0;
        this.line=new RayLine(new Coord2D(),new Coord2D());
        this.points=new Array(2);
        this.circle=new Circle();
        this.shape=[];
        this.shape.push(new RayLineShape(this.line,this.circle));

        this.style=style||new ShapeStyle("black",ShapeStyle.SOLID);
        this.shape[0].setStyle(style);
}

    isNext(){
        return (this.i<this.points.length);
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i>0) this.line=new RayLine(...this.points);
        this.shape[0]=new RayLineShape(this.line,this.circle);
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
        this.points[this.i++]=p;
    }
    reset(circle){this.circle=circle;return new RayLineCreator(this.style);}
    getPointDescription(){
        let s="";
        if (this.i===0) s="origin";else s="second";
        return "Select "+s+" point";
    }
    getShapeDescription(){
        return "Ray line";
    }

}