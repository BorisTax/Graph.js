import {Rectangle} from '../../../utils/geometry';
import SelectRectShape from '../SelectRectShape';
import AbstractCreator from './AbstractCreator';
export default class SelectRectCreator extends AbstractCreator{
    static caption="RectSelection";
    rectangle=new Rectangle();
    points=new Array(2);
    constructor(style){
        super()
        this.name="SelectRectCreator"
        this.shape=new SelectRectShape(this.rectangle);
        this.helperShapes = [];
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i>0)this.rectangle=new Rectangle(this.points[0], this.points[1]);
        this.shape=new SelectRectShape(this.rectangle);
    }
    setControlPoints(){
        
    }
    reset(){return new SelectRectCreator();}
}