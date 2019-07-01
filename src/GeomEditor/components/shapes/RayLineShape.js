import Geometry,{Coord2D,Circle} from "../../utils/geometry";
import EndSnapMarker from './snapmarkers/EndSnapMarker';
import AbstractShape from "./AbstractShape";

export default class RayLineShape extends AbstractShape{
    constructor(line){
        super();
        this.line=line;
        
    }
    drawSelf(ctx,realRect, screenRect){
        this.refresh(realRect,screenRect);
        if(this.p0===null||this.p1===null) return;
        ctx.strokeStyle=this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=this.getStyle().getWidth();
        ctx.beginPath();
        ctx.moveTo(this.p0.x,this.p0.y);
        ctx.lineTo(this.p1.x,this.p1.y);
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        let br=new Coord2D(realRect.topLeft.x+realRect.width,realRect.topLeft.y-realRect.height);
        let c=Geometry.midPoint(realRect.topLeft,br);
        let rad=Geometry.distance(realRect.topLeft,br)/2;
        let circle=new Circle(c,rad);
        let p=Geometry.CircleRayLineIntersection(this.line,circle);
        if(p!=null){
            if(p.length===1){
                let r=p[0];
                p=new Array(2);
                p[0]=this.line.origin;
                p[1]=r;
            }
            this.p0=Geometry.realToScreen(p[0],realRect,screenRect);
            this.p1=Geometry.realToScreen(p[1],realRect,screenRect);
        }else{
            this.p0=null;
            this.p1=null;
        }
    }
    getModel(){
        return this.line;
    }

    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.line.origin));
        return list;
    }
    getProperties(){
        let prop=new Map();
        prop.set('Title','Ray line');
        prop.set('X', this.line.origin.x);
        prop.set('Y', this.line.origin.y);
        prop.set('VX',this.line.vector.x);
        prop.set('VY',this.line.vector.y);
        return prop;
    }
    setProperties(prop){
        super.setProperties(prop);
        let x=prop.get('X');
        let y=prop.get('Y');
        let vx=prop.get('VX');
        let vy=prop.get('VY');
        if (x)  this.line.origin.x=x;
        if (y)  this.line.origin.y=y;
        if (vx) this.line.vector.x=vx;
        if (vy) this.line.vector.y=vy;
    }
    toString(){
        return `Ray origin (${this.line.origin.x},${this.line.origin.y}) vector(${this.line.vector.x},${this.line.vector.y})`;
    }

}