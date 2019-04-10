import Geometry,{Rectangle,Coord2D} from '../../utils/geometry/geometry';
import {Color} from '../colors';
import ShapeStyle from './ShapeStyle';
import EndSnapMarker from './snapmarkers/EndSnapMarker';

export default class RectangleShape {
    constructor(rectangle){
        this.rectangle=rectangle;
        this.rect=new Rectangle()
        this.style=new ShapeStyle(Color.BLACK,ShapeStyle.SOLID);
    }

    drawSelf(ctx, realRect, screenRect) {
        this.refresh(realRect, screenRect);
        ctx.strokeRect(this.rect.topLeft.x,this.rect.topLeft.y,this.rect.width,this.rect.height);
        //g.drawRect(rect.topLeft.x, rect.topLeft.y, rect.width, rect.height);
    }
    refresh(realRect, screenRect){
        this.rect.topLeft=Geometry.realToScreen(this.rectangle.topLeft,realRect,screenRect);
        this.rect.width=Geometry.realToScreenLength(this.rectangle.width,realRect.width,screenRect.width);
        this.rect.height=Geometry.realToScreenLength(this.rectangle.height,realRect.height,screenRect.height);
    }
    getModel(){
        return this.rectangle;
    }
    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.rectangle.topLeft));
        list.push(new EndSnapMarker(new Coord2D(this.rectangle.topLeft.x+this.rectangle.width,this.rectangle.topLeft.y)));
        list.push(new EndSnapMarker(new Coord2D(this.rectangle.topLeft.x,this.rectangle.topLeft.y-this.rectangle.height)));
        list.push(new EndSnapMarker(new Coord2D(this.rectangle.topLeft.x+this.rectangle.width,this.rectangle.topLeft.y-this.rectangle.height)));
        return list;
    }
    setColor(color){
        this.style.setColor(color);
    }
    getColor(){
        return this.style.getColor();    }
    toString(){
        return "Rectangle";
    }
    getStyle() {
        return this.style;
    }
    setStyle(style) {
        this.style = style;
    }
}