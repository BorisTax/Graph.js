import Geometry from '../../../utils/geometry';
import Shape from '../Shape';
import {Color} from '../../colors';
import SnapMarker from './SnapMarker';

export default class PointMarker extends Shape {
    static caption = "center points";
    constructor(point,active){
        super();
        this.point=point;
        this.setActive(active);
    }
    setPoint(p){
        this.point=p
    }
    setActive(active){
        this.active=active
        this.setColor(active?Color.ACTIVE_POINT_MARKER:Color.POINT_MARKER);
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
        this.screenCenter=Geometry.realToScreen(this.point,realRect,screenRect);
        this.screenRadius=SnapMarker.MARKER_SIZE/2;
    }
}