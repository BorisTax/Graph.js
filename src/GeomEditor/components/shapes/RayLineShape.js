import Geometry,{Coord2D,Circle, Intersection} from "../../utils/geometry";
import EndSnapMarker from './snapmarkers/EndSnapMarker';
import Shape from "./Shape";

export default class RayLineShape extends Shape{
    constructor(line){
        super();
        this.line=line;
        this.model=line;
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
        let p=Intersection.CircleRLine(circle,this.line);
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
    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.line.origin));
        return list;
    }
    getProperties(){
        let prop=new Map();
        prop.set('Title',{value:'RLine',regexp:/\s*/});
        prop.set('X',{value:this.line.origin.x,regexp:/^-?\d*\.?\d*$/});
        prop.set('Y', {value:this.line.origin.y,regexp:/^-?\d*\.?\d*$/});
        prop.set('VX',{value:this.line.vector.x,regexp:/^-?\d*\.?\d*$/});
        prop.set('VY',{value:this.line.vector.y,regexp:/^-?\d*\.?\d*$/});
        return prop;
    }
    setProperty(prop){
        super.setProperty(prop);
        switch(prop.key){
            case 'X':
                this.line.origin.x=prop.value;
                break;
            case 'Y':
                this.line.origin.y=prop.value;
                break;
            case 'VX':
                this.line.vector.x=prop.value;
                break;
            case 'VY':
                this.line.vector.y=prop.value;
                break;
            default:
        }
    }
    getDistance(point) {
        return Geometry.PointToRLineDistance(point,this.line);
    }
    isInRect(topLeft,bottomRight){
        const full=false;
        const cross=Intersection.RectangleRLine(topLeft,bottomRight,this.line).length>0;
        return {cross,full};    
    }
    toString(){
        return `Ray origin (${this.line.origin.x},${this.line.origin.y}) vector(${this.line.vector.x},${this.line.vector.y})`;
    }

}