import Geometry, { Intersection} from '../../../utils/geometry';
import EndSnapMarker from '../markers/EndSnapMarker';
import Shape from "../Shape";
import PointPicker from '../pickers/PointPicker';
import ShapeStyle from '../ShapeStyle';
import { Color } from '../../colors';
import TextShape from '../TextShape';
import { Vector } from '../../../utils/geometry';
import {PropertyTypes} from "../PropertyData";
export default class DistanceShape extends Shape{
    constructor(line,style=new ShapeStyle(Color.BLACK,ShapeStyle.DASH)){
        super();
        this.model=line;
        this.text=new TextShape();
        this.text.setAnchor(TextShape.CENTER)
        this.text.setFont('10px sans-serif')
        //this.style=style;
        this.setStyle(style);
        this.xAxe=new Vector({x:0,y:0},{x:1,y:0});
        this.properties=[
            {type:PropertyTypes.STRING,value:'Line'},
            {type:PropertyTypes.VERTEX,value:line.p1,picker:PointPicker},
            {type:PropertyTypes.VERTEX,value:line.p2,picker:PointPicker},
        ]
        this.defineProperties();
        this.refreshModel();
    }
    drawSelf(ctx,realRect, screenRect){
        super.drawSelf(ctx,realRect, screenRect)
        ctx.beginPath();
        ctx.moveTo(this.p0.x,this.p0.y);
        ctx.lineTo(this.p1.x,this.p1.y);
        ctx.stroke();
        this.text.drawSelf(ctx,realRect, screenRect);
    }
    refresh(realRect, screenRect){
        this.p0 = Geometry.realToScreen(this.properties[1].value,realRect,screenRect);
        this.p1 = Geometry.realToScreen(this.properties[2].value, realRect, screenRect);
        this.text.refresh(realRect, screenRect);
    }
    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.properties[1].value));
        list.push(new EndSnapMarker(this.properties[2].value));
        //list.push(new MiddleSnapMarker(Geometry.midPoint(this.properties[1].value,this.properties[2].value)))
        return list;
    }

    refreshModel(){
        this.model.p1=this.properties[1].value;
        this.model.p2=this.properties[2].value;
        this.text.setText(Geometry.distance(this.model.p1,this.model.p2).toFixed(4))
        this.text.setPoint(Geometry.midPoint(this.model.p1,this.model.p2))
        const v=new Vector(this.model.p1,this.model.p2);
        let angle=Geometry.angleVectors(v,this.xAxe);
        if(v.x<0)angle=Math.PI+angle;
        this.text.rotate(angle);
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
    getDescription(){
        return 'Distance';
    }

}