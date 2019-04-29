import Geometry from '../../utils/geometry';
import {Color} from '../colors';
import ShapeStyle from './ShapeStyle';
import EndSnapMarker from './snapmarkers/EndSnapMarker';
import MiddleSnapMarker from './snapmarkers/MiddleSnapMarker';

export default class LineShape {
    constructor(line){
        this.p=[];
        this.p[0]=line.p1;
        this.p[1]=line.p2;
        this.line=line;
        this.style=new ShapeStyle(Color.BLACK,ShapeStyle.SOLID);
    }
    drawSelf(ctx,realRect, screenRect){
        this.refresh(realRect, screenRect);
        ctx.beginPath();
        ctx.moveTo(this.p0.x,this.p0.y);
        ctx.lineTo(this.p1.x,this.p1.y);
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        this.p0 = Geometry.realToScreen(this.line.p1,realRect,screenRect);
        this.p1 = Geometry.realToScreen(this.line.p2, realRect, screenRect);
    }
    getModel(){
        return this.line;
    }
    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.line.p1));
        list.push(new EndSnapMarker(this.line.p2));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.line.p1,this.line.p2)))
        return list;
    }
    setColor(color){
        this.style.setColor(color);
    }
    getColor(){
        return this.style.getColor();
    }
    toString(){
        return "p1("+this.p[0].x+","+this.p[0].y+") p2("+this.p[1].x+","+this.p[1].y+")";
    }

    getStyle() {
        return this.style;
    }

    setStyle(style) {
        this.style = style;
    }
}