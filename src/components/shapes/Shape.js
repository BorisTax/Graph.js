import {Color} from '../colors';
import ShapeStyle from './ShapeStyle';
import Geometry from '../../utils/geometry';
export default class Shape {
    constructor(){
        this.style=new ShapeStyle(Color.BLACK,ShapeStyle.SOLID);
        this.state={selected:false,highlighted:false};
        this.pointMarkers=[];
        this.controlPoints=[];
    }
    setActivePoint(){
        for(const cp of this.controlPoints) {cp.selected=false;cp.marker.setActive(false)}
    }
    getDistanceToControlPoints(point){
        return this.controlPoints.map(cp=>Geometry.distance(point,cp.point))
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
            for(let cp of this.controlPoints){
                cp.show=true
                cp.marker.setPoint(cp.point)
                cp.marker.setActive(cp.selected||cp.highlighted)
            }
            return;
        }else {
            this.setStyle(new ShapeStyle(Color.BLACK,ShapeStyle.SOLID,1));
            for(let cp of this.controlPoints){
                cp.show=false;
                cp.selected=false;
                cp.highlighted=false;
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