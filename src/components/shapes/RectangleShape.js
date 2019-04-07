import Geometry,{Rectangle} from '../../utils/geometry/geometry';
import {Color} from '../colors';
import ShapeStyle from './ShapeStyle';

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