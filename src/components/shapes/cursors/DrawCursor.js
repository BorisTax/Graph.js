import Cursor from "./Cursor";

export default class DrawCursor extends Cursor{

    drawSelf(ctx, realRect,  screenRect){
        this.refresh(realRect,screenRect);
        ctx.strokeStyle=this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=this.getStyle().getWidth();
        let size=10;
        ctx.beginPath();
        ctx.moveTo(this.p0.x-size,this.p0.y);
        ctx.lineTo(this.p0.x+size,this.p0.y);
        ctx.moveTo(this.p0.x,this.p0.y-size);
        ctx.lineTo(this.p0.x,this.p0.y+size);
        ctx.stroke();
    }
}
