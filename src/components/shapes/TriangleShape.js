import Geometry, {Coord2D} from '../../utils/geometry/geometry';
import {Color} from '../colors';
import ShapeStyle from './ShapeStyle';
import EndSnapMarker from './snapmarkers/EndSnapMarker';
import MiddleSnapMarker from './snapmarkers/MiddleSnapMarker';

export default class TriangleShape  {
    constructor(triangle){
        this.p=[new Coord2D(),new Coord2D(),new Coord2D()];
        this.triangle=triangle;
        this.style=new ShapeStyle(Color.BLACK,ShapeStyle.SOLID);
    }
    drawSelf(ctx,realRect, screenRect){
        this.refresh(realRect,screenRect);
        ctx.beginPath();
        ctx.moveTo(this.p[0].x,this.p[0].y);
        ctx.lineTo(this.p[1].x,this.p[1].y);
        ctx.lineTo(this.p[2].x,this.p[2].y);
        ctx.lineTo(this.p[0].x,this.p[0].y);
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        for (let i=0;i<3;i++) this.p[i]=Geometry.realToScreen(this.triangle.points[i],realRect,screenRect);
    }
    getModel(){
        return this.triangle;
    }
    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.triangle.points[0]));
        list.push(new EndSnapMarker(this.triangle.points[1]));
        list.push(new EndSnapMarker(this.triangle.points[2]));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.triangle.points[0],this.triangle.points[1])));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.triangle.points[1],this.triangle.points[2])));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.triangle.points[2],this.triangle.points[0])));
        return list;
    }
    setColor(color){
        this.style.setColor(color);
    }
    getColor(){
        return this.style.getColor();
    }
    toString(){
        return "Triangle";
    }
    getStyle() {
        return this.style;
    }
    setStyle(style) {
        this.style = style;
    }
}