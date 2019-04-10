import Geometry,{Circle,Coord2D} from "../../utils/geometry/geometry";
import {Color} from '../colors';
import ShapeStyle from './ShapeStyle';

export default class StraightLineShape {
    constructor(line){
        this.line=line;
        this.style=new ShapeStyle(Color.BLACK,ShapeStyle.SOLID);
    }
    drawSelf(ctx,realRect, screenRect){
        this.refresh(realRect, screenRect);
        if(this.p0==null||this.p1==null)return;
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
        let p=Geometry.CircleLineIntersection(this.line,circle);
        if(p!=null){
            if(p.length==1){
                let r=this.p[0];
                p=new Array(2);
                p[0]=r;
                p[1]=p[0];
                }
            this.p0=Geometry.realToScreen(p[0],realRect,screenRect);
            this.p1=Geometry.realToScreen(p[1],realRect,screenRect);
        }else{
            this.p0=null;
            this.p1=null;
        }
    }
    getModel(){
        return this.line;
    }
    getMarkers(){
        return null;
    }
    setColor(color){
        this.style.setColor(color);
    }
    getColor(){
        return this.style.getColor();
    }
    getStyle() {
        return this.style;
    }
    setStyle(style) {
        this.style = style;
    }
}