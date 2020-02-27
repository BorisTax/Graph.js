import Geometry, { Intersection} from '../../utils/geometry';
import EndSnapMarker from './markers/EndSnapMarker';
import MiddleSnapMarker from './markers/MiddleSnapMarker';
import Shape from "./Shape";
import PointPicker from './pickers/PointPicker';
import PointMarker from './markers/PointMarker';

export default class LineShape extends Shape{
    constructor(line){
        super();
        this.model=line;
        this.controlPoints=[
            {point:line.p1,show:false,selected:false},
            {point:line.p2,show:false,selected:false}]
        for(let cp of this.controlPoints)
          cp.marker=new PointMarker(cp.point,false)
    }
    drawSelf(ctx,realRect, screenRect){
        super.drawSelf(ctx,realRect, screenRect)
        ctx.beginPath();
        ctx.moveTo(this.p0.x,this.p0.y);
        ctx.lineTo(this.p1.x,this.p1.y);
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        this.p0 = Geometry.realToScreen(this.controlPoints[0].point,realRect,screenRect);
        this.p1 = Geometry.realToScreen(this.controlPoints[1].point, realRect, screenRect);

    }
    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.controlPoints[0].point));
        list.push(new EndSnapMarker(this.controlPoints[1].point));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.controlPoints[0].point,this.controlPoints[1].point)))
        return list;
    }
    setActivePoint(key){
        super.setActivePoint();
        if(key==='p0') {this.selectPoint(0)}
        if(key==='p1') {this.selectPoint(1)}
    }
    getProperties(){
        let prop=new Map();
        prop.set('Title',{value:'Line',regexp:/\s*/});
        prop.set("p0",{value:{x:this.controlPoints[0].point.x,y:this.controlPoints[0].point.y},selected:this.controlPoints[0].selected,picker:PointPicker,regexp:/^-?\d*\.?\d*$/});
        prop.set("p1",{value:{x:this.controlPoints[1].point.x,y:this.controlPoints[1].point.y},selected:this.controlPoints[1].selected,picker:PointPicker,regexp:/^-?\d*\.?\d*$/});
        return prop;
    }
    setProperty(prop){
        super.setProperty(prop);
        switch(prop.key){
            case 'p0':
                this.controlPoints[0].point.x=prop.value.x;
                this.controlPoints[0].point.y=prop.value.y;
                break;
            case 'p1':
                this.controlPoints[1].point.x=prop.value.x;
                this.controlPoints[1].point.y=prop.value.y;
                break;
            default:
        }
    }
    move(distance){
       super.move(distance);
    }
    
    createMockShape(){
        super.createMockShape(new LineShape({p1:{...this.controlPoints[0].point},p2:{...this.controlPoints[1].point}}));
    }

    applyTransform(){
        super.applyTransform();

    }
    copyShape(){
        return new LineShape({p1:{...this.controlPoints[0].point},p2:{...this.controlPoints[1].point}});
    }

    getDistance(point) {
        return Geometry.PointToLineDistance(point,{p1:this.controlPoints[0].point,p2:this.controlPoints[1].point});
    }

    isInRect(topLeft,bottomRight){
        const inRect=[Geometry.pointInRect(this.controlPoints[0].point,topLeft,bottomRight),
                        Geometry.pointInRect(this.controlPoints[1].point,topLeft,bottomRight)];
        const full=inRect.every(i=>i===true);
        const cross=Intersection.LineRectangle({p1:this.controlPoints[0].point,p2:this.controlPoints[1].point},topLeft,bottomRight).length>0;
        return {cross,full};    
    }
    toString(){
            return `Line P1(${this.controlPoints[0].point.x},${this.controlPoints[0].point.y}) P2(${this.controlPoints[1].point.x},${this.controlPoints[1].point.y})`;
    }

}