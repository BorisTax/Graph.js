import Geometry, { Intersection} from '../../../utils/geometry';
//import EndSnapMarker from '../markers/EndSnapMarker';
import Shape from "../Shape";
import PointPicker from '../pickers/PointPicker';
import ShapeStyle from '../ShapeStyle';
import { Color } from '../../colors';
import TextShape from '../TextShape';
import { Vector } from '../../../utils/geometry';
import {PropertyTypes} from "../PropertyData";
export default class AngleShape extends Shape{
    constructor(triangle,style=new ShapeStyle(Color.BLACK,ShapeStyle.DASH)){
        super();
        this.model=triangle;
        this.text=new TextShape();
        this.text.setAnchor(TextShape.CENTER);
        this.text.setFont('10px sans-serif');
        this.text.setColor(style.getColor());
        //this.style=style;
        this.setStyle(style);
        //this.xAxe=new Vector({x:1,y:0},{x:0,y:0})
        this.properties=[
            {type:PropertyTypes.STRING,value:'Angle'},
            {type:PropertyTypes.VERTEX,value:triangle.p1,picker:PointPicker},
            {type:PropertyTypes.VERTEX,value:triangle.p2,picker:PointPicker},
            {type:PropertyTypes.VERTEX,value:triangle.p3,picker:PointPicker},
        ]
        this.defineProperties();
        this.refreshModel();
    }
    drawSelf(ctx,realRect, screenRect){
        super.drawSelf(ctx,realRect, screenRect)
        ctx.beginPath();
        ctx.moveTo(this.p0.x+0.5,this.p0.y+0.5);
        ctx.lineTo(this.p1.x+0.5,this.p1.y+0.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.p0.x+0.5,this.p0.y+0.5);
        ctx.lineTo(this.p2.x+0.5,this.p2.y+0.5);
        ctx.stroke();
        this.text.drawSelf(ctx,realRect, screenRect);
    }
    refresh(realRect, screenRect){
        this.p0 = Geometry.realToScreen(this.properties[1].value,realRect,screenRect);
        this.p1 = Geometry.realToScreen(this.properties[2].value, realRect, screenRect);
        this.p2 = Geometry.realToScreen(this.properties[3].value, realRect, screenRect);
        this.text.refresh(realRect, screenRect);
    }
    getMarkers(){
        let list=[];
        //list.push(new EndSnapMarker(this.properties[1].value));
        //list.push(new EndSnapMarker(this.properties[2].value));
        //list.push(new MiddleSnapMarker(Geometry.midPoint(this.properties[1].value,this.properties[2].value)))
        return list;
    }

    refreshModel(){
        this.model.p1=this.properties[1].value;
        this.model.p2=this.properties[2].value;
        this.model.p3=this.properties[3].value;
        this.angle=Geometry.angleVectors(new Vector(this.model.p1,this.model.p2),new Vector(this.model.p1,this.model.p3));
        this.angle=this.angle/Math.PI*180;
        this.text.setText(this.angle.toFixed(2));
        const p=Geometry.midPoint(Geometry.midPoint(this.model.p1,this.model.p2),Geometry.midPoint(this.model.p1,this.model.p3));
        this.text.setPoint(p);
        this.text.rotate(0);
        //console.log(p.x,p.y,this.angle);
        //let angle=Geometry.angleVectors(new Vector(this.model.p2,this.model.p1),this.xAxe);
        // if(angle<Math.PI/2)angle=angle*Math.sign(this.model.p1.y-this.model.p2.y);
        //     else angle=(Math.PI-angle)*Math.sign(this.model.p2.y-this.model.p1.y);
        //this.text.rotate(angle);
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
        return 'Angle';
    }

}