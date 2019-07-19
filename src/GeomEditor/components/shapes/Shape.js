import {Color} from '../colors';
import ShapeStyle from './ShapeStyle';

export default class Shape {
    constructor(){
        this.style=new ShapeStyle(Color.BLACK,ShapeStyle.SOLID);
        this.state={selected:false,highlighted:false};
    }
    getModel(){
        return this.model;
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
    setState(state){
        this.state={...this.state,...state};
        if(this.state.highlighted===true) this.getStyle().setWidth(2);
                    else this.getStyle().setWidth(1);
        if(this.state.selected===true) this.getStyle().setColor(Color.SELECTED);
                    else this.getStyle().setColor(this.getStyle().originColor);
    }
    getState(){
        return this.state;
    }
    setProperty(prop){
        if(prop.key==='Color') this.setColor(prop.value);
    }
}