import Geometry from "../../../utils/geometry";
import Cursor from "./Cursor";

export default class DragCursor extends Cursor{

    drawArrow(ctx,pts){
        ctx.beginPath();
        ctx.moveTo(pts[0].x,pts[0].y);
        ctx.lineTo(pts[1].x,pts[1].y);
        ctx.moveTo(pts[2].x,pts[2].y);
        ctx.lineTo(pts[1].x,pts[1].y);
        ctx.moveTo(pts[1].x,pts[1].y);
        ctx.lineTo(pts[3].x,pts[3].y);
        ctx.stroke();
    }
    drawSelf(ctx, realRect,  screenRect){
        this.refresh(realRect,screenRect);
        ctx.strokeStyle=this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=2;
        let size=10;
        let pts=new Array(4);
        pts[0]=this.p0;
        pts[1]={x:pts[0].x,y:pts[0].y-size};
        pts[2]={x:pts[0].x-size/3,y:pts[0].y-size*2/3};
        pts[3]={x:pts[0].x+size/3,y:pts[0].y-size*2/3};
        this.drawArrow(ctx,pts);
        this.drawArrow(ctx,pts.map(p=>Geometry.rotatePoint(p,Math.PI/2,this.p0)));
        this.drawArrow(ctx,pts.map(p=>Geometry.rotatePoint(p,Math.PI,this.p0)));
        this.drawArrow(ctx,pts.map(p=>Geometry.rotatePoint(p,Math.PI*3/2,this.p0)));

    }

}
