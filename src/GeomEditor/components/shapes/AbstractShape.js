import {Color} from '../colors';
import ShapeStyle from './ShapeStyle';

export default class AbstractShape {
    constructor(){
        this.style=new ShapeStyle(Color.BLACK,ShapeStyle.SOLID);
    }

    setColor(color){
        this.style.setColor(color);
    }
    getColor(){
        return this.style.getColor();
    }
    getStyle() {
        return this.style;
    }

    setStyle(style) {
        this.style = style;
    }
    setSelected(selected) {
        this.selected = selected;
        if(selected===true) this.getStyle().setWidth(2);
            else this.getStyle().setWidth(1);
    }
}