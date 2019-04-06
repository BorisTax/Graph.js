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
        let c=Geometry.realToScreen(this.circle.center,realRect,screenRect);
        let r=this.circle.radius/((realRect.bottomRight.x-realRect.topLeft.x)/(screenRect.bottomRight.x-screenRect.topLeft.x));
        //console.log(r,c);
        ctx.beginPath();
        ctx.arc(c.x,c.y,r,0,2*Math.PI);
        ctx.stroke();
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