import Geometry from "../../utils/geometry/geometry";

export default class RayLineShape {
    constructor(line, circle){
        this.p=Geometry.CircleRayLineIntersection(line,circle);
        this.line=line;
        this.refresh(circle);
    }
    drawSelf(ctx,realRect, screenRect){
        if(this.p==null) return;
        let p0=Geometry.realToScreen(this.p[0],realRect,screenRect);
        let p1=Geometry.realToScreen(this.p[1],realRect,screenRect);
        ctx.beginPath();
        ctx.moveTo(p0.x,p0.y);
        ctx.lineTo(p1.x,p1.y);
        ctx.stroke();
    }
    refresh(circle){
        this.p=Geometry.CircleRayLineIntersection(this.line,circle);
        if(this.p!=null)
            if(this.p.length==1){
                let r=this.p[0];
                this.p=new Array(2);
                this.p[0]=this.line.origin;
                this.p[1]=r;
            }
    }
    setColor(color){
        this.style.setColor(color);
    }
    getColor(){
        return this.style.getColor();
    }

    getStyle() {
        return this.style;
    }
    setStyle(style) {
    this.style = style;
    }
}