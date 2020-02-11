import Geometry, { Intersection} from '../../utils/geometry';
import EndSnapMarker from './markers/EndSnapMarker';
import MiddleSnapMarker from './markers/MiddleSnapMarker';
import Shape from "./Shape";
import PointPicker from './pickers/PointPicker';
import PointMarker from './markers/PointMarker';

export default class LineShape extends Shape{
    constructor(line){
        super();
        this.p=[];
        this.p[0]=line.p1;
        this.p[1]=line.p2;
        this.line=line;
        this.model=line;
        this.controlPoints=[
            {point:this.p[0],show:false,selected:false},
            {point:this.p[1],show:false,selected:false}]
        for(let cp of this.controlPoints)
          cp.marker=new PointMarker(cp.point,false)
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
    setActivePoint(key){
        super.setActivePoint();
        if(key==='P1') {this.controlPoints[0].selected=true;this.controlPoints[0].marker.setActive(true)}
        if(key==='P2') {this.controlPoints[1].selected=true;this.controlPoints[1].marker.setActive(true)}
    }
    getProperties(){
        let prop=new Map();
        prop.set('Title',{value:'Line',regexp:/\s*/});
        prop.set('P1',{value:{x:this.line.p1.x,y:this.line.p1.y},selected:this.controlPoints[0].selected,picker:PointPicker,regexp:/^-?\d*\.?\d*$/});
        prop.set('P2',{value:{x:this.line.p2.x,y:this.line.p2.y},selected:this.controlPoints[1].selected,picker:PointPicker,regexp:/^-?\d*\.?\d*$/});
        return prop;
    }
    setProperty(prop){
        super.setProperty(prop);
        switch(prop.key){
            case 'P1':
                this.line.p1.x=prop.value.x;
                this.line.p1.y=prop.value.y;
                this.controlPoints[0].point=this.line.p1;
                break;
            case 'P2':
                this.line.p2.x=prop.value.x;
                this.line.p2.y=prop.value.y;
                this.controlPoints[1].point=this.line.p2;
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