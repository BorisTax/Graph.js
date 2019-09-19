import ShapeStyle from '../ShapeStyle';
import {Coord2D} from "../../../utils/geometry";
import PropertyPicker from './PropertyPicker';
export default class PointPicker extends PropertyPicker{
    static caption="";
    constructor(){
        super()
        this.name="PointPicker"
        this.points=[new Coord2D()];
        this.helperShapes=[];
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        this.data=point;
    }
    reset(){return new PointPicker(new ShapeStyle(this.style.getColor(),this.style.getType()));}
}
