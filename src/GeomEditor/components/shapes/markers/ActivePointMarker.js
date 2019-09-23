import Geometry from '../../../utils/geometry';
import Shape from '../Shape';
import {Color} from '../../colors';

export default class ActivePointMarker extends Shape {
    static caption = "center points";
    constructor(circle){
        super();
        this.circle=circle;
        this.setColor(Color.ACTIVE_POINT_MARKER);
    }
    drawSelf(ctx, realRect, screenRect){
        this.refresh(realRect, screenRect);
        ctx.fillStyle=this.getStyle().getColor();
        ctx.lineWidth=this.getStyle().getWidth();
        ctx.beginPath();
        ctx.arc(this.screenCenter.x,this.screenCenter.y,this.screenRadius,0,2*Math.PI);
        ctx.fill();
    }
    refresh(realRect, screenRect){
        this.screenCenter=Geometry.realToScreen(this.circle.center,realRect,screenRect);
        this.screenRadius=Geometry.realToScreenLength(this.circle.radius,realRect.width,screenRect.width);
    }
}