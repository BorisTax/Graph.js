import Screen from '../../Screen';
import {Circle} from '../../../utils/geometry';
import CircleShape from '../CircleShape';
import ShapeStyle from '../ShapeStyle';
import {Color} from '../../colors';

export default class ActivePointMarker extends CircleShape {
    static caption = "center points";
    constructor(circle){
        super(circle);
        this.setColor(Color.ACTIVE_POINT_MARKER);
    }
    drawSelf(ctx, realRect, screenRect){
        this.refresh(realRect, screenRect);
        ctx.fillStyle=this.getStyle().getColor();
        //ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=this.getStyle().getWidth();
        ctx.beginPath();
        ctx.arc(this.screenCenter.x,this.screenCenter.y,this.screenRadius,0,2*Math.PI);
        //ctx.stroke();
        ctx.fill();
    }
}