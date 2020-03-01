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
        this.properties=[
            {type:Shape.PropertyTypes.STRING,value:'Line'},
            {type:Shape.PropertyTypes.VERTEX,value:line.p1,show:false,selected:false,picker:PointPicker,regexp:Shape.RegExp.NUMBER},
            {type:Shape.PropertyTypes.VERTEX,value:line.p2,show:false,selected:false,picker:PointPicker,regexp:Shape.RegExp.NUMBER},
        ]
        for(let p of this.properties)
          if(p.type===Shape.PropertyTypes.VERTEX) p.marker=new PointMarker(p.value,false)
    }
    drawSelf(ctx,realRect, screenRect){
        super.drawSelf(ctx,realRect, screenRect)
        ctx.beginPath();
        ctx.moveTo(this.p0.x,this.p0.y);
        ctx.lineTo(this.p1.x,this.p1.y);
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        this.p0 = Geometry.realToScreen(this.properties[1].value,realRect,screenRect);
        this.p1 = Geometry.realToScreen(this.properties[2].value, realRect, screenRect);

    }
    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.properties[1].value));
        list.push(new EndSnapMarker(this.properties[2].value));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.properties[1].value,this.properties[2].value)))
        return list;
    }

    refreshModel(){
        this.model.p1=this.properties[1].value;
        this.model.p2=this.properties[2].value;
     }

    getDistance(point) {
        return Geometry.PointToLineDistance(point,{p1:this.model.p1,p2:this.model.p2});
    }

    isInRect(topLeft,bottomRight){
        const inRect=[Geometry.pointInRect(this.model.p1,topLeft,bottomRight),
                        Geometry.pointInRect(this.model.p2,topLeft,bottomRight)];
        const full=inRect.every(i=>i===true);
        const cross=Intersection.LineRectangle({p1:this.model.p1,p2:this.model.p2},topLeft,bottomRight).length>0;
        return {cross,full};    
    }
    toString(){
            return `Line P1(${this.this.model.p1.x},${this.this.model.p1.y}) P2(${this.model.p2.x},${this.model.p2.y})`;
    }

}