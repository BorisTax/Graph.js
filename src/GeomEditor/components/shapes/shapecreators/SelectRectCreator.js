import {Rectangle} from '../../../utils/geometry';
import SelectRectShape from '../SelectRectShape';

export default class SelectRectCreator {
    static caption="RectSelection";
    rectangle=new Rectangle();
    points=new Array(2);
    constructor(style){
        this.shape=new SelectRectShape(this.rectangle);
        this.helperShapes = [];
        this.i=0;
    }
    isNext(){
        return (this.i<this.points.length);
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i>0)this.rectangle=new Rectangle(this.points[0], this.points[1]);
        this.shape=new SelectRectShape(this.rectangle);
    }
    next(){
        if(!this.isNext()) return;
        this.i++;
    }
    getShape(){
        return this.shape;
    }
    getHelperShapes(){
        return this.helperShapes;
    }
    setNextPoint(p){
        this.setCurrent(p);
        this.i++;
    }
    setControlPoints(){
        
    }
    reset(){return new SelectRectCreator();}
    refresh(boundedCircle){
        this.boundedCircle=boundedCircle;
        if(this.points[this.i]!=null)this.setControlPoints();
    }
    setStyle(style){
        this.style=style;
    }
    getPointDescription(){
        let s;
        if (this.i===0) s="first";else s="last";

        return "Select "+s+" point";
    }
    getShapeDescription(){
        return SelectRectCreator.caption;
    }
}