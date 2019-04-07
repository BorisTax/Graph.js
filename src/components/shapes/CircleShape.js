import {Coord2D} from "../../utils/geometry/geometry";
import Geometry from "../../utils/geometry/geometry";
import {Color} from '../colors';
import ShapeStyle from './ShapeStyle';
export default class CircleShape {
    constructor(circle){
        this.p=new Coord2D();
        this.circle=circle;
        this.style=new ShapeStyle(Color.BLACK,ShapeStyle.SOLID);
    }

    drawSelf(ctx, realRect, screenRect){
        this.refresh(realRect, screenRect);
        //console.log(this.radius);
        ctx.beginPath();
        ctx.arc(this.center.x,this.center.y,this.radius,0,2*Math.PI);
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        this.center=Geometry.realToScreen(this.circle.center,realRect,screenRect);
        this.radius=Geometry.realToScreenLength(this.circle.radius,realRect.width,screenRect.width);
    }
    setColor(color){
        this.style.setColor(color);
    }
    getColor(){
        return this.style.getColor();
    }
    toString(){
        return "Center("+this.circle.center.x+","+this.circle.center.y+") radius("+this.circle.radius+")";
    }

    getStyle() {
        return this.style;
    }

    setStyle(style) {
        this.style = style;
    }
}