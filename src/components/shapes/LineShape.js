import Geometry from '../../utils/geometry/geometry';

export default class LineShape {
    constructor(line){
        this.p=[];
        this.p[0]=line.p1;
        this.p[1]=line.p2;
        this.line=line;
    }
    drawSelf(ctx,realRect, screenRect){
        let p0=Geometry.realToScreen(this.line.p1,realRect,screenRect);
        let p1 = Geometry.realToScreen(this.line.p2, realRect, screenRect);
        ctx.beginPath();
        ctx.moveTo(p0.x,p0.y);
        ctx.lineTo(p1.x,p1.y);
        ctx.stroke();
    }
    setColor(color){
        this.style.setColor(color);
    }
    getColor(){
        return this.style.getColor();
    }
    toString(){
        return "p1("+this.p[0].x+","+this.p[0].y+") p2("+this.p[1].x+","+this.p[1].y+")";
    }

    getStyle() {
        return this.style;
    }

    setStyle(style) {
        this.style = style;
    }
}