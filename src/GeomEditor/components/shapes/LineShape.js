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
    setProperty(prop){
        super.setProperty(prop);
        switch(prop.key){
            case 'X1':
                this.line.p1.x=prop.value;
                break;
            case 'Y1':
                this.line.p1.y=prop.value;
                break;
            case 'X2':
                this.line.p2.x=prop.value;
                break;
            case 'Y2':
                this.line.p2.y=prop.value;
                break;
            default:
        }
    }
    toString(){
            return `Line P1(${this.line.p1.x},${this.line.p1.y}) P2(${this.line.p2.x},${this.line.p2.y})`;
    }

}