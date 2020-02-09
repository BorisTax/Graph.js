import Geometry,{Coord2D,Circle, Intersection} from "../../utils/geometry";
import EndSnapMarker from './markers/EndSnapMarker';
import Shape from "./Shape";
import PointMarker from "./markers/PointMarker";
import PointPicker from "./pickers/PointPicker";

export default class RayLineShape extends Shape{
    constructor(line){
        super();
        this.line=line;
        this.model=line;
        this.controlPoints=[
            {point:this.line.origin,show:false,selected:false},
            {point:this.line.directionPoint,show:false,selected:false}]
        for(let cp of this.controlPoints)
          cp.marker=new PointMarker(cp.point,false)
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
        if(this.activePoint) 
            this.activePointMarker=new PointMarker(this.activePoint)
    }
    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.line.origin));
        return list;
    }
    setActivePoint(key){
        super.setActivePoint();
        if(key==='Origin') {this.controlPoints[0].selected=true;this.controlPoints[0].marker.setActive(true)}
        if(key==='Direction') {this.controlPoints[1].selected=true;this.controlPoints[1].marker.setActive(true)}
    }
    getProperties(){
        let prop=new Map();
        prop.set('Title',{value:'RLine',regexp:/\s*/});
        prop.set('Origin',{value:{x:this.line.origin.x,y:this.line.origin.y},picker:PointPicker,regexp:/^-?\d*\.?\d*$/});
        prop.set('Direction',{value:{x:this.line.origin.x+this.line.vector.x,y:this.line.origin.y+this.line.vector.y},picker:PointPicker,regexp:/^-?\d*\.?\d*$/});
        return prop;
    }
    setProperty(prop){
        super.setProperty(prop);
        switch(prop.key){
            case 'Origin':
                this.line.origin.x=prop.value.x;
                this.line.origin.y=prop.value.y;
                this.line.directionPoint.x=this.line.origin.x+this.line.vector.x;
                this.line.directionPoint.y=this.line.origin.y+this.line.vector.y;
                this.controlPoints[0].point=this.line.origin;
                this.controlPoints[1].point=this.line.directionPoint;
                break;
            case 'Direction':
                this.line.vector.x=prop.value.x-this.line.origin.x;
                this.line.vector.y=prop.value.y-this.line.origin.y;
                this.line.directionPoint.x=this.line.origin.x+this.line.vector.x;
                this.line.directionPoint.y=this.line.origin.y+this.line.vector.y;
                this.controlPoints[1].point=this.line.directionPoint;
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