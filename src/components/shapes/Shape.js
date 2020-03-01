import {Color} from '../colors';
import ShapeStyle from './ShapeStyle';
import Geometry from '../../utils/geometry';
export default class Shape {
    static PropertyTypes={VERTEX:'vertex',NUMBER:'number',STRING:'string'};
    static RegExp={
        NUMBER:/^-?\d+\.?\d*$/,
        POSITIVE_NUMBER:/^\d+\.?\d*$/}
    constructor(){
        this.style=new ShapeStyle(Color.BLACK,ShapeStyle.SOLID);
        this.state={selected:false,selectedPoints:0,inSelection:false,underCursor:false,highlighted:false};
        this.pointMarkers=[];
        this.properties=[];
    }
    drawSelf(ctx,realRect, screenRect){
        this.refresh(realRect, screenRect);
        ctx.strokeStyle=this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=this.getStyle().getWidth();
        if(this.properties)
            for(let cp of this.properties)
                if(cp.type===Shape.PropertyTypes.VERTEX&&cp.show) cp.marker.drawSelf(ctx,realRect, screenRect);
        if(this.mockShape)this.mockShape.drawSelf(ctx,realRect,screenRect);
    }
    applyTransform(){
        for(const i in this.properties) {
           if(this.properties[i].type===Shape.PropertyTypes.VERTEX){
                this.properties[i].value.x=this.mockShape.properties[i].value.x;
                this.properties[i].value.y=this.mockShape.properties[i].value.y;
                this.properties[i].marker.setPoint(this.mockShape.properties[i].value);
                }
            if(this.properties[i].type===Shape.PropertyTypes.NUMBER){
                this.properties[i].value=this.mockShape.properties[i].value;
            }
       this.refreshModel();
       }
    }
    move(distance){
        for(let cp of this.properties){
            if(cp.type!==Shape.PropertyTypes.VERTEX) continue;
            if(cp.selected||(!cp.selected&&this.state.selectedPoints===0)){
                cp.value.x+=distance.x;
                cp.value.y+=distance.y;
            }
        }
        this.refreshModel();
    }
    createMockShape(){
        this.mockShape=this.copyShape();
        this.mockShape.state.selectedPoints=0;
        this.mockShape.setStyle(ShapeStyle.MockShape);
        for(const i in this.properties){
           if(this.properties[i].type!==Shape.PropertyTypes.VERTEX) continue;
           this.mockShape.properties[i].selected=this.properties[i].selected;
           if(this.properties[i].selected) this.mockShape.state.selectedPoints++;
        }
        
    }
    deleteMockShape(){
        this.mockShape = null;
    }
    copyShape(){
        return new this.constructor(this.model.copy());
    }
    setActivePoint(key){
        for(const cp of this.properties) {
            if(cp.type!==Shape.PropertyTypes.VERTEX) continue;
            cp.selected=false;
            cp.marker.setActive(false);
        }
        this.selectPoint(key);
    }
    selectPoint(pointIndex){
            this.properties[pointIndex].selected=true;
            this.properties[pointIndex].marker.setActive(true);
    }
    setControlPoint(index,point){
        this.properties[index].value={...point}
        this.refreshModel();
    }
    getDistanceToControlPoints(point){
        return this.properties.map(cp=>cp.type===Shape.PropertyTypes.VERTEX?Geometry.distance(point,cp.value):null);
    }
    getProperties(){
        return this.properties;
    }
    setProperty(prop){
        if(prop.type===Shape.PropertyTypes.VERTEX){
            this.properties[prop.key].value.x=prop.value.x;
            this.properties[prop.key].value.y=prop.value.y;
            this.properties[prop.key].marker.setPoint(prop.value);
            }
            else this.properties[prop.key].value=prop.value;
        this.refreshModel();
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
            this.setStyle(new ShapeStyle(Color.SELECTED,ShapeStyle.SOLID,1));
            if(this.state.highlighted) this.getStyle().setWidth(2);
            for(let cp of this.properties){
                if(cp.type!==Shape.PropertyTypes.VERTEX) continue;
                cp.show=true
                cp.marker.setPoint(cp.value)
                cp.marker.setActive(cp.selected||cp.toBeSelected)
            }
            return;
        }else {
            this.setStyle(new ShapeStyle(Color.BLACK,ShapeStyle.SOLID,1));
            for(let cp of this.properties){
                if(cp.type!==Shape.PropertyTypes.VERTEX) continue;
                cp.show=false;
                cp.selected=false;
                cp.toBeSelected=false;
            }
            this.pointMarkers=null;
        }
        if(this.state.highlighted) this.setStyle(new ShapeStyle(Color.BLACK,ShapeStyle.SOLID,2));
    }
    getState(){
        return this.state;
    }
}