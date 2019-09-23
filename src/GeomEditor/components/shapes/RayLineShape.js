import Geometry,{Coord2D,Circle, Intersection} from "../../utils/geometry";
import EndSnapMarker from './markers/EndSnapMarker';
import Shape from "./Shape";
import ActivePointMarker from "./markers/ActivePointMarker";
import Screen from "../Screen";

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
        const boundedCircleRadius=Geometry.distance(realRect.topLeft,realRect.bottomRight)/2;
        if(this.activePoint) 
            this.activePointMarker=new ActivePointMarker(new Circle(this.activePoint,boundedCircleRadius* Screen.MARKER_SIZE))
    }
    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.line.origin));
        return list;
    }
    setActivePoint(key){
        this.activePoint=null;
        if(key==='Origin') this.activePoint=this.line.origin;
        //if(key==='P2') this.activePoint=this.line.p2;
    }
    getProperties(){
        let prop=new Map();
        prop.set('Title',{value:'RLine',regexp:/\s*/});
        prop.set('Origin',{value:{x:this.line.origin.x,y:this.line.origin.y},regexp:/^-?\d*\.?\d*$/});
        prop.set('Direction',{value:{x:this.line.vector.x,y:this.line.vector.y},regexp:/^-?\d*\.?\d*$/});
        return prop;
    }
    setProperty(prop){
        super.setProperty(prop);
        switch(prop.key){
            case 'Origin':
                this.line.origin.x=prop.value.x;
                this.line.origin.y=prop.value.y;
                break;
            case 'Direction':
                this.line.vector.x=prop.value.x;
                this.line.vector.y=prop.value.y;
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