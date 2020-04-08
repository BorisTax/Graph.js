import ShapeStyle from '../ShapeStyle';
import {Coord2D} from "../../../utils/geometry";
import PropertyPicker from './PropertyPicker';
import {PropertyTypes} from "../PropertyData";
export default class PointPicker extends PropertyPicker{
    static caption="";
    constructor(){
        super()
        this.name="PointPicker"
        this.points=[new Coord2D()];
        this.helperShapes=[];
        this.data={type:PropertyTypes.VERTEX}
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        this.data.value=point;
    }
    reset(){return new PointPicker(new ShapeStyle(this.style.getColor(),this.style.getType()));}
}
