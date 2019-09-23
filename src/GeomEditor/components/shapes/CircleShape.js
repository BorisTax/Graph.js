import {Coord2D, Circle} from "../../utils/geometry";
import Geometry from "../../utils/geometry";
import CenterSnapMarker from './markers/CenterSnapMarker';
import Shape from "./Shape";
import Screen from "../Screen";
import ActivePointMarker from "./markers/ActivePointMarker";
export default class CircleShape extends Shape{
    constructor(circle){
        super();
        this.p=new Coord2D();
        this.circle=circle;
        this.model=circle;
    }

    drawSelf(ctx, realRect, screenRect){
        this.refresh(realRect, screenRect);
        ctx.strokeStyle=this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=this.getStyle().getWidth();
        ctx.beginPath();
        ctx.arc(this.screenCenter.x,this.screenCenter.y,this.screenRadius,0,2*Math.PI);
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        this.screenCenter=Geometry.realToScreen(this.circle.center,realRect,screenRect);
        this.screenRadius=Geometry.realToScreenLength(this.circle.radius,realRect.width,screenRect.width);
        const boundedCircleRadius=Geometry.distance(realRect.topLeft,realRect.bottomRight)/2;
        if(this.activePoint) 
            this.activePointMarker=new ActivePointMarker(new Circle(this.activePoint,boundedCircleRadius* Screen.MARKER_SIZE))

    }
    setActivePoint(key){
        this.activePoint=null;
        if(key==='Center') this.activePoint=this.circle.center;
    }
    getMarkers(){
        let list=[];
        list.push(new CenterSnapMarker(this.circle.center));
        return list;
    }
    getProperties(){
        let prop=new Map();
        prop.set('Title',{value:'Circle',regexp:/\s*/});
        prop.set('Center',{value:{x:this.circle.center.x,y:this.circle.center.y},regexp:/^-?\d*\.?\d*$/});
        prop.set('Radius',{value:this.circle.radius,regexp:/^\d*\.?\d*$/});
        return prop;
    }
    setProperty(prop){
        super.setProperty(prop);
        switch(prop.key){
            case 'Center':
                this.circle.center.x=prop.value.x;
                this.circle.center.y=prop.value.y;
                break;
            case 'Radius':
                this.circle.radius=prop.value;
                break;
            default:
        }
    }
    getDistance(point) {
        return Math.abs(Geometry.distance(point,this.circle.center)-this.circle.radius);
    }
    isInRect(topLeft,bottomRight){
        const outRectX1=topLeft.x-this.circle.radius;
        const outRectY1=topLeft.y+this.circle.radius;
        const outRectX2=bottomRight.x+this.circle.radius;
        const outRectY2=bottomRight.y-this.circle.radius;
        const inRectX1=topLeft.x+this.circle.radius;
        const inRectY1=topLeft.y-this.circle.radius;
        const inRectX2=bottomRight.x-this.circle.radius;
        const inRectY2=bottomRight.y+this.circle.radius;
        const c=this.circle.center;
        let cross=false;
        const signs=[Math.sign(Geometry.distance(c,{x:topLeft.x,y:topLeft.y})-this.circle.radius),
                     Math.sign(Geometry.distance(c,{x:bottomRight.x,y:topLeft.y})-this.circle.radius),
                     Math.sign(Geometry.distance(c,{x:bottomRight.x,y:bottomRight.y})-this.circle.radius),
                     Math.sign(Geometry.distance(c,{x:topLeft.x,y:bottomRight.y})-this.circle.radius)];
        if(signs.every(x=>x<0)) return {cross:false,full:false};
        let full=Geometry.pointInRectByPoints(c.x,c.y,inRectX1,inRectY1,inRectX2,inRectY2);
        if(full===true) return {cross:false,full:true}
        if(Geometry.pointInRectByPoints(c.x,c.y,outRectX1,outRectY1,outRectX2,outRectY2)){
                cross=true;
                if(Geometry.pointInRectByPoints(c.x,c.y,outRectX1,outRectY1,topLeft.x,topLeft.y)){
                    if(Geometry.distance(c,{x:topLeft.x,y:topLeft.y})>this.circle.radius) cross=false;
                }
                if(Geometry.pointInRectByPoints(c.x,c.y,bottomRight.x,outRectY1,outRectX2,topLeft.y)){
                    if(Geometry.distance(c,{x:bottomRight.x,y:topLeft.y})>this.circle.radius) cross=false;
                }
                if(Geometry.pointInRectByPoints(c.x,c.y,bottomRight.x,bottomRight.y,outRectX2,outRectY2)){
                    if(Geometry.distance(c,{x:bottomRight.x,y:bottomRight.y})>this.circle.radius) cross=false;
                }
                if(Geometry.pointInRectByPoints(c.x,c.y,outRectX1,bottomRight.y,topLeft.x,outRectY2)){
                    if(Geometry.distance(c,{x:topLeft.x,y:bottomRight.y})>this.circle.radius) cross=false;
                }
            }
        return {cross:cross,full:false}
    }
    toString(){
        return "Center("+this.circle.center.x+","+this.circle.center.y+") radius("+this.circle.radius+")";
    }

}