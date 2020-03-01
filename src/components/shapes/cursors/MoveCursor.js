import Cursor from "./Cursor";

export default class MoveCursor extends Cursor{
    drawSelf(ctx, realRect,  screenRect){
        this.refresh(realRect,screenRect);
        ctx.strokeStyle=this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=2;
        const path=new Path2D(`M${this.p0.x} ${this.p0.y}l0 -14m0 14l0 14m0 -14l14 0m-14 0l-14 0m14 -14l1.92 2.71m-1.92 25.29l-1.92 -2.71m15.92 -11.29l-2.71 1.92m-25.29 -1.92l2.71 -1.92m11.29 -12.08l-1.92 2.71m1.92 25.29l1.92 -2.71m12.08 -11.29l-2.71 -1.92m-25.29 1.92l2.71 1.92`);
        ctx.fill(path);
        ctx.stroke(path);
    }

}
