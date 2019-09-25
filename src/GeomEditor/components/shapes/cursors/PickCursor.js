import Shape from "../Shape";
import Geometry from "../../../utils/geometry";

export default class PickCursor extends Shape{
    constructor(point){
        super();
        this.p=point;
    }
    drawSelf(ctx, realRect,  screenRect){
        this.refresh(realRect,screenRect);
        ctx.strokeStyle=this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=this.getStyle().getWidth();
        let size=10;
        ctx.beginPath();
        ctx.moveTo(this.p0.x,this.p0.y-size);
        ctx.lineTo(this.p0.x,this.p0.y+size);
        ctx.moveTo(this.p0.x-size,this.p0.y);
        ctx.lineTo(this.p0.x+size,this.p0.y);
        ctx.arc(this.p0.x,this.p0.y,10,0,2*Math.PI);
        ctx.stroke();
    }
    refresh( realRect,  screenRect){
        this.p0 = Geometry.realToScreen(this.p,realRect,screenRect);
    }
    setCoord( point) {
        this.p=point;
    }
}
