import AbstractShape from "../AbstractShape";
import Geometry from "../../../utils/geometry";

export default class FreeCursor extends AbstractShape{
    constructor(point){
        super();
        this.p=point;
    }
    drawSelf(ctx, realRect,  screenRect){
        this.refresh(realRect,screenRect);
        ctx.strokeStyle=this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=this.getStyle().getWidth();
        let size=15;
        let rectSize=6;
        ctx.beginPath();
        ctx.moveTo(this.p0.x-size,this.p0.y);
        ctx.lineTo(this.p0.x+size,this.p0.y);
        ctx.moveTo(this.p0.x,this.p0.y-size);
        ctx.lineTo(this.p0.x,this.p0.y+size);
        ctx.strokeRect(this.p0.x-rectSize/2,this.p0.y-rectSize/2,rectSize,rectSize);
        ctx.stroke();
    }
    refresh( realRect,  screenRect){
        this.p0 = Geometry.realToScreen(this.p,realRect,screenRect);
    }
    setCoord( point) {
        this.p=point;
    }
}
