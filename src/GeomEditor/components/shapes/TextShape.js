import Geometry from '../../utils/geometry';
import Shape from "./Shape";

export default class TextShape extends Shape{
    constructor(text="",point={x:0,y:0}){
        super();
        this.p=point;
        this.text=text;
    }
    drawSelf(ctx,realRect, screenRect){
        this.refresh(realRect, screenRect);
        ctx.strokeStyle=this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=this.getStyle().getWidth();
        console.log(ctx.lineWidth)
        ctx.save();
        ctx.font=this.font;
        const newPoint=Geometry.rotatePoint(this.p0,this.angle,{x:0,y:0})
        ctx.translate(this.p0.x-newPoint.x,this.p0.y-newPoint.y);
        ctx.rotate(this.angle);
        ctx.strokeText(this.text,this.p0.x,this.p0.y);
        ctx.restore();
    }
    refresh(realRect, screenRect){
        this.p0 = Geometry.realToScreen(this.p,realRect,screenRect);
    }
    rotate(angle){
        this.angle=angle;
    }
    getMarkers(){
        let list=[];
        return list;
    }
    setText(text){
        this.text=text;
    }
    setFont(font){
        this.font=font;
    }
    setPoint(point){
        this.p=point;
    }
    setActivePoint(key){
        this.activePoint=null;
        if(key==='P1') this.activePoint=this.p;
    }
    getProperties(){
        let prop=new Map();
        return prop;
    }
    setProperty(prop){
        super.setProperty(prop);
        switch(prop.key){
            case 'P1':
                this.line.p1.x=prop.value.x;
                this.line.p1.y=prop.value.y;
                break;
            case 'P2':
                this.line.p2.x=prop.value.x;
                this.line.p2.y=prop.value.y;
                break;
            default:
        }
    }
    getDistance(point) {
        return null
        //return Geometry.PointToLineDistance(point,this.line);
    }
    isInRect(topLeft,bottomRight){
        return {cross:false,full:false}
        // const inRect=[Geometry.pointInRect(this.p,topLeft,bottomRight),
        //                 Geometry.pointInRect(this.line.p2,topLeft,bottomRight)];
        // const full=inRect.every(i=>i===true);
        // const cross=Intersection.LineRectangle(this.line,topLeft,bottomRight).length>0;
        // return {cross,full};    
    }
    toString(){
            return `Line P1(${this.line.p1.x},${this.line.p1.y}) P2(${this.line.p2.x},${this.line.p2.y})`;
    }

}