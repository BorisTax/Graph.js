import Cursor from "./Cursor";

export default class RotateCursor extends Cursor{
    drawSelf(ctx, realRect,  screenRect){
        this.refresh(realRect,screenRect);
        ctx.strokeStyle=this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=1;
        const path=new Path2D(`M${this.p0.x} ${this.p0.y+15.07}c-8.38,-0.02 -15,-6.72 -15,-15 0,-8.3 6.7,-15.01 15,-15.01 8.28,0 14.96,7.15 15.15,15.46l-3.92 -3.89 3.92 3.89 3.48 -4.24`);
        ctx.stroke(path);
        ctx.beginPath();
        ctx.moveTo(this.p0.x-6,this.p0.y+0.5);
        ctx.lineTo(this.p0.x+6,this.p0.y+0.5);
        ctx.moveTo(this.p0.x+0.5,this.p0.y-6);
        ctx.lineTo(this.p0.x+0.5,this.p0.y+6);
        ctx.stroke();
    }

}
