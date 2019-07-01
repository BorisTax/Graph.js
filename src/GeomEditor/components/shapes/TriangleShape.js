import Geometry, {Coord2D} from '../../utils/geometry';
import EndSnapMarker from './snapmarkers/EndSnapMarker';
import MiddleSnapMarker from './snapmarkers/MiddleSnapMarker';
import AbstractShape from "./AbstractShape";

export default class TriangleShape extends AbstractShape{
    constructor(triangle){
        super();
        this.p=[new Coord2D(),new Coord2D(),new Coord2D()];
        this.triangle=triangle;
    }
    drawSelf(ctx,realRect, screenRect){
        this.refresh(realRect,screenRect);
        ctx.strokeStyle=this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=this.getStyle().getWidth();
        ctx.beginPath();
        ctx.moveTo(this.p[0].x,this.p[0].y);
        ctx.lineTo(this.p[1].x,this.p[1].y);
        ctx.lineTo(this.p[2].x,this.p[2].y);
        ctx.lineTo(this.p[0].x,this.p[0].y);
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        for (let i=0;i<3;i++) this.p[i]=Geometry.realToScreen(this.triangle.points[i],realRect,screenRect);
    }
    getModel(){
        return this.triangle;
    }
    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.triangle.points[0]));
        list.push(new EndSnapMarker(this.triangle.points[1]));
        list.push(new EndSnapMarker(this.triangle.points[2]));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.triangle.points[0],this.triangle.points[1])));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.triangle.points[1],this.triangle.points[2])));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.triangle.points[2],this.triangle.points[0])));
        return list;
    }
    getProperties(){
        let prop=new Map();
        prop.set('Title','Triangle');
        prop.set('X1',this.triangle.points[0].x);
        prop.set('Y1',this.triangle.points[0].y);
        prop.set('X2',this.triangle.points[1].x);
        prop.set('Y2',this.triangle.points[1].y);
        prop.set('X3',this.triangle.points[2].x);
        prop.set('Y3',this.triangle.points[2].y);
        return prop;
    }
    setProperties(prop){
        super.setProperties(prop);
        let x1=prop.get('X1');
        let y1=prop.get('Y1');
        let x2=prop.get('X2');
        let y2=prop.get('Y2');
        let x3=prop.get('X3');
        let y3=prop.get('Y3');
        if (x1) this.triangle.points[0].x=x1;
        if (y1) this.triangle.points[0].y=y1;
        if (x2) this.triangle.points[1].x=x2;
        if (y2) this.triangle.points[1].y=y2;
        if (x3) this.triangle.points[2].x=x3;
        if (y3) this.triangle.points[2].y=y3;
    }
    toString(){
        return "Triangle";
    }
}