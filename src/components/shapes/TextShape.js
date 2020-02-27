import Geometry from '../../utils/geometry';
import Shape from "./Shape";

export default class TextShape extends Shape{
    static CENTER=1;
    constructor(text="",point={x:0,y:0}){
        super();
        this.p=point;
        this.controlPoints=[this.p]
        this.text=text;
    }
    drawSelf(ctx,realRect, screenRect){
        super.drawSelf(ctx,realRect, screenRect)
        ctx.save();
        ctx.font=this.font;
        let basePoint={...this.p0}
        if(this.anchor===TextShape.CENTER){
            const width=ctx.measureText(this.text).width/2;
            basePoint.x=this.p0.x-width*Math.cos(this.angle);
            basePoint.y=this.p0.y-width*Math.sin(this.angle);
        }
        const newPoint=Geometry.rotatePoint(basePoint,this.angle,{x:0,y:0})
        ctx.translate(basePoint.x-newPoint.x,basePoint.y-newPoint.y);
        ctx.rotate(this.angle);
        ctx.strokeText(this.text,basePoint.x,basePoint.y);
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
    setAnchor(anchor){
        this.anchor=anchor;
    }
    setActivePoint(key){
        super.setActivePoint();
        if(key==='P1') this.selectPoint(0);
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