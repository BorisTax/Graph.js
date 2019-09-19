import Geometry, { Intersection, Circle } from '../../utils/geometry';
import EndSnapMarker from './snapmarkers/EndSnapMarker';
import MiddleSnapMarker from './snapmarkers/MiddleSnapMarker';
import Shape from "./Shape";
import {Color} from '../colors';
import CircleShape from './CircleShape';

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
        if(this.activePoint) {
            this.activePointMarker=new CircleShape(new Circle(this.activePoint,this.boundedCircle.radius* Screen.MARKER_SIZE));
            this.activePointMarker.setColor(Color.BLUE);
        }
    }
    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.line.p1));
        list.push(new EndSnapMarker(this.line.p2));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.line.p1,this.line.p2)))
        return list;
    }
    setActivePoint(key){
        this.activePoint=null;
        if(key==='P1') this.activePoint=this.points[0];
        if(key==='P2') this.activePoint=this.points[1];
    }
    getProperties(){
        let prop=new Map();
         prop.set('Title',{value:'Line',regexp:/\s*/});
        prop.set('P1',{value:{x:this.line.p1.x,y:this.line.p1.y},regexp:/^-?\d*\.?\d*$/});
        prop.set('P2',{value:{x:this.line.p2.x,y:this.line.p2.y},regexp:/^-?\d*\.?\d*$/});
        return prop;
    }
    setProperty(prop){
        super.setProperty(prop);
        switch(prop.key){
            case 'P1':
                this.line.p1.x=prop.value.x;
                this.line.p1.y=prop.value.y;
                break;
            case 'P2':
                this.line.p2.x=prop.value.x;
                this.line.p2.y=prop.value.y;
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