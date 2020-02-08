import {Color} from '../colors';
import ShapeStyle from './ShapeStyle';
export default class Shape {
    constructor(){
        this.style=new ShapeStyle(Color.BLACK,ShapeStyle.SOLID);
        this.state={selected:false,highlighted:false};
        this.pointMarkers=[];
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
        if(this.state.selected===true) {
            this.setStyle(new ShapeStyle(Color.SELECTED,ShapeStyle.SOLID,2));
            this.pointMarkers=[];
            for(let cp of this.controlPoints){
                cp.show=true
                cp.marker.setPoint(cp.point)
                cp.marker.setActive(cp.selected)
            }
            return;
        }else {
            this.setStyle(new ShapeStyle(Color.BLACK,ShapeStyle.SOLID,1));
            for(let cp of this.controlPoints){
                cp.show=false;
                cp.selected=false;
            }
            this.pointMarkers=null;
            //this.activePointMarker=null;
        }
        if(this.state.highlighted===true) this.setStyle(new ShapeStyle(Color.BLACK,ShapeStyle.SOLID,2));
    }
    getState(){
        return this.state;
    }
    setProperty(prop){
        if(prop.key==='Color') this.setColor(prop.value);
    }
}