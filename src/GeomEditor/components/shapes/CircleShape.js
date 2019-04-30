import {Coord2D} from "../../utils/geometry";
import Geometry from "../../utils/geometry";
import CenterSnapMarker from './snapmarkers/CenterSnapMarker';
import AbstractShape from "./AbstractShape";
export default class CircleShape extends AbstractShape{
    constructor(circle){
        super();
        this.p=new Coord2D();
        this.circle=circle;
    }

    drawSelf(ctx, realRect, screenRect){
        this.refresh(realRect, screenRect);
        ctx.strokeStyle=this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=this.getStyle().getWidth();
        ctx.beginPath();
        ctx.arc(this.center.x,this.center.y,this.radius,0,2*Math.PI);
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        this.center=Geometry.realToScreen(this.circle.center,realRect,screenRect);
        this.radius=Geometry.realToScreenLength(this.circle.radius,realRect.width,screenRect.width);
    }
    getModel(){
        return this.circle;
    }
    getMarkers(){
        let list=[];
        list.push(new CenterSnapMarker(this.circle.center));
        return list;
    }

    toString(){
        return "Center("+this.circle.center.x+","+this.circle.center.y+") radius("+this.circle.radius+")";
    }

}