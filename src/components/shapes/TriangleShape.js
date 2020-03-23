import Geometry, {Coord2D,Line,Intersection} from '../../utils/geometry';
import EndSnapMarker from './markers/EndSnapMarker';
import MiddleSnapMarker from './markers/MiddleSnapMarker';
import Shape from "./Shape";
import PointMarker from './markers/PointMarker';
import PointPicker from './pickers/PointPicker';

export default class TriangleShape extends Shape{
    constructor(model){
        super();
        this.p=[new Coord2D(),new Coord2D(),new Coord2D()];
        this.model=model;
        this.properties=[
            {type:Shape.PropertyTypes.STRING,value:'Triangle'},
            {type:Shape.PropertyTypes.VERTEX,value:this.model.points[0],show:false,selected:false,picker:PointPicker,regexp:/^-?\d+\.?\d*$/},
            {type:Shape.PropertyTypes.VERTEX,value:this.model.points[1],show:false,selected:false,picker:PointPicker,regexp:/^-?\d+\.?\d*$/},
            {type:Shape.PropertyTypes.VERTEX,value:this.model.points[2],show:false,selected:false,picker:PointPicker,regexp:/^-?\d+\.?\d*$/},
        ]
        for(let p of this.properties)
          if(p.type===Shape.PropertyTypes.VERTEX) p.marker=new PointMarker(p.value,false)
    }
    drawSelf(ctx,realRect, screenRect){
        super.drawSelf(ctx,realRect, screenRect)
        ctx.beginPath();
        ctx.moveTo(this.p[0].x+0.5,this.p[0].y+0.5);
        ctx.lineTo(this.p[1].x+0.5,this.p[1].y+0.5);
        ctx.lineTo(this.p[2].x+0.5,this.p[2].y+0.5);
        ctx.lineTo(this.p[0].x+0.5,this.p[0].y+0.5);
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        for (let i=0;i<3;i++) this.p[i]=Geometry.realToScreen(this.model.points[i],realRect,screenRect);
    }

    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.model.points[0]));
        list.push(new EndSnapMarker(this.model.points[1]));
        list.push(new EndSnapMarker(this.model.points[2]));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.model.points[0],this.model.points[1])));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.model.points[1],this.model.points[2])));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.model.points[2],this.model.points[0])));
        return list;
    }
     
    refreshModel(){
        this.model.points[0].x=this.properties[1].value.x;
        this.model.points[0].y=this.properties[1].value.y;
        this.model.points[1].x=this.properties[2].value.x;
        this.model.points[1].y=this.properties[2].value.y;
        this.model.points[2].x=this.properties[3].value.x;
        this.model.points[2].y=this.properties[3].value.y;
     }

    getDistance(point) {
        let l1=new Line(this.model.points[0],this.model.points[1]);
        let l2=new Line(this.model.points[1],this.model.points[2]);
        let l3=new Line(this.model.points[2],this.model.points[0]);
        return Math.min(Geometry.PointToLineDistance(point,l1),
        Geometry.PointToLineDistance(point,l2),
        Geometry.PointToLineDistance(point,l3));
    }
    isInRect(topLeft,bottomRight){
        const inRect=[Geometry.pointInRect(this.model.points[0],topLeft,bottomRight),
                        Geometry.pointInRect(this.model.points[1],topLeft,bottomRight),
                        Geometry.pointInRect(this.model.points[2],topLeft,bottomRight)];
        const full=inRect.every(i=>i===true);
        const ps=[Intersection.LineRectangle(new Line(this.model.points[0],this.model.points[1]),topLeft,bottomRight),
                    Intersection.LineRectangle(new Line(this.model.points[1],this.model.points[2]),topLeft,bottomRight),
                    Intersection.LineRectangle(new Line(this.model.points[2],this.model.points[0]),topLeft,bottomRight)];
        const cross=ps.some(p=>p.length>0);
        return {cross,full};    
    }
    toString(){
        return "Triangle";
    }
}