import Geometry, { Intersection } from '../../utils/geometry';
import EndSnapMarker from './snapmarkers/EndSnapMarker';
import MiddleSnapMarker from './snapmarkers/MiddleSnapMarker';
import Shape from "./Shape";

export default class LineShape extends Shape{
    constructor(line){
        super();
        this.p=[];
        this.p[0]=line.p1;
        this.p[1]=line.p2;
        this.line=line;
        this.model=line;
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
    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.line.p1));
        list.push(new EndSnapMarker(this.line.p2));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.line.p1,this.line.p2)))
        return list;
    }
    getProperties(){
        let prop=new Map();
         prop.set('Title',{value:'Line',regexp:/\s*/});
        prop.set('X1',{value:this.line.p1.x,regexp:/^-?\d*\.?\d*$/});
        prop.set('Y1',{value:this.line.p1.y,regexp:/^-?\d*\.?\d*$/});
        prop.set('X2',{value:this.line.p2.x,regexp:/^-?\d*\.?\d*$/});
        prop.set('Y2',{value:this.line.p2.y,regexp:/^-?\d*\.?\d*$/});
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
    getDistance(point) {
        return Geometry.PointToLineDistance(point,this.line);
    }
    isInRect(topLeft,bottomRight){
        const inRect=[Geometry.pointInRect(this.line.p1,topLeft,bottomRight),
                        Geometry.pointInRect(this.line.p2,topLeft,bottomRight)];
        const full=inRect.every(i=>i===true);
        const cross=Intersection.LineRectangle(this.line,topLeft,bottomRight).length>0;
        return {cross,full};    
    }
    toString(){
            return `Line P1(${this.line.p1.x},${this.line.p1.y}) P2(${this.line.p2.x},${this.line.p2.y})`;
    }

}