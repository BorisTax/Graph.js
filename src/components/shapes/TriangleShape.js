import Geometry, {Coord2D,Line,Intersection} from '../../utils/geometry';
import EndSnapMarker from './markers/EndSnapMarker';
import MiddleSnapMarker from './markers/MiddleSnapMarker';
import Shape from "./Shape";
import PointMarker from './markers/PointMarker';
import PointPicker from './pickers/PointPicker';

export default class TriangleShape extends Shape{
    constructor(triangle){
        super();
        this.p=[new Coord2D(),new Coord2D(),new Coord2D()];
        this.triangle=triangle;
        this.model=triangle;
        this.controlPoints=[
            {point:this.triangle.points[0],show:false,selected:false},
            {point:this.triangle.points[1],show:false,selected:false},
            {point:this.triangle.points[2],show:false,selected:false}]
        for(let cp of this.controlPoints)
          cp.marker=new PointMarker(cp.point,false)
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
        if(this.activePoint) 
            this.activePointMarker=new PointMarker(this.activePoint)
    }
    setActivePoint(key){
        super.setActivePoint();
        if(key==='P1') {this.controlPoints[0].selected=true;this.controlPoints[0].marker.setActive(true)}
        if(key==='P2') {this.controlPoints[1].selected=true;this.controlPoints[1].marker.setActive(true)}
        if(key==='P3') {this.controlPoints[2].selected=true;this.controlPoints[2].marker.setActive(true)}
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
        prop.set('Title',{value:'Triangle',regexp:/\s*/});
        prop.set('P1',{value:{x:this.triangle.points[0].x,y:this.triangle.points[0].y},picker:PointPicker,regexp:/^-?\d*\.?\d*$/});
        prop.set('P2',{value:{x:this.triangle.points[1].x,y:this.triangle.points[1].y},picker:PointPicker,regexp:/^-?\d*\.?\d*$/});
        prop.set('P3',{value:{x:this.triangle.points[2].x,y:this.triangle.points[2].y},picker:PointPicker,regexp:/^-?\d*\.?\d*$/});
        return prop;
    }
    setProperty(prop){
        super.setProperty(prop);
        switch(prop.key){
            case 'P1':
                this.triangle.points[0].x=prop.value.x;
                this.triangle.points[0].y=prop.value.y;
                this.controlPoints[0].point=this.triangle.points[0];
                break;
            case 'P2':
                this.triangle.points[1].x=prop.value.x;
                this.triangle.points[1].y=prop.value.y;
                this.controlPoints[1].point=this.triangle.points[1];
                break;
            case 'P3':
                this.triangle.points[2].x=prop.value.x;
                this.triangle.points[2].y=prop.value.y;
                this.controlPoints[2].point=this.triangle.points[2];
                break;
            default:
        }
    }
    getDistance(point) {
        let l1=new Line(this.triangle.points[0],this.triangle.points[1]);
        let l2=new Line(this.triangle.points[1],this.triangle.points[2]);
        let l3=new Line(this.triangle.points[2],this.triangle.points[0]);
        return Math.min(Geometry.PointToLineDistance(point,l1),
        Geometry.PointToLineDistance(point,l2),
        Geometry.PointToLineDistance(point,l3));
    }
    isInRect(topLeft,bottomRight){
        const inRect=[Geometry.pointInRect(this.triangle.points[0],topLeft,bottomRight),
                        Geometry.pointInRect(this.triangle.points[1],topLeft,bottomRight),
                        Geometry.pointInRect(this.triangle.points[2],topLeft,bottomRight)];
        const full=inRect.every(i=>i===true);
        const ps=[Intersection.LineRectangle(new Line(this.triangle.points[0],this.triangle.points[1]),topLeft,bottomRight),
                    Intersection.LineRectangle(new Line(this.triangle.points[1],this.triangle.points[2]),topLeft,bottomRight),
                    Intersection.LineRectangle(new Line(this.triangle.points[2],this.triangle.points[0]),topLeft,bottomRight)];
        const cross=ps.some(p=>p.length>0);
        return {cross,full};    
    }
    toString(){
        return "Triangle";
    }
}