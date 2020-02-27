import {Color} from '../colors';
import ShapeStyle from './ShapeStyle';
import Geometry from '../../utils/geometry';
export default class Shape {
    constructor(){
        this.style=new ShapeStyle(Color.BLACK,ShapeStyle.SOLID);
        this.state={selected:false,selectedPoints:0,inSelection:false,underCursor:false,highlighted:false};
        this.pointMarkers=[];
        this.controlPoints=[];
    }
    drawSelf(ctx,realRect, screenRect){
        this.refresh(realRect, screenRect);
        ctx.strokeStyle=this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=this.getStyle().getWidth();
        if(this.mockShape)this.mockShape.drawSelf(ctx,realRect,screenRect);
    }
    applyTransform(){
       this.controlPoints=this.mockShape.controlPoints;
    }
    move(distance){
        for(let cp of this.controlPoints){
            if(cp.selected||(!cp.selected&&this.state.selectedPoints===0)){
                cp.point.x+=distance.x;
                cp.point.y+=distance.y;
            }
        }
    }
    createMockShape(mockShape){
        this.mockShape=mockShape;
        this.mockShape.tag=1;
        this.mockShape.state.selectedPoints=0;
        this.mockShape.setStyle(ShapeStyle.MockShape);
        let i=0;
        for(const cp of this.controlPoints){
            this.mockShape.controlPoints[i].selected=cp.selected;
           if(cp.selected) this.mockShape.state.selectedPoints++;
           i++;
        }
        
    }
    deleteMockShape(){
        this.mockShape = null;
    }
    setActivePoint(){
        for(const cp of this.controlPoints) {cp.selected=false;cp.marker.setActive(false)}
    }
    selectPoint(pointIndex){
            this.controlPoints[pointIndex].selected=true;
            this.controlPoints[pointIndex].marker.setActive(true);

    }
    setControlPoint(index,point){
        this.controlPoints[index].point={...point}
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
            this.setStyle(new ShapeStyle(Color.SELECTED,ShapeStyle.SOLID,1));
            if(this.state.highlighted) this.getStyle().setWidth(2);
            for(let cp of this.controlPoints){
                cp.show=true
                cp.marker.setPoint(cp.point)
                cp.marker.setActive(cp.selected||cp.toBeSelected)
            }
            return;
        }else {
            this.setStyle(new ShapeStyle(Color.BLACK,ShapeStyle.SOLID,1));
            for(let cp of this.controlPoints){
                cp.show=false;
                cp.selected=false;
                cp.toBeSelected=false;
            }
            this.pointMarkers=null;
            //this.activePointMarker=null;
        }
        if(this.state.highlighted) this.setStyle(new ShapeStyle(Color.BLACK,ShapeStyle.SOLID,2));
    }
    getState(){
        return this.state;
    }
    setProperty(prop){
        if(prop.key==='Color') this.setColor(prop.value);
    }
}