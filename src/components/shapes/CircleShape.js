import {Coord2D} from "../../utils/geometry";
import Geometry from "../../utils/geometry";
import CenterSnapMarker from './markers/CenterSnapMarker';
import Shape from "./Shape";
import PointMarker from "./markers/PointMarker";
import PointPicker from './pickers/PointPicker'
import DistancePicker from './pickers/DistancePicker'
import ShapeStyle from "./ShapeStyle";
export default class CircleShape extends Shape{
    constructor(circle){
        super();
        this.p=new Coord2D();
        this.circle=circle;
        this.model=circle;
        this.setStyle(new ShapeStyle())
        this.controlPoints=[{point:{...circle.center},show:false,selected:false}];
        for(let cp of this.controlPoints)
                cp.marker=new PointMarker(cp.point,false)
    }

    drawSelf(ctx, realRect, screenRect){
        super.drawSelf(ctx,realRect, screenRect)
        ctx.beginPath();
        ctx.arc(this.screenCenter.x,this.screenCenter.y,this.screenRadius,0,2*Math.PI);
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        this.screenCenter=Geometry.realToScreen(this.circle.center,realRect,screenRect);
        this.screenRadius=Geometry.realToScreenLength(this.circle.radius,realRect.width,screenRect.width);
        if(this.activePoint) 
            this.activePointMarker=new PointMarker(this.activePoint)

    }
    setActivePoint(key){
        super.setActivePoint();
        if(key==='Center') {this.selectPoint(0)}
    }
    getMarkers(){
        let list=[];
        list.push(new CenterSnapMarker(this.circle.center));
        return list;
    }
    getProperties(){
        let prop=new Map();
        prop.set('Title',{value:'Circle',regexp:/\s*/});
        prop.set('Center',{value:{x:this.circle.center.x,y:this.circle.center.y},picker:PointPicker,regexp:/^-?\d*\.?\d*$/});
        prop.set('Radius',{value:this.circle.radius,picker:DistancePicker,regexp:/^\d*\.?\d*$/});
        return prop;
    }
    setProperty(prop){
        super.setProperty(prop);
        switch(prop.key){
            case 'Center':
                this.circle.center.x=prop.value.x;
                this.circle.center.y=prop.value.y;
                this.controlPoints[0].point=this.circle.center;
                break;
            case 'Radius':
                this.circle.radius=prop.value;
                break;
            default:
        }
    }
    move(distance){
        super.move(distance);
        this.circle.center={...this.controlPoints[0].point}
    }
    
    createMockShape(){
        super.createMockShape(new CircleShape({center:{...this.circle.center},radius:this.circle.radius}));
    }

    applyTransform(){
        super.applyTransform();
        this.circle.center=this.controlPoints[0].point
    }
    copyShape(){
        return new CircleShape({center:{...this.controlPoints[0].point},radius:this.circle.radius});
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