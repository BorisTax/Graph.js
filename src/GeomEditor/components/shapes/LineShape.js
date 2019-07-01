import Geometry from '../../utils/geometry';
import EndSnapMarker from './snapmarkers/EndSnapMarker';
import MiddleSnapMarker from './snapmarkers/MiddleSnapMarker';
import AbstractShape from "./AbstractShape";

export default class LineShape extends AbstractShape{
    constructor(line){
        super();
        this.p=[];
        this.p[0]=line.p1;
        this.p[1]=line.p2;
        this.line=line;
    }
    drawSelf(ctx,realRect, screenRect){
        this.refresh(realRect, screenRect);
        ctx.strokeStyle=this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=this.getStyle().getWidth();
        ctx.beginPath();
        ctx.moveTo(this.p0.x,this.p0.y);
        ctx.lineTo(this.p1.x,this.p1.y);
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        this.p0 = Geometry.realToScreen(this.line.p1,realRect,screenRect);
        this.p1 = Geometry.realToScreen(this.line.p2, realRect, screenRect);
    }
    getModel(){
        return this.line;
    }
    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.line.p1));
        list.push(new EndSnapMarker(this.line.p2));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.line.p1,this.line.p2)))
        return list;
    }
    getProperties(){
        let prop=new Map();
        prop.set('Title','Line');
        prop.set('X1',this.line.p1.x);
        prop.set('Y1',this.line.p1.y);
        prop.set('X2',this.line.p2.x);
        prop.set('Y2',this.line.p2.y);
        return prop;
    }
    setProperties(prop){
        super.setProperties(prop);
        let x1=prop.get('X1');
        let y1=prop.get('Y1');
        let x2=prop.get('X2');
        let y2=prop.get('Y2');
        if (x1) this.line.p1.x=x1;
        if (y1) this.line.p1.y=y1;
        if (x2) this.line.p2.x=x2;
        if (y2) this.line.p2.y=y2;
    }
    toString(){
            return `Line P1(${this.line.p1.x},${this.line.p1.y}) P2(${this.line.p2.x},${this.line.p2.y})`;
    }

}